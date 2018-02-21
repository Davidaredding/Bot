#include <WiFi.h>
#include "BotWiFi.h"
#include "DriveController.h"
#include "Motor.h"

char* _ap = "Not the NSA";
char* _pass = "Did you touch my ass?";
#define WIFI_CONNECTION_DELAY 500


BotWiFi _botWiFi = BotWiFi(_ap,_pass);

Motor m1 = *new Motor(23,19,18);
Motor m2 = *new Motor(22,5,17);
DriveController controller = *new DriveController();


void setup() {
  Serial.begin(115200);
  delay(1000);
  m1.Initialize();
  m2.Initialize();
  controller.Motor1 = &m1;
  controller.Motor2 = &m2;
  _botWiFi.Connect();
  
}

bool cmdAvilable = false;
char buff[8];
uint8_t idx = 0;
float _s = 0;
void loop() {
 if(cmdAvilable)
 {
   if(buff[0] == 0x01){
    _s = (float)buff[1];
    controller.Forward(0);
    Serial.println("Forward");
   }
   if(buff[0] == 0x02){
    m1.Forward((float)buff[1]);
    m2.Forward((float)buff[1]);
   }
   if(buff[0] == 0x03){
    controller.Stop();
    Serial.println("Stop");
   }
   if(buff[0] == 0x04){
    
   }
   memset(buff,0,8);
 }
  SerialEvent();
  
}

void wifi(){

}

void SerialEvent() {
  while (Serial.available()) {
   cmdAvilable = false;
   char incoming = (char)Serial.read();
   Serial.println(incoming);
   buff[idx] = incoming;
   idx++;
   
   if(idx>=7)
    idx = 0;
  
  if(incoming== '\0'){
    cmdAvilable = true;
    idx = 0;
  }
  }
  
}
