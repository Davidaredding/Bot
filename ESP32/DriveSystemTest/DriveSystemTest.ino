#include <WiFi.h>
#include "BotWiFi.h"
#include "DriveController.h"
#include "Motor.h"

char* _ap = "Not the NSA";
char* _pass = "Did you touch my ass?";
#define WIFI_CONNECTION_DELAY 500


BotWiFi _botWiFi = BotWiFi(_ap,_pass);

Motor* m1 = new Motor(23,19,18);

void setup() {
  Serial.begin(115200);
  _botWiFi.Connect();
  m1->Initialize();
}

void loop() {
  m1->Forward(1);
  delay(1000);
  m1->Coast();
  delay(700);
  m1->Reverse(1);
  delay(1000);
  m1->Coast();
  delay(700);
}
