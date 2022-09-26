from app import iotDB
from datetime import datetime
from app.config import TIMEZONE
import unittest
import sqlite3
import json

class testInsertRecords(unittest.TestCase):

    def setUp(self):
        """
        Set up test fixtures; insert new data point and retrieve most recent.
        """
        timestamp = datetime.now(tz=TIMEZONE)
        sound = 50.0
        movement = 1
        humidity = 80.0
        temperature = 20.0
        device_id = 1
        data = [
            (None, timestamp, sound, movement, humidity, temperature, device_id)
        ]
        database = 'iotDB.db'
        iotDB.insertRecords(database, data)
        conn = sqlite3.connect(database)
        cur = conn.cursor()
        query = 'SELECT sound, movement, humidity, temperature, device_id FROM record ORDER BY time DESC LIMIT 1'
        cur.execute(query)
        self.result = cur.fetchall()
        cur.close()
        conn.close()
        self.expected = [(sound, movement, humidity, temperature, device_id)]

    def test_insert(self):
        """
        Compare the most recent data point and compare with 'self.expected'.
        """
        self.assertEqual(self.result, self.expected)

if __name__ == '__main__':
    unittest.main()