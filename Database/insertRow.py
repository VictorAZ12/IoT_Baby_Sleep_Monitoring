import sqlite3
# connect to the existing database
conn = sqlite3.connect("iotDB.db")
conn.execute("""INSERT INTO records (timestamp, sound, movement, humidity, temperature) \
    VALUES("2022-09-11 11:57:00.000", 50.0, 1, 75.5, 24.5)
""")
conn.commit()
conn.close()
