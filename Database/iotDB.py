import sqlite3
# takes a database name, create database which has the schema
def initDB(database):
    # create a database and connect to it
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
    (None, 2023, 12.1, 0, 12.5, 37.2, None),
    (None, 2024, 12.3, 1, 13.7, 37.5, None),
    (None, 2025, 12.4, 0, 12.5, 37.2, None)
]
insertRecords(database, data)
q1 = "SELECT * FROM record WHERE (time != 2024)"
result = selectRecord(database, q1)
print(result)
#'''
