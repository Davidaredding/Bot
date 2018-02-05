const SocketListener 	= require('./socketServer');
const WebServer 		= require('./webServer');
const utilities 			= require('./utilities');
const Director			= require('./director');

const webPort = 8080;
const statusPort = 9000;

const Robots = [];

console.log('\033c');
const _webServer = new WebServer();
const _socketServer = new SocketListener();
const _director = new Director(_webServer,_socketServer);

console.log("Starting Director...".bold.black.bgWhite);
_director.start();


// onReceiveStatus = function(msg)
// {
// 	console.log(`Sending status ${msg}`)
// 	statusClients.forEach((client)=>{
		
// 		if(client.readyState==1)
// 			client.send(msg);
// 	});
// }