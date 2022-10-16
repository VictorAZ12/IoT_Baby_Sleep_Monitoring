# IoT_Baby_Sleep_Monitoring
UWA Internet of Things Group Project  
Project members: Alex McGuckin (22703095), Finn Murphy (22237879), Ronjon Kundu (23215183), Yanchen Zhao (23453469), Yazhen Tian (22942152）

## Setup & Installations

1. Clone the Github repository to your local machine.

2. Open up a terminal and change your current directory to the location you cloned your repository to (e.g. `cd ~/IoT_Baby_Sleep_Monitoring`)

3. Create a virtual environment with the following command: `python3 -m venv venv`

4. If you are using linux/macOS, activate your virtual environment with the following command: `source venv/bin/activate`

5. If you are using windows, activate your virtual environment wit the following command: `venv\Scripts\activate`

6. If the virtual environment is active, your command prompt should contain the text `(venv)` in it.

7. Install the packages from the requirements.txt file with the following command: `pip install -r requirements.txt`

## Run the app

1. Make sure your current directory is the project repository and that your virtual environment is active. 

2. Launch the application with the following command: `flask run`

3. If the webpage doesn't automatically open on your default browser, then copy the url in the terminal output into a browser window, i.e. http://127.0.0.1:5000

4. You should see the application homepage which just says "Hello World!" at this stage. 

## Simulate a device

1. Once the app is running, open a new terminal.

2. Make sure the current directory is the root repository directory.

3. Activate the virtual environment.

4. Call `python3 sim.py` for a simulation with default parameters; num=12 and period=5. 

5. Or, optionally supply `num` and `period` in the command line, e.g. `python3 sim.py 60 1`
