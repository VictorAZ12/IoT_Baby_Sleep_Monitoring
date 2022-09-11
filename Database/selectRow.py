import sqlite3
# connect to the existing database
conn = sqlite3.connect("iotDB.db")
cursor = conn.execute("SELECT record_id, timestamp, sound, movement, humidity, temperature from records")
for row in cursor:
    print("reocrd_id = ", row[0])
    print("timestamp = ", row[1])
    print("sound = ", row[2])
    print("movement = ", row[3])
    print("humidity = ", row[4])
    print("temperature = ", row[5], "\n")

conn.close()