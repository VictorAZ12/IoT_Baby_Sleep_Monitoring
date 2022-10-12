import socket
import sys
import threading
import time

import requests

# ----------------------------------------------------------------------------------------------------------------------------------------------------

HOST = ''       # Symbolic name, meaning all available interfaces
PORT = 9000     # Arbitrary non-privileged port
period = 5      # Number of seconds between requested readings (+ a bit of lag)
maxDevices = 4  # Maximum number of devices to be connected to the host server

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # Set up the socket that will be used to connect ESP13


def initialize():
    """
    Initialises the socket using the host and port defined above.
    Description of the successful bind is printed to terminal.
    """
    print('Socket created')
    try:
        s.bind((HOST, PORT))
    except socket.error as msg:
        print(str(msg))
        sys.exit()

    print(' - Socket bind complete ')
    data = s.getsockname()
    print(data[0] + ":" +str(data[1]))


def connect():
    """
    Starts a seperate thread to listen for socket connection requests.
    Starts the operation loop for the program.
    """
    y = threading.Thread(target=socket_listening,)
    y.daemon = True # By setting Daemon to true, this thread will exit when the main program exits
    y.start()
    y.run()         # Runs the operation loop for the program
        

def socket_listening():
    """
    Listens for socket requests and connects.
    's.listen' is a blocking command housed in its own thread to not block other threads from running.
    """
    print('Socket now listening\n')
    s.listen(maxDevices)
    for index in range(maxDevices):
        conn, addr = s.accept()
        connection = 'Connected with ' + addr[0] + ':' + str(addr[1]) + '\n'
        print('connection ',addr)
        print(connection)
        print('connect complete')
        x = threading.Thread(target=client_thread, args=(conn, addr, PORT,))
        x.start()

	
def client_thread(connection, ip, port, max_buffer_size = 1024):
    """
    Handles the connection and communication for a single device.
    A thread is instantiated for each socket connection request.
    connection: the connection to service
    max_buffer_size: the maximum size for a received message
    """
    print(threading.current_thread().name)
    sendString = "Send a Reading"
    delayStart = time.perf_counter()
    print(sendString) 

    is_active = True
    receiveBytes = " "
    while is_active:
        if ((time.perf_counter() - delayStart) >= period):             # Change period value at top of file
            delayStart = time.perf_counter()
            connection.send(sendString.encode("utf-8"))                # Send only takes string
            receiveBytes = connection.recv(max_buffer_size)
            receiveString = receiveBytes.decode("utf-8")
            li = list(receiveString.split(","))                        # Data is comma separated
            li.append(time.ctime())                                    # Append time stamp to the list
            print(li)

            # Send received data to the database
            url = "http://127.0.0.1:5000/update/" + li[0] + "/" + li[1] + "/" + li[2] + "/" + li[3] + "/" + li[4]
            requests.get(url)


def exit(event):
    """
    Closes the logging file, socket and exits the program
    """
    s.close()
    print('exit')


initialize()
connect()
print('Program ended')
