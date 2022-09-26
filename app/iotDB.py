import sqlite3
import os
import json
# takes a database name, create database which has the schema
def initDB(database):
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
            device_name TEXT NULL,
            owner INTEGER NULL,
            FOREIGN KEY (owner)
                REFERENCES user (user_id)
        );
        """)
        cur.execute("""CREATE TABLE IF NOT EXISTS record
        (
            record_id INTEGER PRIMARY KEY NOT NULL,
            time TEXT NOT NULL,
            sound REAL NOT NULL,
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

# Only send select queries, do not change data or schema.
def selectRecord(database, query):
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    cur.close()
    conn.close()
    return result

# Send select queries with optional arguments, returns a dictionary which contains rows with column names.
def query_db(database, query, args=(), one=False):
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return (r[0] if r else None) if one else r

# Insert new rows, change data
# data: [(value1, value2, value3, ...), (value1, value2, value3, ...)]
def insertRecords(database, data):
    conn = sqlite3.connect(database)
    cur = conn.cursor()
    cur.executemany("INSERT INTO record VALUES (?, ?, ?, ?, ?, ?, ?)",data)
    conn.commit()
    cur.close()
    conn.close()
    

# A simple test of functions, commentnext line and execute.
'''
database = "iotDB.db"
initDB(database)
data = [
    (None, '2022-09-20 12:00:12', 1, 0, 12.5, 20.2, None),
    (None, '2022-09-20 12:00:20', 1, 1, 13.7, 20.5, None),
    (None, '2022-09-20 12:00:28', 0, 0, 12.5, 20.2, None),
    (None, '2022-09-20 12:00:36', 0, 0, 12.5, 20.2, None),
    (None, '2022-09-20 12:00:40', 0, 0, 12.5, 21.2, None),
    (None, '2022-09-20 12:00:48', 1, 1, 12.4, 22.2, None),
    (None, '2022-09-20 12:00:56', 1, 1, 12.5, 20.2, None),
    (None, '2022-09-20 12:01:02', 1, 1, 12.4, 23.2, None),
    (None, '2022-09-20 12:01:20', 0, 0, 12.5, 20.2, None),
    (None, '2022-09-20 12:01:29', 0, 1, 12.5, 20.2, None),
    (None, '2022-09-20 12:01:38', 0, 1, 12.6, 20.2, None),
    (None, '2022-09-20 12:01:50', 0, 0, 14.5, 20.2, None),
]
insertRecords(database, data)
q1 = "SELECT * FROM record WHERE (time != 2024)"
result = selectRecord(database, q1) # rows value only
resultDic = quuery_db(database, q1) # python dictionary
resultJson = json.dumps(resultDic) # json format
#'''
