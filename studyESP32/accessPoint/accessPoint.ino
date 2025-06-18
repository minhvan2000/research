#include <WiFi.h>
#include <NetworkClient.h>
#include <WiFiAP.h>

#ifndef LED_BUILTIN
#define LED_BUILTIN 2 //Set the GPIO pin when we connected our test LED or comment this line out if our dev board has a built-in LED
#endif

bool isDark = false

//Set these to our desired credentials.
const char *ssid = "ESP32S3";
const char *password = "$Minhdv@123#";

NetworkServer server(80);

void setup() {
  // put our setup code here, to run once:
  Serial.begin(115200);
  Serial.println();
  Serial.println("Configuration access point...");

  pinMode(LED_BUILTIN, OUTPUT);

  //We can remove the password parameter if we want the AP to be open.
  //a valid password must have more than 7 characters
  if (!WiFi.softAP(ssid, password)) {
    log_e("Soft AP creation failed!");
    while (1); 
  }
  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);
  server.begin();

  Serial.println("Server started!");
}

void loop() {
  // put our main code here, to run repeatedly:
  configWiFi()
}

void configWiFi() {
  NetworkClient client = server.accept(); //Listen for incoming clients
  if (client) {                     // If we get a client,
    Serial.println("New client.");  // print a message out the serial port
    String currentLine = "";        // make a String to hold incoming data from the client
    while (client.connected()) {    // Loop while the client's connected
      if (client.available()) {     // If there's bytes to read from the client.
        char c = client.read();     // read a byte, then
        Serial.write(c);            // print it out the serial monitor
        if (c == '\n') {             // If the byte is a newline character

          // If the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response;
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
            // add a content-type so the client knows what's coming, then a blank line:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();

            // The content of the HTTP response follows the header:
            client.print("<!DOCTYPE html>");
            client.print("<html lang=\"en\">");
            client.print("<head>");
            client.print("<meta charset=\"UTF-8\" />");
            client.print("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />");
            client.print("<title>Set up WiFi</title>");
            client.print("<style>");
            client.print("body { margin: 0; background-color: #435165; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }");
            client.print(".login-box { background: #e6e6e6; width: 300px; box-shadow: 0 0 10px rgba(0,0,0,0.3); position: relative; padding: 20px; padding-top: 40px; }");
            client.print(".login-box::before { content: ''; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid #2b89e0; }");
            client.print(".login-header { background: #2b89e0; color: white; text-align: center; padding: 15px; font-size: 1.2rem; position: absolute; top: -40px; left: 0; right: 0; }");
            client.print(".login-box input[type="text"], .login-box input[type="password"] { width: 100%; padding: 10px; margin: 10px 0; box-sizing: border-box; border: 1px solid #ccc; }");
            client.print(".login-box input[type="checkbox"] { margin-right: 5px; }");
            client.print(".show-password { font-size: 0.9rem; color: #333; margin-bottom: 10px; }");
            client.print(".login-box button { width: 100%; padding: 10px; background-color: #2b89e0; border: none; color: white; font-size: 1rem; cursor: pointer; }");
            client.print(".login-box button:hover { background-color: #1e6fbf; }");
            client.print("</style>");
            client.print("</head>");

            client.print("<body>");
            client.print("<div class=\"login-box\">");
            client.print("<div class=\"login-header\">LOG IN</div>");
            client.print("<form>");
            client.print("<input type=\"email\" placeholder=\"Email\" required />");
            client.print("<input type=\"password\" placeholder=\"Password\" id=\"passwordField\" required />");
            client.print("<div class=\"show-password\">");
            client.print("<input type=\"checkbox\" onclick=\"togglePassword()\"> Show Password");
            client.print("</div>");
            client.print("<button type=\"submit\">Connect to WiFi</button>");
            client.print("</form>");
            client.print("</div>");
            client.print("<script>");
            client.print("function togglePassword() {");
            client.print("const passwordField = document.getElementById(\"passwordField\");");
            client.print("passwordField.type = passwordField.type === \"password\" ? \"text\" : \"password\";");
            client.print("}");
            client.print("</script>");
            client.print("</body>");
            client.print("</html>");

            // The HTTP response ends with another blank line:
            client.println();
            // Break out of while loop;
            break;
          } else {  // If we got a newline, then clear currentLine:
            currentLine = "";
          }
        } else if (c != '\r') {   // If you got anything else but a carriage return character,
          currentLine += c;       // add it to the end of the currentLine
        }

        // Check to see if the client request was "GET /on" or "GET /off":
        if (currentLine.endsWith("GET /on")) {
          digitalWrite(LED_BUILTIN, HIGH);  // GET /on turns the LED on
        }
        if (currentLine.endsWith("GET /off")) {
          digitalWrite(LED_BUILTIN, LOW);   // GET /off turns the LED off
        }
      }
    }
    // Close the connection;
    client.stop();
    Serial.println("Client Disconnected!");
  }
}

void dashboard() {
  NetworkClient client = server.accept(); //Listen for incoming clients
  if (client) {                     // If we get a client,
    Serial.println("New client.");  // print a message out the serial port
    String currentLine = "";        // make a String to hold incoming data from the client
    while (client.connected()) {    // Loop while the client's connected
      if (client.available()) {     // If there's bytes to read from the client.
        char c = client.read();     // read a byte, then
        Serial.write(c);            // print it out the serial monitor
        if (c == '\n') {             // If the byte is a newline character

          // If the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response;
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
            // add a content-type so the client knows what's coming, then a blank line:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();

            // The content of the HTTP response follows the header:
            client.print("<!DOCTYPE html>");
            client.print("<html lang=\"en\">");
            client.print("<head>");
            client.print("<meta charset=\"UTF-8\" />");
            client.print("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />");
            client.print("<title>Power Button with Dark Mode</title>");
            client.print("<style>");
            client.print(":root {--bg-color: #f9f9f9;--text-color: #666;--button-bg: radial-gradient(circle, #eee 30%, #ccc 100%);--button-border: #ddd;--button-text: #666;--indicator-on: orange;--indicator-off: #aaa;}");
            client.print("body.dark {--bg-color: #121212;--text-color: #ddd;--button-bg: radial-gradient(circle, #333 30%, #222 100%);--button-border: #555;--button-text: #eee;--indicator-on: #ffa500;--indicator-off: #555;}");
            client.print("body {margin: 0;padding: 0;background: var(--bg-color);font-family: Arial, sans-serif;color: var(--text-color);display: flex;flex-direction: column;justify-content: center;align-items: center;height: 100vh;transition: background 0.3s, color 0.3s;}");
            client.print(".dark-toggle {position: absolute;top: 1rem;right: 1rem;background: var(--button-border);color: var(--text-color);border: none;padding: 0.5rem 1rem;border-radius: 6px;cursor: pointer;font-size: 1rem;transition: background 0.3s;}");
            client.print(".dark-toggle:hover {background: #888;}");
            client.print(".button-container {display: flex;flex-direction: column;align-items: center;}");
            client.print(".round-button {width: 200px;height: 200px;background: var(--button-bg);border: 6px solid var(--button-border);border-radius: 50%;box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);position: relative;cursor: pointer;display: flex;justify-content: center;align-items: center;transition: all 0.3s ease-in-out;}");
            client.print(".round-button span {font-size: 2rem;font-weight: bold;color: var(--button-text);}");
            client.print(".indicator {width: 14px;height: 14px;background: var(--indicator-on);border-radius: 50%;position: absolute;bottom: 20px;transition: background 0.3s;}");
            client.print(".label {margin-top: 1rem;font-size: 1.2rem;color: var(--text-color);}");
            client.print("@media (max-width: 768px) {.round-button {width: 150px;height: 150px;}.round-button span {font-size: 1.5rem;}.label {font-size: 1rem;}}");
            client.print("@media (max-width: 480px) {.round-button {width: 120px;height: 120px;}.round-button span {font-size: 1.2rem;}.label {font-size: 0.9rem;}}");
            client.print("</style>");
            client.print("</head>");
            client.print("<body>");
            client.print("<button class=\"dark-toggle\" onclick=\"toggleDarkMode()\">🌙 Dark Mode</button>");
            client.print("<div class=\"button-container\">");
            client.print("<div class=\"round-button\" onclick=\"togglePower()\" id=\"powerButton\">");
            client.print("<span id=\"buttonText\">ON</span>");
            client.print("<div class=\"indicator\" id=\"indicator\"></div>");
            client.print("</div>");
            client.print("<div class=\"label\" id=\"statusLabel\">Power ON</div>");
            client.print("</div>");
            client.print("<script>");
            client.print("function togglePower() {");
            client.print("const text = document.getElementById(\"buttonText\");");
            client.print("const indicator = document.getElementById(\"indicator\");");
            client.print("const label = document.getElementById(\"statusLabel\");");
            client.print("const isOn = text.innerText === \"ON\";");
            client.print("if (isOn) {");
            client.print("text.innerText = \"OFF\";");
            client.print("indicator.style.background = getComputedStyle(document.body).getPropertyValue(\"--indicator-off\").trim();");
            client.print("label.innerText = \"Power OFF\";");
            client.print("updateURL(\"off\");");
            client.print("} else {");
            client.print("text.innerText = \"ON\";");
            client.print("indicator.style.background = getComputedStyle(document.body).getPropertyValue(\"--indicator-on\").trim();");
            client.print("label.innerText = \"Power ON\";");
            client.print("updateURL(\"on\");");
            client.print("}");
            client.print("}");
            client.print("function updateURL(state) {");
            client.print("window.location.href = state;");
            client.print("}");
            client.print("function toggleDarkMode() {");
            client.print("document.body.classList.toggle(\"dark\");");
            client.print("}");
            client.print("window.addEventListener(\"DOMContentLoaded\", () => {");
            client.print("const lastSegment = window.location.pathname.split(\"/\").pop();");
            client.print("const text = document.getElementById(\"buttonText\");");
            client.print("const indicator = document.getElementById(\"indicator\");");
            client.print("const label = document.getElementById(\"statusLabel\");");
            client.print("if (lastSegment === \"off\") {");
            client.print("text.innerText = \"OFF\";");
            client.print("indicator.style.background = getComputedStyle(document.body).getPropertyValue(\"--indicator-off\").trim();");
            client.print("label.innerText = \"Power OFF\";");
            client.print("} else {");
            client.print("text.innerText = \"ON\";");
            client.print("indicator.style.background = getComputedStyle(document.body).getPropertyValue(\"--indicator-on\").trim();");
            client.print("label.innerText = \"Power ON\";");
            client.print("}");
            client.print("});");
            client.print("</script>");
            client.print("</body>");
            client.print("</html>");

            // The HTTP response ends with another blank line:
            client.println();
            // Break out of while loop;
            break;
          } else {  // If we got a newline, then clear currentLine:
            currentLine = "";
          }
        } else if (c != '\r') {   // If you got anything else but a carriage return character,
          currentLine += c;       // add it to the end of the currentLine
        }

        // Check to see if the client request was "GET /on" or "GET /off":
        if (currentLine.endsWith("GET /on")) {
          digitalWrite(LED_BUILTIN, HIGH);  // GET /on turns the LED on
        }
        if (currentLine.endsWith("GET /off")) {
          digitalWrite(LED_BUILTIN, LOW);   // GET /off turns the LED off
        }

        // Check to see if the client request was "GET /dark" or "GET /light":
        if (currentLine.endsWith("GET /dark")) {
          isDark = true;
        }
        if (currentLine.endsWith("GET /light")) {
          isDark = false;
        }
      }
    }
    // Close the connection;
    client.stop();
    Serial.println("Client Disconnected!");
  }
}
