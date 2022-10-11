from app import app
from app import iotDB
from flask import render_template, redirect
from datetime import datetime
from datetime import timedelta
from app.config import TIMEZONE

@app.route('/')
@app.route('/index')
def index():
    """
    Displays a welcome message and button to navigate to the dashboard.
    """
    message = 'Welcome to Baby Sleep Monitor'
    return render_template('index.html')

@app.route('/dashboard')
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

@app.route('/update/<sound>/<movement>/<humidity>/<temperature>/<device_id>')
def update(sound, movement, humidity, temperature, device_id):
    """
    Updates 'record' table with a new data point and redirects to dashboard.
    e.g 127.0.0.1:5000/update/50/1/80/20/1
    """
    data = [(sound, movement, humidity, temperature, device_id)]
    iotDB.insert_record('iotDB.db', data)
    return redirect("/dashboard")
