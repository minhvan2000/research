/*
  Modbus-Arduino Example - Test Holding Register (Modbus IP ESP8266)
  Configure Holding Register (offset 100) with initial value 0xABCD
  You can get or set this holding register
  Original library
  Copyright by André Sarmento Barbosa
  http://github.com/andresarmento/modbus-arduino

  Current version
  (c)2017 Alexander Emelianov (a.m.emelianov@gmail.com)
  https://github.com/emelianov/modbus-esp8266
*/

#ifdef ESP8266
 #include <ESP8266WiFi.h>
#else //ESP32
 #include <WiFi.h>
#endif
#include <ModbusIP_ESP8266.h>

// Modbus Registers Offsets
const int TEST_HREG = 100;
const int SENSOR_IREG = 100;
const int LED_COIL_1 = 100;
const int LED_COIL_2 = 101;
const int LED_COIL_3 = 102;
const int LED_COIL_4 = 103;

//Used Pins
const int PIN_RELAY_1 = 27; //GPIO27
const int PIN_RELAY_2 = 26; //GPIO26
const int PIN_RELAY_3 = 25; //GPIO25
const int PIN_RELAY_4 = 33; //GPIO33

//ModbusIP object
ModbusIP mb;

long ts;

void setup() {
  Serial.begin(115200);
 
  WiFi.begin("iLotusLand VN", "ilotusland");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  mb.server();
  mb.addHreg(TEST_HREG, 0xABCD);
  // Add SENSOR_IREG register - Use addIreg() for analog Inputs
  mb.addIreg(SENSOR_IREG);

  pinMode(PIN_RELAY_1, OUTPUT);
  pinMode(PIN_RELAY_2, OUTPUT);
  pinMode(PIN_RELAY_3, OUTPUT);
  pinMode(PIN_RELAY_4, OUTPUT);

  mb.addCoil(LED_COIL_1);
  mb.addCoil(LED_COIL_2);
  mb.addCoil(LED_COIL_3);
  mb.addCoil(LED_COIL_4);

  ts = millis();
}
 
void loop() {
  //Call once inside loop() - all magic here
  mb.task();

  digitalWrite(PIN_RELAY_1, mb.Coil(LED_COIL_1));
  digitalWrite(PIN_RELAY_2, mb.Coil(LED_COIL_2));
  digitalWrite(PIN_RELAY_3, mb.Coil(LED_COIL_3));
  digitalWrite(PIN_RELAY_4, mb.Coil(LED_COIL_4));

  //Read each two seconds
  if (millis() > ts + 2000) {
    ts = millis();
    //Setting raw value (0-1024)
    mb.Ireg(SENSOR_IREG, analogRead(A0));
  }
  delay(10);
}
