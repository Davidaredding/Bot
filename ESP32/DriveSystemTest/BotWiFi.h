#ifndef BOTWIFI_h
#define BOTWIFI_h

#include "Arduino.h"

class BotWiFi{
    public:
        BotWiFi(char*, char*);
        void Connect();
        void Connect_Async();
    private:
        static void connect_Task(void* _this);
};

#endif
