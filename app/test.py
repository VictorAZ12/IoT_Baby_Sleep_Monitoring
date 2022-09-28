import requests
import time
import random
def generate_record(N):
    for i in range(N):
        url = "http://127.0.0.1:5000/update/" +\
              str(random.randint(0,1)) + "/" +\
              str(random.randint(0,1)) + "/" +\
              str(random.randrange(20,80)) + "/" +\
              str(random.randrange(0,50)) + "/" +\
              "test" 
        r = requests.get(url)
        time.sleep(5)
