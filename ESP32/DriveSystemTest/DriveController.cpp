#include "DriveController.h"
#include "Motor.h"

DriveController::DriveController()
{
    
}

void DriveController::SetTrim(bool Motor, int16_t speed)
{

}

void DriveController::Forward(uint8_t spaces)
{
    Motor1->Forward(100);
    Motor2->Forward(100);
}

void DriveController::Stop(){
    Motor1->Stop();
    Motor2->Stop();
}
void DriveController::TurnLeft()
{

}
void DriveController::TurnRight()
{

}
void DriveController::UTurn()
{

}