#include <WiFi.h>

const char WIFI_SSID[] = "My Phuong_5G";
const char WIFI_PASSWORD[] = "Suntory2015";

bool isConnected = false;

void setup() {
  Serial.begin(115200);
  pinMode(RGB_BUILTIN, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Starting");
}

void loop(){
  if (WiFi.status() == WL_CONNECTED && !isConnected){
    Serial.println("Conntected");
    rgbLedWrite(RGB_BUILTIN, 1, 2, 3);
    isConnected = true;
  }

  if (WiFi.status() != WL_CONNECTED){
    Serial.println(".");
    digitalWrite(RGB_BUILTIN, !digitalRead(RGB_BUILTIN));
    delay(1000);
    isConnected = false;
  }
}