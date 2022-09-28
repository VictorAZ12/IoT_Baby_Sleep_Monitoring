import requests
import random
# generate_record(): generates a record and update to the database when called.
def generate_record():
    url = "http://127.0.0.1:5000/update/" +\
            str(random.randint(0,1)) + "/" +\
            str(random.randint(0,1)) + "/" +\
            str(random.randrange(20,80)) + "/" +\
            str(random.randrange(0,50)) + "/" +\
            "test" 
    requests.get(url)