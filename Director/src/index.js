const SocketListener 	= require('./socketServer');
const WebServer = require('./webServer');
const robot 	= require('./Robot');

const webPort = 8080;
const statusPort = 9000;


console.log('\033c');
const _webServer = new WebServer();
console.log("Starting Webserver...".bold.yellow.underline);
_webServer.start().then(()=>{
	_echoWs = _webServer.createWSEndpoint("/echo",(ws,req)=>{
		ws.on('close', ()=>{console.log(`Client ${ws.id} disconnected;`.bgYellow.black)});
		ws.on('message', ()=>{console.log(`Client ${ws.id} message;`)});
		ws.on('error', ()=>{console.log(`Client ${ws.id} error!`.bgRed.yellow)});
		ws.on('open', ()=>{console.log(`Client ${ws.id} Connected!!`.bgWhite.black)});
	});
});

const _socketServer = new SocketListener();
console.log("Starting Socket Listeners...".bold.underline.cyan)
_socketServer.start();


// app.ws('/robot/status', (ws,req)=>{
	// 	statusClients.push(ws);
	// 	ws.on('close',()=>{
	// 		var i = statusClients.indexOf(ws);
	// 		if(i>-1)
	// 			statusClients = statusClients.splice(i);
	// 		console.log(`Client ${ws.id} disconnected`);
	// 	});
	// });
	
    // var listener = app.listen(webPort,
    //     ()=>{console.log(`Director Web now listening on ${webPort}`)}
    // );






onReceiveStatus = function(msg)
{
	console.log(`Sending status ${msg}`)
	statusClients.forEach((client)=>{
		
		if(client.readyState==1)
			client.send(msg);
	});
}