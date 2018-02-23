import React, { Component } from 'react';
import '../css/rssi.css';

export default class Rssi extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            db: -45
        }
    }
    render(){
        return(
            <div className="rssi">
                <header>RSSI</header>
                <div className="bar">
                    <div className={"box " + (this.state.db>-35?'active':'')}></div>
                    <div className={"box " + (this.state.db>-45?'active':'')}></div>
                    <div className={"box " + (this.state.db>-60?'active':'')}></div>
                    <div className={"box " + (this.state.db>-65?'active':'')}></div>
                    <div className={"box " + (this.state.db>-70?'active':'')}></div>
                    
                    
                </div>
                <div className="val">
                    DB {this.state.db}
                </div>
            </div>
        );
    }
}