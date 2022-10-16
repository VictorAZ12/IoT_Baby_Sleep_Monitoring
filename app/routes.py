from app import app
from app import iotDB
from flask import render_template, redirect, jsonify
from datetime import datetime
from datetime import timedelta
from app.config import TIMEZONE
from app.config import DEVICES
from flask_cors import CORS

CORS(app, supports_credentials=True, resources=r'/*')

@app.route('/')
@app.route('/index')
def index():
    """
    Displays the dashboard.
    """
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """
    Displays the 20 most recent record of data for the dashboard page.
    """
    records = iotDB.select_latest('iotDB.db', 20, 1)
    records = records[::-1]
    data = []
    for record in records:
        data.append(
            {
                "time": record[1][11:19],
                "sound": record[2],
                "movement": record[3],
                "humidity": record[4],
                "temperature": record[5]
            }
        )
    return jsonify(data)

@app.route('/update/<sound>/<movement>/<humidity>/<temperature>/<device_id>')
def update(sound, movement, humidity, temperature, device_id):
    """
    Updates 'record' table with a new data point and redirects to dashboard.
    e.g 127.0.0.1:5000/update/50/1/80/20/Arduino1
    """
    if (device_id in DEVICES and \
        float(humidity) <= 80 and float(humidity) >= 20 and \
        float(temperature) <= 50 and float(temperature) >= 0 and \
        (int(sound) == 1 or int(sound) == 0) and \
        (int(movement) == 1 or int(movement) == 0) ):
        data = [(sound, movement, humidity, temperature, device_id)]
        iotDB.insert_record('iotDB.db', data)
        return redirect("/dashboard")
    else:
        return render_template('rejection.html')

@app.route('/report/<yr>/<mon>/<day>/<hr>/<min>/<length>')
def report(yr, mon, day, hr, min, length):
    """
    Returns a page that displays useful information about the data over the selected period of time. 
      - Displays the selected time period over which the report is to be made. 
      - Noise ratio: a number between 0 and 1 measuring how noisy the time period was
      - Motion ratio: " "
      - Average temperature and average humidity
      - Sleep quality rating, and aggregate of the other 4 quantities. 
    @param yr (str): the year to start the report period.
    @param mon (str): the month to start the report period.
    @param day (str): the day to start the report period.
    @param hr (str): the hour to start the repord period (24hr time)
    @param min (str): the minute to start the report period.
    @param length (str): the number of hours the report should last for.
    @return report.html page displaying the passed arguments.
    """
    begin = datetime(year=int(yr), month=int(mon), day=int(day), hour=int(hr), minute=int(min))
    stop = begin + timedelta(hours=float(length))
    begin = begin.strftime("%Y-%m-%d %H:%M:%S.%f")
    stop = stop.strftime("%Y-%m-%d %H:%M:%S.%f")
    data = iotDB.select_range('iotDB.db', start=begin, end=stop, mode=1)
    num_records = len(data)
    messages = []
    sound_count = 0
    motion_count = 0
    humidity_count = 0
    temp_count = 0
    for record in data:
        if int(record[2]) == 1:
            sound_count += 1 
        if int(record[3]) == 1:
            motion_count += 1
        humidity_count += int(record[4])
        temp_count += int(record[5])
    sound_ratio = round(sound_count / num_records, 2)
    motion_ratio = round(motion_count / num_records, 2)
    average_humidity = int(humidity_count / num_records)
    average_temp = int(temp_count / num_records)
    sleep_quality = 0
    sleep_quality += 1 - sound_ratio
    sleep_quality += 1 - motion_ratio
    if average_humidity < 30:
        sleep_quality += 1 / (30 - average_humidity)
    elif average_humidity > 50:
        sleep_quality += 1 / (average_humidity - 50)
    else:
        sleep_quality += 1
    if average_temp < 20:
        sleep_quality += 1 / (20 - average_temp)
    elif average_temp > 22:
        sleep_quality += 1 / (average_temp - 22)
    else:
        sleep_quality += 1
    sleep_quality = int((sleep_quality / 4) * 100)
    messages.extend([sound_ratio, motion_ratio, average_humidity, average_temp, sleep_quality])
    return render_template('report.html', dates=[begin[0:19], stop[0:19]], messages=messages)
