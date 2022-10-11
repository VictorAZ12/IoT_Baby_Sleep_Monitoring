import socket
import tkinter as tk
import threading
import csv
import sys
import time

HOST = ''   # Symbolic name, meaning all available interfaces
PORT = 9000 # Arbitrary non-privileged port
period = 5  # Number of seconds between requested readings (+ a bit of lag)

sensorLock = threading.Lock()                           # This lock is used to make sure that only one thread can write to the logging file at a time
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # Set up the socket that will be used to connect ESP13
logging = open('logging.csv',mode='a')                  # CSV file that will be used to log sensor data

# This routine initializes the socket using the host and port defined above
# Description of the successful bind is written to the first entry box of the GUI

def initialize(event):
	entry1.insert (0,'Socket created')
	
	try:
	   s.bind((HOST, PORT))
	except socket.error as msg:
	   entry1.insert(tk.END,str(msg))
	   sys.exit()
   
	entry1.insert(tk.END,' - Socket bind complete ')
	data = s.getsockname()
	entry1.insert(tk.END,data[0] + ":" +str(data[1]))

# This routine starts a seperate thread that will listen for socket connection requests and returns to the GUI
	
def connect(event):
        y = threading.Thread(target=socket_listening,)
        y.daemon = True #By setting Daemon to true, this thread will exit when the main program exits
        y.start()
        
# This routine listens for socket requests and connects
# Because s.listen is a blocking command, it is housed in its own thread and will not block other threads from running
# Code below will accept up to 4 requests; change for loop index if more are required
# Comment out print statements if required           

def socket_listening():
	text1.insert(tk.END,'Socket now listening\n')
	s.listen(4)
	for index in range(4):
	  conn, addr = s.accept()
	  connection = 'Connected with ' + addr[0] + ':' + str(addr[1]) + '\n'
	  print('connection ',addr)
	  text1.insert(tk.END,connection)
	  print('connect complete')
	  x = threading.Thread(target=client_thread, args=(conn, addr, PORT,))
	  x.start()

# This routine handles the connection and communication for a single Arduino
# One thread will be instantiated for each socket connection request
# If a "Send a Reading" string is sent to the Arduino, it will respond with sensor readings
# The while loop runs for the cycle specified by the "period" function
# If the Arduino sends a "quit" string, the connection is closed and the thread exits (Arduino code currently doesn't do this)
	
def client_thread(connection, ip, port, max_buffer_size = 1024):
        print(threading.current_thread().name)
        print(ip)
        sendString = "Send a Reading"
        delayStart = time.perf_counter()
        print(sendString)  
        logging_writer = csv.writer(logging, quotechar='"', quoting=csv.QUOTE_MINIMAL)
        is_active = True
        receiveBytes = " "
        while is_active:
           if ((time.perf_counter() - delayStart) >= period):           # Change period value a top of file
             delayStart = time.perf_counter()
             connection.send(sendString.encode("utf-8"))                # Send only takes string
             receiveBytes = connection.recv(max_buffer_size)
             receiveString = receiveBytes.decode("utf-8")
             li = list(receiveString.split(","))                        # Data is comma separated
             li.append(time.ctime())                                    # Append time stamp to the list
             print(receiveString)
             print(li)
             sensorLock.acquire()
             logging_writer.writerow(li)                                # Write received data to logging file
             sensorLock.release()             
             
           if b"quit" == receiveBytes: # If the Arduino sends a "quit" string, connection is closed and thread exits
             connection.close()             
             print("Connection " + ip[0] + ":" + str(ip[1]) + " closed")
             text1.insert(tk.END,"Connection " + ip[0] + ":" + str(ip[1]) + " closed" + "\n")
             is_active = False

# This routine closes the logging file, socket and exits the program

def exit(event):        
        logging.close()
        s.close()
        print('exit')
        window.destroy()

# The GUI is defined here using tkinter commands

window = tk.Tk()
window.title("ESP13 IOT")

frame1 = tk.Frame(master=window,relief=tk.FLAT,	borderwidth=5)
frame1.pack()
frame2 = tk.Frame(master=window,relief=tk.FLAT,	borderwidth=5)
frame2.pack()

label1 = tk.Label(master=frame1,text="Socket Ready",fg="black",width = 25,height = 2)
label1.grid(row=0,column=0,padx=20,pady=20,sticky="w")

entry1 = tk.Entry(master=frame1,fg="black",bg="white",width=75)
entry1.grid(row=0,column=1,padx=10,pady=10)

label2 = tk.Label(master=frame1,text="Sockets Connected",fg="black",width = 25,height = 2)
label2.grid(row=1,column=0,padx=20,pady=20,sticky="w")

text1 = tk.Text(master=frame1,fg="black",bg="white",height=25,width=75)
text1.grid(row=1,column=1,padx=10,pady=10)

button1 = tk.Button(master=frame2,text="Initialize",width=10,height=2,relief=tk.RAISED,fg="black")
button1.grid(row=0,column=0,padx=20,pady=20)
button1.bind("<Button-1>",initialize)

button2 = tk.Button(master=frame2,text="Connect",width=10,height=2,relief=tk.RAISED,fg="black")
button2.grid(row=0,column=1,padx=20,pady=20)
button2.bind("<Button-1>",connect)

button5 = tk.Button(master=frame2,text="Exit",width=10,height=2,relief=tk.RAISED,fg="black")
button5.grid(row=0,column=4,padx=20,pady=20)
button5.bind("<Button-1>",exit)

window.mainloop()
print('Program ended')