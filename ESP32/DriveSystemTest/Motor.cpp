#include "Arduino.h"
#include "Motor.h"

uint8_t _enablePin, _forwardPin, _reversePin;


Motor::Motor(uint8_t EnablePin, uint8_t ForwardPin, uint8_t ReversePin){
    _enablePin = EnablePin;
    _forwardPin = ForwardPin;
    _reversePin = ReversePin;
}

void Motor::Initialize(){
    pinMode(_enablePin,OUTPUT);
    pinMode(_forwardPin,OUTPUT);
    pinMode(_reversePin,OUTPUT);

    digitalWrite(_enablePin,0);
    digitalWrite(_forwardPin,0);
    digitalWrite(_reversePin,0);
}

void Motor::Forward(int speed){
    digitalWrite(_enablePin,HIGH);
    digitalWrite(_forwardPin,HIGH);
    digitalWrite(_reversePin,LOW);
}

void Motor::Reverse(int speed){
    digitalWrite(_enablePin,HIGH);
    digitalWrite(_forwardPin,LOW);
    digitalWrite(_reversePin,HIGH);
}

void Motor::Stop(){
    
}

void Motor::Coast(){
    digitalWrite(_enablePin,LOW);
    digitalWrite(_enablePin,LOW);
    digitalWrite(_enablePin,LOW);
}