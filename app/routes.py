from app import app
from flask import render_template, redirect
from datetime import datetime
from app.config import TIMEZONE

database = {'temperature': '25˚C', 'time': datetime.now(tz=TIMEZONE)}

@app.route('/')
@app.route('/index')
def index():
    message = 'Welcome to Baby Sleep Monitor'
    return render_template('index.html', message=message)

@app.route('/dashboard')
def dashboard():
    data = database['temperature']
    return render_template('dashboard.html', data=data)

@app.route('/update/temperature/<data>')
def update_temperature(data):
    global database; 
    database['temperature'] = data + '˚C'
    database['time'] = datetime.now(tz=TIMEZONE)
    return redirect("/dashboard")
