import { setInterval } from 'timers';
const app = require('express')();
const bodyParser = require('body-parser');
const expressWs = require('express-ws');
const controllers = require("./controllers.js")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
controllers.default(app);

const ws = expressWs(app);

app.get('/', (req,res)=>{
	console.dir(req.body);
	res.end();
});

app.ws('/', (ws,req)=>{
	console.log('ws-received');
	ws.on('message',(msg)=>{
		ws.send(msg);
		console.log(msg);
	});
	ws.send(msg);
});


// console.log('connecting to broker...');
// var client = mqtt.connect('mqtt://localhost');
// app.client = client;
// client.on('connect', ()=>console.log('Connected to broker'));

var port = 8080

var server = app.listen(port,
	()=>{console.log(`Director now listening on ${port}`)}
);