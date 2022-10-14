# Libraries
import socket
import sys
import threading
import time
import requests

# Control Variables
HOST = ''       # Symbolic name, meaning all available interfaces
PORT = 9000     # Arbitrary non-privileged port
period = 5      # Number of seconds between requested readings
maxDevices = 4  # Maximum number of devices to be connected to the host server

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # Set up the socket that will be used to connect with ESP-13 shield/s

def initialize():
    """
    Initialises the socket using the host and port defined above.
    Description of the successful bind is printed to terminal.
    """
    print(time.ctime() + ': Socket created')
    try:
        s.bind((HOST, PORT))
    except socket.error as msg:
        print(str(msg))
        sys.exit()

    print(time.ctime() + ": Socket bind complete")
    data = s.getsockname()
    print(time.ctime() + ": Targeting port " + str(data[1]))


def connect():
    """
    Starts a seperate thread to listen for socket connection requests.
    Starts the operation loop for the program.
    """
    y = threading.Thread(target=socket_listening)
    y.daemon = True # By setting Daemon to true, this thread will exit when the main program exits
    y.start()
    y.run()         # Runs the operation loop for the program
        

def socket_listening():
    """
    Listens for socket requests and connects from available devices.
    's.listen' is a blocking command housed in its own thread to not block other threads from running.
    """
    s.listen(maxDevices)
    for index in range(maxDevices):
        conn, addr = s.accept()
        print(time.ctime() + ': Connected with ' + addr[0] + ':' + str(addr[1]))
        x = threading.Thread(target=client_thread, args=(conn, addr, PORT,))
        x.start()

	
def client_thread(connection, ip, port, max_buffer_size = 1024):
    """
    Handles the connection and communication for a single device.
    A thread is instantiated for each socket connection request.
    connection: the connection to be serviced
    ip: unused variable, necessary for function to run
    port: unused variable, necessary for function to run
    max_buffer_size: the maximum size for a received message, default is 1024 
    """
    print(time.ctime() + ": Start sending readings - " + threading.current_thread().name + "\n")
    sendString = "Send a Reading"
    delayStart = time.perf_counter() 

    receivedBytes = ""
    while True:
        if ((time.perf_counter() - delayStart) >= period):      # Change period value at top of file
            delayStart = time.perf_counter()                    # Reset period delay for next reading
            connection.send(sendString.encode("utf-8"))         # Send only takes string
            receivedBytes = connection.recv(max_buffer_size)
            receivedString = receivedBytes.decode("utf-8")
            variableList = list(receivedString.split(","))      # Data is comma separated
            print(time.ctime() + ": " + str(variableList))

            # Send received data to the database, or exit if server has stopped responding
            url = "http://127.0.0.1:5000/update/" + variableList[0] + "/" + variableList[1] + "/" + variableList[2] + "/" + variableList[3] + "/" + variableList[4]
            try:
                requests.get(url)
            except requests.exceptions.RequestException:
                # Exit prevents blocking communications with shield's IP on socket
                s.close()
                connection.close()
                print('exit')
                return

# Start the device communications
initialize()
connect()
