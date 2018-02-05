'use strict';
const ROBOT_STATUS_UPDATE = 'RobtoStatusUpdate';

class Robot{
    static defaultProperties()
    {
        return {
            RSSI:0,
            mac:'',
            name:'',
        };
    }

    constructor(initialSettings){
        this.status = Robot.defaultProperties();
        Object.assign(this.status,initialSettings);
        this.updateSettings = this.updateSettings.bind(this);
    }

    updateSettings(settings)
    {
        Object.assign(this.status,settings);
    }
}

module.exports = Robot;