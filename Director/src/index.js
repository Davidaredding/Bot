import { setInterval } from 'timers';

var process = require('process');
var express = require('express');
var bodyParser = require('body-parser');
var mqtt = require('mqtt');



var app = express();
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json());

console.log('connecting to broker...');
var client = mqtt.connect('mqtt://localhost');
app.client = client;
client.on('connect', ()=>console.log('Connected to broker'));

require("./controllers.js").default(app);

var port = 8080

var server = app.listen(port,
	()=>{console.log(`Director now listening on ${port}`)}
);