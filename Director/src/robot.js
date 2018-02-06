'use strict';
var events = require('events');
var utilities = require('./utilities');

class Robot extends events.EventEmitter{
    

    constructor(initialSettings){
        super();
        this.status = Robot.defaultProperties();
        Object.assign(this.status,initialSettings);

        this.events = {ROBOT_ON_SETTINGS_CHANGE: "ROBOT_ON_SETTINGS_CHANGED"}
        this.updateSettings = this.updateSettings.bind(this);
    }

    updateSettings(newStatus)
    {
        let prevStatus = utilities.copy(this.status);
        Object.assign(this.status,newStatus);
        this.emit(utilities.ROBOT_ON_SETTINGS_CHANGE, prevStatus,this.status);
    }

    static defaultProperties(){
        return {
            RSSI:0,
            mac:'',
            name:'',
        };
    }
}

module.exports = Robot;