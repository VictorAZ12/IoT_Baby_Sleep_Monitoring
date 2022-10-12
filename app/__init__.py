from flask import Flask

app = Flask(__name__)

from app import routes
from app import iotDB
iotDB.init_db("iotDB.db")

from arduino import arduino
