import sqlite3
import os
import json
import datetime
from app.config import TIMEZONE

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

def format_raw(rawdata):
    """
    Format the raw data received from the device.
    Rawdata: a string like "<name>,<temp>,<humidity>,<sound>,<movement>"
    Returns a list of a tuple like (sound, movement, humidity, temperature, deviceName)
    """
    rawdata = rawdata.split(',')
    data = [(int(rawdata[3]), int(rawdata[4]), float(rawdata[2]), float(rawdata[1]), rawdata[0])]
    return data
