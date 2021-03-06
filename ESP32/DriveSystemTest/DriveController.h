#ifndef DRIVE_CONTROLLER_H
#define DRIVE_CONTROLLER_H
#include "Arduino.h"
#include "Motor.h"

class DriveController{
    public:
        DriveController();
        void SetTrim(bool Motor, int16_t speed);
        void Forward(uint8_t spaces);
        void Stop();
        void TurnLeft();
        void TurnRight();
        void UTurn();
        Motor* Motor1;
        Motor* Motor2;
};


#endif