#ifndef MOTOR_H
#define MOTOR_H
#include "Arduino.h"
#include "/Users/davidredding/Documents/Arduino/hardware/espressif/esp32/tools/sdk/include/driver/driver/mcpwm.h"

enum RunningState{
    IDLE,FORWARD,REVERSE,STOPPED,COASTING
};

typedef struct MotorState{
    RunningState State;
    float Speed;
};

class Motor{
    public:
        Motor(uint8_t EnablePin, uint8_t ForwardPin, uint8_t ReversePin, bool Unit);
        int Initialize();
        void Forward(float speed);
        void Reverse(float speed);
        void Stop();
        void Coast();
        MotorState _state;
    private:
        void Latch();
        uint8_t _enablePin;
        uint8_t _forwardPin;
        uint8_t _reversePin;
        mcpwm_unit_t _unit;
};



#endif

