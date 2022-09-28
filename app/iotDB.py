import sqlite3
import os
import json
import datetime
from app.config import TIMEZONE
# init_db(): Creates a database which stores the IoT device sensor data
# Parameters:
#   database: string, the name of the database which ends with '.db'. 
#       e.g. iotDB.db
# Returned values: None
def init_db(database):
    # create a database and connect to it
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

# select_unnamed(): Sends select queries and returns the result without column names.
# Parameters:
#   database: string, the name of the database which ends with '.db'.  
#       e.g. 'iotDB.db'
#   query: string, the select query.
#       e.g. 'SELECT * FROM record'
#   one: boolean, decides if only returns the first matching result. Set to False if not specified.
# Returned values:
#   result: list, the fetched result presented as tuples. Returns None if no result could be fetched.
#       e.g. [(1, '2022-09-20 12:00:12', 1.0, 0, 12.5, 20.2, None), (2, '2022-09-20 12:00:20', 1.0, 1, 13.7, 20.5, None)]
def select_unnamed(database, query, one=False):
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    cur.close()
    conn.close()
    return (result[0] if result else None) if one else result

# select_named(): Sends select queries and returns the result with column names which can be used for json formatting
# Parameters:
#   database: string, the name of the database which ends with '.db'. 
#       e.g. 'iotDB.db'
#   query: string, the select query
#       e.g. 'SELECT * FROM record'
#   one: boolean, decides if only returns the first matching result. Set to False if not specified.
# Returned values:
#   result: list, the fetched result presented as dictionaries. Returns None if no result could be fetched.
#       e.g. [{'record_id': 1, 'time': '2022-09-20 12:00:12', 'sound': 1.0, 'movement': 0, 'humidity': 12.5, 'temperature': 20.2, 'device_id': None}]
def select_named(database, query, one=False):
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    cur.execute(query)
    result = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return (result[0] if result else None) if one else result

# insert_record(): insert new sensor data into the database
# Parameters:
#   database: string, the name of the database which ends with '.db'. 
#       e.g. 'iotDB.db'
#   data: list, the sensor data to be inserted into the database which are stored as tuples.
#       one record tuple: (sound, movement, humidity, temperature, deviceMAC). 
#       Types: integer, integer, double, double, string
#       single record example: [(1, 0, 12.3, 20.2,'F8-A2-D6-AA-94-E3')]
#       multiple records example: [(1, 0, 12.3, 20.2,'F8-A2-D6-AA-94-E3'), (1, 0, 15.3, 20.2,'F8-A2-D6-AA-94-E3')]
def insert_record(database, data):
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


# select_latest(database, num, mode): select the latest N records
# parameters: 
#   database: string, name of the database
#   num: integer, the number of records to be selected
#   mode: integer, 0 for named, other for unnamed
def select_latest(database, num, mode):
    query = "SELECT * FROM record ORDER BY time LIMIT " + str(num)
    if mode == 0:
        return select_named(database, query)
    else: 
        return select_unnamed(database, query)


# select_range(database, start, end, mode)
#  parameters:
#   database: string, name of the database
#   start: string, the start of the range
#   end: string, the end of the range
#   mode: integer, 0 for named, other for unnamed
def select_range(database, start, end, mode):
    query = "SELECT * FROM record WHERE time < " + start + " AND time > " + end
    if mode == 0:
        return select_named(database, query)
    else:
        return select_unnamed(database, query)
# A simple test of functions, comment the next line to execute.
'''
database = "iotDB.db"
init_db(database)
data = [
    (1, 0, 12.5, 20.2, 'mac1'),
    (1, 1, 13.7, 20.5, 'mac1'),
    (0, 0, 12.5, 20.2, 'mac2'),
    ( 0, 0, 12.5, 20.2, 'mac3'),
]
insert_record(database, data)
q1 = "SELECT * FROM record" 
result = select_named(database, q1)
result2 = select_unnamed(database, q1)
print(result, '\n', result2)
#'''

# sample json dumping
'''
with open('testdata.json','w',encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)
#'''


