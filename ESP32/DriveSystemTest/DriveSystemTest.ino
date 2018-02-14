#include <WiFi.h>
#include "BotWiFi.h"

char* _ap = "Not the NSA";
char* _pass = "Did you touch my ass?";
#define WIFI_CONNECTION_DELAY 500


BotWiFi _botWiFi = BotWiFi(_ap,_pass);

void setup() {
  Serial.begin(115200);
  _botWiFi.Connect();
}

void loop() {}
