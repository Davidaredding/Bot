#ifndef MOTOR_H
#define MOTOR_H
#include "Arduino.h"

class Motor{
    public:
        Motor(uint8_t EnablePin, uint8_t ForwardPin, uint8_t ReversePin);
        void Initialize();
        void Forward(int speed);
        void Reverse(int speed);
        void Stop();
        void Coast();
};

#endif