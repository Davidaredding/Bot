const app = require('express')();
const ws = require('express-ws')(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const colors= require('colors');

let CLIENT_ID = 0;
class WebServer {
    constructor()
    {
        this.endpoints = [];
        this.app = app;
        this.connected = false;
        this.clients = [];
        this.start.bind(this);
    }

    start(port = 8080, corsAddress = 'http://localhost:3000', onConn)
    {
        this.port = port;
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(cors({origin: corsAddress, credentials: true}));

        var listener = new Promise(
            (resolve,reject)=>{ app.listen(this.port,
                ()=>{
                    if(onConn)onConn(listener);
                    console.log(`Director Web now listening on ${port}`.bgYellow.black.bold);
                    this.connected = true;
                    resolve(app);
                    }
                );
        });
        let self = this;
        listener.then(()=>{
            self.createWSEndpoint("/echo",(ws,req)=>{
                console.log(`Client ${ws.id} Connected!!`.bgWhite.black);
                ws.on('close', ()=>{console.log(`Client ${ws.id} disconnected;`.bgYellow.black)});
                ws.on('message', (msg)=>{ws.send(msg)});
                ws.on('error', ()=>{console.log(`Client ${ws.id} error!`.bgRed.yellow)});
            });
        })

        return listener;
    }

    createWSEndpoint(address, evt)
    {
        console.log(`Adding ws endpoint ${address}`.yellow);
        let endpoint = this.app.ws(address,
            (ws,req)=>{
                 ws.id = CLIENT_ID++;
                 this.clients.push(ws);
                 ws.on('close', ()=>this.clients.splice(this.clients.indexOf(ws),1));
                evt(ws,req);
        });

        this.endpoints.push(endpoint);
        return endpoint;
    }
    
}

// webserver = function(port = 8080, connCallback){
//     var clients = [];
//     var counter = 0;

//     app.ws('/echo', (ws,req)=>{
//         ws.id = ++counter;
//         clients.push(ws);

//         ws.on('close',(msg)=>{
//             console.log(`Client ${ws.id} disconnected.`)
//         });
        
//         ws.on('message', (msg)=>{
//             msg = `${ws.id}: ${msg}`
//             clients.forEach((client)=>{
//                 if(client.readyState==1)
//                     client.send(msg);
//             });
//             console.log(`Broadcasting ${msg} from ${ws.id}`);
//         });
//     });


// }

module.exports =  WebServer;