'use strict';
class Robot{
    static defaultProperties()
    {
        return {
            RSSI:0,
            macAddress:'',
            name:'',
        };
    }

    constructor(initialSettings){
        Object.assign(this,Robot.defaultProperties(),initialSettings);
    }
}

module.exports.Robot = Robot;