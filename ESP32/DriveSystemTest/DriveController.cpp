#include "DriveController.h"
#include "Motor.h"

Motor* _motor_1;
Motor* _motor_2;

DriveController::DriveController(Motor* m1, Motor* m2)
{
    _motor_1 = m1;
    _motor_2 = m2;
}

void DriveController::SetTrim(bool Motor, int16_t speed)
{

}

void DriveController::Forward(uint8_t spaces)
{

}

void DriveController::Stop(){

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