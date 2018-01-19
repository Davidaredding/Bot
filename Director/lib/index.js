'use strict';

var _timers = require('timers');

var app = require('express')();
var ws = require('express-ws')(app);
var bodyParser = require('body-parser');
var controllers = require("./controllers.js").default(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	console.dir(req.body);
	res.end();
});

var clients = [];
var counter = 0;
app.ws('/echo', function (ws, req) {
	ws.id = ++counter;
	clients.push(ws);

	ws.on('close', function (msg) {
		console.log('Client ' + ws.id + ' disconnected.');
	});

	ws.on('message', function (msg) {
		msg = ws.id + ': ' + msg;
		clients.forEach(function (client) {
			if (client.readyState == 1) client.send(msg);
		});
		console.log('Broadcasting ' + msg + ' from ' + ws.id);
	});
});

var port = 8080;

app.listen(port, function () {
	console.log('Director now listening on ' + port);
});