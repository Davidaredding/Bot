'use strict';

var utilities = require('./utilities');

class Robot{
    constructor(initialSettings){
        super();
        this.status = Robot.defaultProperties();
        Object.assign(this,initialSettings);

        this.updateSettings = this.updateSettings.bind(this);
    }

    updateStatus(newStatus)
    {
        let prevStatus = utilities.copy(this.status);
        Object.assign(this.status,newStatus);
    }

    
    static defaultProperties(){
        return {
            Name:'',
            MAC:'',
	        LastUpdateTime: 0,
            Connected: false,
            Status: new RobotStatus()
        };
    }
}

class RobotStatus{
    constructor(){
        this.RSSI = 0;
        this.BatteryLevel = 0;
    }
    
}

module.exports = Robot;
module.exports = RobotSettings;
