import React, { Component } from 'react';
import '../css/table.css';


export default class Table extends Component{
    
    constructor(props){
        super(props);
        this.state=Object.assign({
            title: "Table",
            data:[
                {key:"Name", val:"Dan Demobot"},
                {key:"Mac", val:"36-81-92-82-BB-F4"},
                {key:"IP", val:"192.168.1.102"}
                
            ]
        },props);
    }
    //(4.2-3.0)=1.2
    //(((4.2-3) - (currentCharge - 3))/(4.2-3))*10
    //((MAX-MIN) - (voltage-MIN) / (MAX-MIN))*10
    
    render(){
        var d = this.state.data;
        return(
            <div className="table" >
                <header>{this.state.title}</header>
                {
                    d.map((v,i)=>
                        <div className="row" key={i.toString()}>
                            <div className="key">{v.key}</div>
                            <div className="val">{v.val}</div>
                        </div>    
                    )
                }
                
            </div>
        );
    }
}