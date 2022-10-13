from app import app
from app import iotDB
from flask import render_template, redirect, jsonify
from datetime import datetime
from datetime import timedelta
from app.config import TIMEZONE
from app.config import DEVICES

@app.route('/')
@app.route('/index')
def index():
    """
    Displays a welcome message and button to navigate to the dashboard.
    """
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """
    Displays the record data the specified period of time.
    """
    records = iotDB.select_latest('iotDB.db', 1, 1)
    data = {
        "time": records[0][1],
        "sound": records[0][2],
        "movement": records[0][3],
        "humidity": records[0][4],
        "temperature": records[0][5]
    }
    '''
    records = iotDB.select_latest('iotDB.db', 10, 1)
    data = []
    for record in records:
        data.append(
            {
                "time": record[1],
                "sound": record[2],
                "movement": record[3],
                "humidity": record[4],
                "temperature": record[5]
            }
        )
    '''
    return jsonify(data)

@app.route('/update/<sound>/<movement>/<humidity>/<temperature>/<device_id>')
def update(sound, movement, humidity, temperature, device_id):
    """
    Updates 'record' table with a new data point and redirects to dashboard.
    e.g 127.0.0.1:5000/update/50/1/80/20/Arduino1
    """
    if device_id in DEVICES:
        data = [(sound, movement, humidity, temperature, device_id)]
        iotDB.insert_record('iotDB.db', data)
        return redirect("/dashboard")
    else:
        return render_template('rejection.html')

@app.route('/report/<yr>/<mon>/<day>/<hr>/<min>/<length>')
def report(yr, mon, day, hr, min, length):
    """
    Returns a page that displays useful information about the data over the selected period of time. 
    @param yr (str): the year to start the report period.
    @param mon (str): the month to start the report period.
    @param day (str): the day to start the report period.
    @param hr (str): the hour to start the repord period (24hr time)
    @param min (str): the minute to start the report period.
    @param length (str): the number of hours the report should last for.
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
    messages.append(sound_ratio)
    motion_ratio = round(motion_count / num_records, 2)
    messages.append(motion_ratio)
    average_humidity = int(humidity_count / num_records)
    messages.append(average_humidity)
    average_temp = int(temp_count / num_records)
    messages.append(average_temp)
    return render_template('report.html', data=data, dates=[begin[0:19], stop[0:19]], messages=messages)

'''
def dashboard():
    """
    Displays the record data the specified period of time.
    """
    
    now = datetime.now(tz=TIMEZONE)
    past = now - timedelta(hours=12)
    now = now.strftime("%Y-%m-%d %H:%M:%S.%f")
    past = past.strftime("%Y-%m-%d %H:%M:%S.%f")
    data = iotDB.select_range('iotDB.db', start=past, end=now, mode=1)

    return render_template('dashboard.html', data=data)
'''