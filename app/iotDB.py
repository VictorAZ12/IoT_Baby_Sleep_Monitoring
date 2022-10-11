import sqlite3
import os
import json
import datetime
from app.config import TIMEZONE
import metpy.calc as mpcalc
from metpy.units import units

def init_db(database):
    """
    Creates a SQLite3 database named after the argument database.
    database: name of the database
    """
    if not os.path.isfile(database):
        conn = sqlite3.connect(database)
        cur = conn.cursor()
        # create tables
        cur.execute("""CREATE TABLE IF NOT EXISTS user
        (
            user_id INTEGER PRIMARY KEY NOT NULL,
            user_name TEXT NULL
        );
        """)
        cur.execute("""CREATE TABLE IF NOT EXISTS device
        (
            device_id INTEGER PRIMARY KEY NOT NULL,
            device_name TEXT UNIQUE NOT NULL,
            owner INTEGER NULL,
            FOREIGN KEY (owner)
                REFERENCES user (user_id)
        );
        """)
        cur.execute("""CREATE TABLE IF NOT EXISTS record
        (
            record_id INTEGER PRIMARY KEY NOT NULL,
            time TEXT NOT NULL,
            sound INTEGER NOT NULL,
            movement INTEGER NOT NULL,
            humidity REAL NOT NULL,
            temperature REAL NOT NULL,
            device_id INTEGER NULL,
            FOREIGN KEY (device_id)
                REFERENCES device (device_id)
        );
        """)
        conn.commit()
        cur.close()
        conn.close()

def select_unnamed(database, query, one=False):
    """
    Sends SELECT queries and returns the result without column names.
    one: True to get one record only.
    Returned result example:
        [(1, '2022-09-20 12:00:12', 1.0, 0, 12.5, 20.2, None), (2, '2022-09-20 12:00:20', 1.0, 1, 13.7, 20.5, None)]
    """
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    cur.close()
    conn.close()
    return (result[0] if result else None) if one else result

def select_named(database, query, one=False):
    """
    Sends SELECT queries and returns the result with column names.
    one: True to get one record only.
    Returned result example:
        [{'record_id': 1, 'time': '2022-09-20 12:00:12', 'sound': 1.0, 'movement': 0, 'humidity': 12.5, 'temperature': 20.2, 'device_id': None}]
    """
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    cur.execute(query)
    result = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return (result[0] if result else None) if one else result

def insert_record(database, data):
    """
    Insert new record data into the database. 
    data: tuple(s) like (sound, movement, humidity, temperature, devicename)
    Argument data example:
        single record: [(1, 0, 12.3, 20.2,'F8-A2-D6-AA-94-E3')]
        multiple records: [(1, 0, 12.3, 20.2,'F8-A2-D6-AA-94-E3'), (1, 0, 15.3, 20.2,'F8-A2-D6-AA-94-E3')]
    """
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    for i in range(len(data)):
        print(data[i])
        record = list(data[i])
        # add name to device table if it does not exist
        cur.execute("INSERT OR IGNORE INTO device VALUES (?, ?, ?)", (None, record[4], None))
        conn.commit()
        # retrieve device_id based on name
        cur.execute("SELECT device_id FROM device WHERE device_name = '%s'" % record[4])
        device_id=cur.fetchall()
        record[4] = device_id[0][0]
        # add system time
        record.insert(0, datetime.datetime.now(tz=TIMEZONE).strftime("%Y-%m-%d %H:%M:%S.%f"))
        # leave record_id NULL
        record.insert(0, None)
        data[i] = tuple(record)
    cur.executemany("INSERT INTO record VALUES (?, ?, ?, ?, ?, ?, ?)",data)
    conn.commit()
    cur.close()
    conn.close()

def select_latest(database, num, mode):
    """
    Select the latest records. 
    num: number of records.
    mode: 0 for named result, other values for unnamed result.
    """
    query = "SELECT * FROM record ORDER BY time DESC LIMIT " + str(num)
    if mode == 0:
        return select_named(database, query)
    else: 
        return select_unnamed(database, query)

def select_range(database, start, end, mode):
    """
    Select the records within a time interval. 
    mode: 0 for named result, other values for unnmaed result.
    start/end: start and end of the interval.
    """
    start = '\"' + start + '\"'
    end = '\"' + end + '\"'
    query = 'SELECT * FROM record WHERE time BETWEEN ' + start + " AND " + end + "ORDER BY time DESC"
    if mode == 0:
        return select_named(database, query)
    else:
        return select_unnamed(database, query)


def longest_1(record):
    """
    Analyse a 0/1 string to find the longest substring composed of 1, returns the start index and the length.
    """
    if (record == None or len(record)==0):
        return 0, 0
    start = 0
    end = 0
    maxLen = 0
    maxIndex = -1
    while end < len(record):
        if record[start] == '1' and record[end] == '1':
            all1 = True
            for i in range(start,end+1):
                if record[i] != '1':
                    all1 = False
                    break
            if all1:
                maxLen = end-start+1
                maxIndex = start
            else:
                start += 1
        else:
            start += 1
        end += 1
    return maxLen, maxIndex

def analyse_recent(database, n, sensitivity = 3):
    """
    Analyse n latest records and returns a message derived from the data.
    sensitivity: define k consecutive sound/movement event to be noticed.
    may also find the longest substring 1s
    """
    numRows = select_unnamed(database,"SELECT COUNT(*) FROM  record",True)[0]
    if n > numRows:
        n = numRows
    data = select_latest(database,n,1)
    message = ''
    messages = []
    apparentTemp = []
    sound = ''
    movement = ''
    apparentTempStatus = ''
    for i in range(len(data)):
        # record sound, movement
        sound = sound + str(data[i][2])
        movement = sound + str(data[i][3])
        # calculate apparent temperature
        apparentTemp.append(mpcalc.apparent_temperature(data[i][5] * units.degC,
        data[i][4]/100 * units.percent, 
        0*units('m/s'),
        face_level_winds = True,
        mask_undefined = False))
    # get sound/movement anomaly
    soundEventIndex = sound.find('1'*sensitivity)
    movementEventIndex = movement.find('1'*sensitivity)
    if soundEventIndex != -1:
        message = 'Sound event detected from ' + str(data[soundEventIndex+sensitivity-1][1]) + ' to ' + str(data[soundEventIndex][1]) + '\n'
        messages.append(message)
        soundLen, soundIndex = longest_1(sound)
        message = 'Longest sound event detected from ' + str(data[soundIndex+soundLen-1][1]) + ' to ' + str(data[soundIndex][1]) + '\n'
        messages.append(message)
    if movementEventIndex != -1:
        message = 'Movement event detected from ' + str(data[movementEventIndex+sensitivity-1][1]) + ' to ' + str(data[movementEventIndex][1]) + '\n'
        messages.append(message)
        moveLen, moveIndex = longest_1(movement)
        message = 'Longest movement event detected from ' + str(data[moveIndex+moveLen-1][1]) + ' to ' + str(data[moveIndex][1]) + '\n'
        messages.append(message)
    # get the latest temperature anomaly
    for i in range(len(apparentTemp)):
        if apparentTemp[i].magnitude[0] > 22 or apparentTemp[i].magnitude[0] < 18:
            message = 'Uncomfortable temperature detected at ' + str(data[i][1]) + \
            ', temperature ' + str(data[i][5]) + ' degrees celcius, humidity ' + str(round(data[i][4], 2)) + \
            '%, feels like ' + str(round(apparentTemp[i].magnitude[0],2)) + ' degrees celcius.\n'
            messages.append(message)
            apparentTempStatus = apparentTempStatus + '1'
        else:
            apparentTempStatus = apparentTempStatus + '0'
    apparentTempIndex = apparentTempStatus.find('1'*sensitivity)
    if apparentTempIndex != -1:
        message = 'Uncomfortable temperature detected from ' + str(data[apparentTempIndex+sensitivity-1][1]) + ' to ' + str(data[apparentTempIndex][1]) + '\n'
        messages.insert(0,message)
        tempLen, tempIndex = longest_1(apparentTempStatus)
        message = 'Longest uncomfortable temperature inteval detected from ' + str(data[tempIndex+tempLen-1][1]) + ' to ' + str(data[tempIndex][1]) + '\n'
        messages.insert(1,message)
    return messages


def format_raw(rawdata):
    """
    Format the raw data received from the device.
    Rawdata: a string like "<name>,<temp>,<humidity>,<sound>,<movement>"
    Returns a list of a tuple like (sound, movement, humidity, temperature, deviceName)
    """
    rawdata = rawdata.split(',')
    data = [(int(rawdata[3]), int(rawdata[4]), float(rawdata[2]), float(rawdata[1]), rawdata[0])]
    return data



# sample json dumping
'''
with open('testdata.json','w',encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)
#'''