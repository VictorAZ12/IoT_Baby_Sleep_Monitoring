from flask import Flask
import mimetypes
import os
import sys
import subprocess
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')

app = Flask(__name__,
            static_folder='./dist',
            template_folder = "./dist",
            static_url_path="")

from app import routes
from app import iotDB
iotDB.init_db("iotDB.db")

fileName = "arduino.pyw"
if sys.platform == "win32":
    os.startfile(fileName)
else:
    if sys.platform == "darwin":
        opener = "open"
    else:
        opener = "xdg-open"
    subprocess.call([opener, fileName])
