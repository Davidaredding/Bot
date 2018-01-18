'use strict';

var _timers = require('timers');

var app = require('express')();
var bodyParser = require('body-parser');
var expressWs = require('express-ws');
var controllers = require("./controllers.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
controllers.default(app);

var ws = expressWs(app);

app.get('/', function (req, res) {
	console.dir(req.body);
});

app.ws('/', function (ws, req) {
	console.log('ws-received');
	ws.on('message', function (msg) {
		ws.send(msg);
		console.log(msg);
	});
	ws.send(msg);
});

// console.log('connecting to broker...');
// var client = mqtt.connect('mqtt://localhost');
// app.client = client;
// client.on('connect', ()=>console.log('Connected to broker'));

var port = 8080;

var server = app.listen(port, function () {
	console.log('Director now listening on ' + port);
});