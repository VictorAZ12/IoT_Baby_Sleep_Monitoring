import sqlite3
import os
import json
import datetime
from app.config import TIMEZONE
import metpy
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
            device_mac TEXT UNIQUE NOT NULL,
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
    data: tuple(s) like (sound, movement, humidity, temperature, deviceMAC)
    Argument data example:
        single record: [(1, 0, 12.3, 20.2,'F8-A2-D6-AA-94-E3')]
        multiple records: [(1, 0, 12.3, 20.2,'F8-A2-D6-AA-94-E3'), (1, 0, 15.3, 20.2,'F8-A2-D6-AA-94-E3')]
    """
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    for i in range(len(data)):
        print(data[i])
        record = list(data[i])
        # add MAC to device table if it does not exist
        cur.execute("INSERT OR IGNORE INTO device VALUES (?, ?, ?)", (None, record[4], None))
        conn.commit()
        # retrieve device_id based on mac
        cur.execute("SELECT device_id FROM device WHERE device_mac = '%s'" % record[4])
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
    query = "SELECT * FROM record WHERE time < " + start + " AND time > " + end
    if mode == 0:
        return select_named(database, query)
    else:
        return select_unnamed(database, query)

def analyse_recent(database, n, sensitivity = 3):
    """
    Analyse n latest records and returns a message derived from the data.
    sensitivity: define k consecutive sound/movement event to be noticed.
    """
    n = int(n)
    numRows = select_unnamed(database,"SELECT COUNT(*) FROM  record",True)[0]
    if n > numRows:
        n = numRows
    data = select_latest(database,n,1)
    message = ''
    apparentTemp = []
    sound = ''
    movement = ''
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
        message = message + 'Sound event detected from ' + str(data[soundEventIndex+sensitivity-1][1]) + ' to ' + str(data[soundEventIndex][1]) + '\n'
    if movementEventIndex != -1:
        message = message + 'Movement event detected from ' + str(data[movementEventIndex+sensitivity-1][1]) + ' to ' + str(data[movementEventIndex][1]) + '\n'
    # get the latest temperature anomaly
    for i in range(len(apparentTemp)):
        if apparentTemp[i].magnitude[0] > 22 or apparentTemp[i].magnitude[0] < 18:
            message = message + 'Uncomfortable temperature detected at ' + str(data[i][1]) + \
            ', temperature ' + str(data[i][5]) + ' degrees celcius, humidity ' + str(round(data[i][4], 2)) + \
            '%, feels like ' + str(round(apparentTemp[i].magnitude[0],2)) + ' degrees celcius.\n'
    return message

# sample json dumping
'''
with open('testdata.json','w',encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)
#'''


