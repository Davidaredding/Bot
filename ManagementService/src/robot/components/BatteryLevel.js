import React, { Component } from 'react';
import '../css/battery.css';

const MAX_VOLTAGE = 4.2;
const MIN_VOLTAGE = 3.0;
const DELTA = MAX_VOLTAGE - MIN_VOLTAGE;
export default class BatteryLevel extends Component{
    
    constructor(props){
        super(props);
        this.state=Object.assign({
            title: "",
            voltage: 3.8
        },props);
    }
    
    
    render(){
        var decrease = ((DELTA - (this.state.voltage-MIN_VOLTAGE)) / DELTA)*10;
        return(
            <div className="battery" >
                <div className="level">
                    <div style={{flex:decrease}}></div>
                    <div className="box" style={{flex:10-decrease}}></div>
                </div>
                <div className="val">
                    <div style={{fontSize: .5+"em"}}>{'\u26A1\u26A1'}</div>
                    <div>{Number(this.state.voltage).toFixed(2)}</div>
                </div>
            </div>
        );
    }
}