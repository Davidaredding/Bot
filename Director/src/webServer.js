const app = require('express')();
const ws = require('express-ws')(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const colors= require('colors');
const utilities = require('./utilities');
const Controllers = require('./controllers');

class WebServer {
    constructor()
    {
        this.endpoints = [];
        this.app = app;
        this.connected = false;
        this.clients = [];
        this.start = this.start.bind(this);
        this.CLIENT_ID = 0;
    }

    start(port = 8080, corsAddress = 'http://localhost:3000', onConn)
    {
        this.port = port;
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(cors({origin: corsAddress, credentials: true}));
        
        //Adds all default controllers to the app
        console.log("Initializing web server ...".cyan);
        Controllers(this);
        let listener = new Promise(
            (resolve,reject)=>{ 
            app.listen(this.port,
            ()=>{
                if(onConn)onConn(listener);
                console.log(`Director Web now listening on ${port}`.bgYellow.black.bold);
                this.connected = true;
                resolve(app);
                }
            );
        });
        return listener;
    }

    createWSEndpoint(address, evt)
    {
        console.log(`Adding ws endpoint ${address}`.yellow);
        let endpoint = this.app.ws(address,
            (ws,req)=>{
                 ws.id = this.CLIENT_ID++;
                 this.clients.push(ws);
                 ws.on('close', ()=>this.clients.splice(this.clients.indexOf(ws),1));
                evt(ws,req);
        });
        this.endpoints.push(endpoint);
        return endpoint;
    }
    
}

module.exports =  WebServer;