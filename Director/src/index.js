import { setInterval } from 'timers';
const app = require('express')();
const ws = require('express-ws')(app);
const bodyParser = require('body-parser');
const controllers = require("./controllers.js").default(app);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/', (req,res)=>{
	console.dir(req.body);
	res.end();
});

var clients = [];
var counter = 0;
app.ws('/echo', (ws,req)=>{
	ws.id = ++counter;
	clients.push(ws);

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



var port = 8080;

app.listen(port,
	()=>{console.log(`Director now listening on ${port}`)}
);