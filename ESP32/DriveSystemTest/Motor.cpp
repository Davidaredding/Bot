#include "Arduino.h"
#include "Motor.h"
#include "/Users/davidredding/Documents/Arduino/hardware/espressif/esp32/tools/sdk/include/driver/driver/mcpwm.h"


Motor::Motor(uint8_t EnablePin, uint8_t ForwardPin, uint8_t ReversePin){
    _enablePin = EnablePin;
    _forwardPin = ForwardPin;
    _reversePin = ReversePin;
}

int Motor::Initialize(){
    pinMode(_enablePin,OUTPUT); // Enable pin
    digitalWrite(_enablePin,0);
    mcpwm_gpio_init(MCPWM_UNIT_0, MCPWM0A, _forwardPin);
    mcpwm_gpio_init(MCPWM_UNIT_0, MCPWM0B, _reversePin);


    mcpwm_config_t pwm_config;
    pwm_config.frequency = 1000; //50hz
    pwm_config.cmpr_a = 0;
    pwm_config.cmpr_b = 0;
    pwm_config.counter_mode = MCPWM_UP_COUNTER;
    pwm_config.duty_mode = MCPWM_DUTY_MODE_0;
    
    mcpwm_init(MCPWM_UNIT_0, MCPWM_TIMER_0, &pwm_config);
    return (int)&pwm_config;
}

void Motor::Forward(float speed){
    digitalWrite(_enablePin,HIGH);
    mcpwm_set_duty(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_A, speed);
    mcpwm_set_duty(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_B, 0);
    _state.State = RunningState::FORWARD;
    _state.Speed = speed;
    Latch();

}

void Motor::Reverse(float speed){
    digitalWrite(_enablePin,HIGH);
    mcpwm_set_duty(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_B, speed);
    mcpwm_set_duty(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_A, 0);
    _state.State = RunningState::REVERSE;
    _state.Speed = speed;
    Latch();    
}

void Motor::Stop(){
    mcpwm_set_duty(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_A, 100);
    mcpwm_set_duty(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_B, 100);
    _state.State = RunningState::STOPPED;
    _state.Speed = 0;
    Latch();
    Coast();
}

void Motor::Coast(){
    digitalWrite(_enablePin,LOW);
    mcpwm_set_signal_low(MCPWM_UNIT_0, MCPWM_TIMER_0,MCPWM_OPR_A);
    mcpwm_set_signal_low(MCPWM_UNIT_0, MCPWM_TIMER_0,MCPWM_OPR_B);
    mcpwm_set_duty(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_A, 0);
    mcpwm_set_duty(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_B, 0);
    _state.State = RunningState::COASTING;
    _state.Speed = 0;
    Latch();
}

void Motor::Latch(){
    mcpwm_set_signal_low(MCPWM_UNIT_0, MCPWM_TIMER_0,MCPWM_OPR_B);
    mcpwm_set_signal_low(MCPWM_UNIT_0, MCPWM_TIMER_0,MCPWM_OPR_A);
    mcpwm_set_duty_type(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_A,MCPWM_DUTY_MODE_0);
    mcpwm_set_duty_type(MCPWM_UNIT_0,MCPWM_TIMER_0,MCPWM_OPR_B,MCPWM_DUTY_MODE_0);
}