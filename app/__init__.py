from flask import Flask
import mimetypes
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')

app = Flask(__name__)

from app import routes
from app import iotDB
iotDB.init_db("iotDB.db")