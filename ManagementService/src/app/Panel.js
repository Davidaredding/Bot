import React, { Component } from 'react';
import '../css/panel.css';


export default class Panel extends Component{
    
    constructor(props){
        super(props);
        this.state=Object.assign({
            title: "Panel",
            preTitle: "Panel",
            header: true,
            className: ""
        },props);
    }
    
    
    render(){
        let header = null;
        if(this.state.header)
            header = (<header>
                        <h2> {this.state.preTitle}</h2>
                        <h1>{this.state.title}</h1>
                    </header>);
        return(
            <div className={`panel ${this.state.className}`} style={this.state.style} >
                    {header}
                    {this.state.children}
                
                
            </div>
        );
    }
}