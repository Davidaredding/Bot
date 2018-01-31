const net = require('net');
const app = require('express')();
const ws = require('express-ws')(app);
const bodyParser = require('body-parser');
const cors = require('cors')
const webPort = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

    var clients = [];
    var counter = 0;

    app.ws('/echo', (ws,req)=>{
        ws.id = ++counter;
        clients.push(ws);
        ws.on('close',(msg)=>{console.log(`Client ${ws.id} disconnected.`)});
        ws.on('message', (msg)=>{
            msg = `${ws.id}: ${msg}`
            clients.forEach((client)=>{
                if(client.readyState==1)
                    client.send(msg);
            });
            console.log(`Broadcasting ${msg} from ${ws.id}`);
        });
	});
	
	var statusClients=[];
	app.ws('/robot/status', (ws,req)=>{
		statusClients.push(ws);
		ws.on('close',()=>{
			var i = statusClients.indexOf(ws);
			if(i>-1)
				statusClients = statusClients.splice(i);
			console.log(`Client ${ws.id} disconnected`);
		});
	});
	
    var listener = app.listen(webPort,
        ()=>{console.log(`Director Web now listening on ${webPort}`)}
    );


var status_server = net.createServer(
	(c)=>{
		console.log(`Status Socket Connected ${JSON.stringify(c.address())}`);
		c.on('data',  onReceiveStatus);
		c.on('close', ()=>{});
		c.on('error', ()=>{});
	})
.listen(9000,()=>{console.log("Director socket, Status on 9000")});



onReceiveStatus = function(msg)
{
	console.log(`Sending status ${msg}`)
	statusClients.forEach((client)=>{
		
		if(client.readyState==1)
			client.send(msg);
	});
}