// CITS5506 IoT Baby Monitor Code

// Libraries
#include <DHT.h> //Include the DHT library


// Arduino Name
String arduinoName = "Arduino1";  // Can be used to identify separate devices connected to the same network


// DHT Sensor Variables & Instructions
#define DHTPIN 2  // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
float hReading;
float tReading;
// Wiring Instructions
// Connect pin 1 (leftmost) of the sensor to whatever DHTPIN is set to
// Connect pin 2 (middle) of the sensor to +5V
// Connect pin 3 (rightmost) of the sensor to GROUND


// Sound Sensor Variables & Instructions
#define ASOUNDPIN A0        // Analog pin connected to the analog output of the sound sensor
float soundRange = 0.025;   // Used to detect sound levels with amplitude above/below sound basis (2.5% of soundBasis)
float soundReading;         // Variable to store current sound reading
float soundBasis;           // Variable to store determined sound basis
bool soundDetected = false; // Variable to report sound events
// Wiring Instructions
// Connect pin 1 (leftmost) of the sensor to whatever ASOUNDPIN is set to
// Connect pin 2 of the sensor to GROUND
// Connect pin 3 of the sensor to +5V
// Pin 4 (rightmost) is unused (for digital signal)


// Motion Sensor Variables & Instructions
#define PIRPIN 3              // Digital pin connected to the PIR sensor
bool motionDetected = false;  // Variable to report motion events
// Connect pin 1 (leftmost) of the sensor to +5V
// Connect pin 2 (middle) of the sensor to whatever PIRPIN is set to
// Connect pin 3 (rightmost) of the sensor to GROUND

// Communication Variables
String incomingString;
String outgoingString;


// Setup Function
void setup() {
  // Initialise serial and sensors
  Serial.begin(9600);
  pinMode(ASOUNDPIN, INPUT);  // set ASOUNDPIN to input
  pinMode(PIRPIN, INPUT);     // set PIRPIN to input
  dht.begin();                // initialise DHT sensor

  // Determine sound basis
  soundBasis = calculateBasis();
 }


// Loop Function
void loop() {

  // Check for sound events if none were already detected in the current period
  if (!soundDetected) {
    soundReading = analogRead(ASOUNDPIN);
    if ((soundReading > soundBasis * (1 + soundRange)) ||
        (soundReading < soundBasis * (1 - soundRange))) {
      soundDetected = true;
    }
  }

  // Check for motion events if none were already detected in the current period
  if (!motionDetected) {
    motionDetected = digitalRead(PIRPIN);
  }
  
  // Reply only when you receive data:
  if (Serial.available() > 0){
    // read the incoming string:
    incomingString = Serial.readString();
    
    // If the incoming string equals "Send a Reading" then send data
    if (incomingString.equals("Send a Reading")){

      // Take DHT readings
      hReading = dht.readHumidity();
      tReading = dht.readTemperature();

      // Construct and send output message
      outgoingString = String(soundDetected) + ",";
      outgoingString += String(motionDetected) + ",";
      outgoingString += String(hReading) + ",";
      outgoingString += String(tReading) + ",";
      outgoingString += arduinoName;
      Serial.print(outgoingString);
      Serial.flush();

      // Reset sensor logic variables for next reporting period
      soundDetected = false;
      motionDetected = false;
    }
  }
}


// Function to calculate sound basis level upon power up
float calculateBasis() {
  float basis = 0;
  int counter = 100;
  while (counter > 0) {
    basis += analogRead(ASOUNDPIN);
    counter -= 1;
    delay(100);
  }
  basis /= 100;
  return basis;
}
