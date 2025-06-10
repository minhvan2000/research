#include <WiFi.h>

const char SSID_WIFI[] = "Guest";
const char PASS_WIFI[] = "P@ssword2025";

bool isConnected = false;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  WiFi.begin(SSID_WIFI, PASS_WIFI);
  pinMode(RGB_BUILTIN, OUTPUT);

  Serial.println("Starting...");
}

void loop() {
  // put your main code here, to run repeatedly:
  if (WiFi.status() == WL_CONNECTED && !isConnected) {
    Serial.println("Connected!");
    rgbLedWrite(RGB_BUILTIN, 0, 1, 2);
    isConnected = true;
  }

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println(".");
    digitalWrite(RGB_BUILTIN, !digitalRead(RGB_BUILTIN));
    delay(500);
    isConnected = false;
  }
}
