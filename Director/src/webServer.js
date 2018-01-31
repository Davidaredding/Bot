const app = require('express')();
const ws = require('express-ws')(app);
const bodyParser = require('body-parser');
const cors = require('cors')

webserver = function(port = 8080, connCallback){
    var clients = [];
    var counter = 0;

    app.ws('/echo', (ws,req)=>{
        ws.id = ++counter;
        clients.push(ws);
    
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(cors({origin: 'http://localhost:3000', credentials: true}));

        ws.on('close',(msg)=>{
            console.log(`Client ${ws.id} disconnected.`)
        });
        
        ws.on('message', (msg)=>{
            msg = `${ws.id}: ${msg}`
            clients.forEach((client)=>{
                if(client.readyState==1)
                    client.send(msg);
            });
            console.log(`Broadcasting ${msg} from ${ws.id}`);
        });
    });

    var listener = app.listen(port,
        ()=>{
            connCallback?
                connCallback(listener):
                console.log(`Director Web now listening on ${port}`)
            }
    );
    return app;
}

module.exports.WebServer =  webserver;