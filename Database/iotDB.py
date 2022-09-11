import sqlite3
# create a database and connect to it
conn = sqlite3.connect("iotDB.db")
# record_id: auto increment unique id
# timestamp: time stored using the ISO8601 string format YYYY-MM-DD HH:MM:SS.SSS
# sound: returning value of the sound sensor
# movement: 1 or 0, stands for true and falso for movement sensor
# humidity: returning value of the humidity sensor
# temperature: returning value of the temperature sensor.
conn.execute("""CREATE TABLE IF NOT EXISTS records
    (record_id INTEGER PRIMARY KEY NOT NULL,
    timestamp TEXT,
    sound REAL,
    movement INTEGER,
    humidity REAL,
    temperature REAL);""")
conn.close()