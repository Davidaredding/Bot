'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function Robot(robotConfig) {
	this.Name = robotConfig.Name;
	this.Command_Queue = robotConfig.Commands;
	this.Status_Queue = robotConfig.Status;
	this.Exception_Queue = robotConfig.Exception_Queue;

	this.Config = robotConfig;
}

exports.default = function (app) {

	app.get('/', function (req, res) {
		console.dir(req.body);
	});

	app.post('/Register', function (req, res) {
		console.dir(req.body);

		app.client.publish('Robots/Bot1', JSON.stringify(req.body));

		res.sendStatus(200);
	});
};