import requests
import random
import time
import sys

def request():
    """
    Updates database with a new record by requesting a url. 
    Url is of the form: /update/<sound>/<movement>/<humidity>/<temperature>/<device_id>
    Sensor field data is randomly sampled from appripriate ranges.
    """
    url = "http://127.0.0.1:5000/update/" +\
            str(random.randint(0,1)) + "/" +\
            str(random.randint(0,1)) + "/" +\
            str(random.randrange(20,80)) + "/" +\
            str(random.randrange(0,50)) + "/" +\
            "test" 
    requests.get(url)
    return url

def simulate(num, period):
    """
    Generate 'num' records, waiting 'period' seconds in between each time.
    """
    for i in range(num):
        url = request()
        print("Request %i: %s" % (i + 1, url))
        if i == num - 1:
            break
        time.sleep(period)

def main():
    """
    Calls simulate() function with optional args supplied from command line.
    If no args given, default 'num' and 'period' are 12 and 5 respectively.
    """
    if len(sys.argv) == 3:
        num = int(sys.argv[1])
        period = int(sys.argv[2])
        simulate(num, period)
    else:
        simulate(12, 5)

if __name__ == '__main__':
    main()