void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("Blinking led...");
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.println("Blinking ON...");
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  Serial.println("Blinking OFF...");
  delay(1000);
}
