from app import app
from app import iotDB
from flask import render_template, redirect
from datetime import datetime

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
    Displays the most recent data.
    """
    most_recent = iotDB.select_latest('iotDB.db',1,1) # select the latest 1 record without column names
    data = {
        "time": most_recent[0][1],
        "sound": most_recent[0][2],
        "movement": most_recent[0][3],
        "humidity": most_recent[0][4],
        "temperature": most_recent[0][5]
    }
    print(data)
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

'''
@app.route('/generate/<N>')
def generate(N):
    """
    Generates N data records with 5s intervals.
    e.g 127.0.0.1:5000/generate/20
    """
    for i in range(int(N)):
        test.generate_record()
        time.sleep(5)
    return redirect("/dashboard")
'''
