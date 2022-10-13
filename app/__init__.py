from flask import Flask
import mimetypes
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')

app = Flask(__name__,
            static_folder='./dist',
            template_folder = "./dist",
            static_url_path="")

from app import routes
from app import iotDB
iotDB.init_db("iotDB.db")

import os
os.startfile("arduino.py")
