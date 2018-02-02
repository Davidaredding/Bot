const app = require('express')();
const ws = require('express-ws')(app);
const bodyParser = require('body-parser');
const cors = require('cors')

class WebServer {
    constructor()
    {
        this.endpoints = [];
        this.app = app;
        this.connected = false;
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
                    console.log(`Director Web now listening on ${port}`);
                    this.connected = true;
                    resolve(app);
                    }
                );
        });
        
        return listener;
    }

    createWSEndpoint(address, evt)
    {
        console.log(`Adding ws endpoint ${address}`);
        let endpoint = this.app.ws(address,evt);

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