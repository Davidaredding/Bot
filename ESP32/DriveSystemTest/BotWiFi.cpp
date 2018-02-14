#include <WiFi.h>
#include "BotWiFi.h"

#define WIFI_CONNECTION_DELAY 500
char* _ssid;
char* _password;

BotWiFi::BotWiFi(char* ssid, char* password)
{
  _ssid = ssid;
  _password = password;
}

void BotWiFi::Connect()
{
  if(!Serial.available())
  {
    Serial.begin(115200);
    delay(10);
    Serial.print("Connecting to ");
    Serial.print(_ssid);

    WiFi.begin(_ssid,_password);
    while(WiFi.status() != WL_CONNECTED)
    {
      delay(WIFI_CONNECTION_DELAY);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print(WiFi.localIP());
  }
}
