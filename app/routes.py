from app import app
from app import iotDB
from flask import render_template, redirect
from datetime import datetime
from app.config import TIMEZONE

@app.route('/')
@app.route('/index')
def index():
    """
    Displays a welcome message.
    """
    message = 'Welcome to Baby Sleep Monitor'
    return render_template('index.html', message=message)

@app.route('/dashboard')
def dashboard():
    """
    Displays the most recent data.
    """
    most_recent = iotDB.selectRecord('iotDB.db', 'SELECT time, sound, movement, humidity, temperature, device_id FROM record ORDER BY time DESC LIMIT 1')
    data = {
        "time": most_recent[0][0],
        "sound": most_recent[0][1],
        "movement": most_recent[0][2],
        "humidity": most_recent[0][3],
        "temperature": most_recent[0][4]
    }
    return render_template('dashboard.html', data=data)

@app.route('/update/<sound>/<movement>/<humidity>/<temperature>/<device_id>')
def update(sound, movement, humidity, temperature, device_id):
    """
    Updates 'record' table with a new data point and redirects to dashboard.
    e.g 127.0.0.1:5000/update/50/1/80/20/1
    """
    timestamp = datetime.now(tz=TIMEZONE)
    data = [(None, timestamp, sound, movement, humidity, temperature, device_id)]
    iotDB.insertRecords('iotDB.db', data)
    return redirect("/dashboard")
