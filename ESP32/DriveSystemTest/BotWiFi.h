#ifndef BOTWIFI_h
#define BOTWIFI_h

#include "Arduino.h"

class BotWiFi{
    public:
        BotWiFi(char*, char*);
        void Connect();
};

#endif
