const SocketListener 	= require('./socketServer');
const WebServer = require('./webServer');
const Robot 	= require('./robot');

const webPort = 8080;
const statusPort = 9000;

const Robots = [];

console.log('\033c');
const _webServer = new WebServer();
console.log("Starting Webserver...".bold.yellow.underline);

_webServer.start();

const _socketServer = new SocketListener();
_socketServer.on('MyEvent', (con)=>{
	console.log('Hello'.bgWhite.black);
	newRobotConnected(con);
});

_socketServer.on("NEW_STATUS_CONNECTION",newRobotConnected);

function newRobotConnected(connection)
{
	let bot = new Robot();
	connection.on('data',(data)=>{robotDataReceived(data,bot)});
	Robots.push(bot);
};

function robotDataReceived(data,robot){
	robot.updateSettings(JSON.parse(data.toString('utf8')));
	if(!robot.endpoint)
		robot.endpoint = _webServer.createWSEndpoint(`/robots/${robot.status.name}`, 
		(ws,req)=>{
			console.log(`\tSomeone is listenting to ${robot.status.name}`.cyan.bold);
			robot.ws = ws;
		});
	if(robot.ws)
		robot.ws.send(JSON.stringify(robot.status));
}

console.log("Starting Socket Listeners...".bold.underline.cyan)
_socketServer.start();

onReceiveStatus = function(msg)
{
	console.log(`Sending status ${msg}`)
	statusClients.forEach((client)=>{
		
		if(client.readyState==1)
			client.send(msg);
	});
}