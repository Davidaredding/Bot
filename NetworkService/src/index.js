const SocketListener 	= require('./socketServer');
const WebServer 		= require('./webServer');
const Director			= require('./networkService');

console.log('\033c');
console.log("Starting Director...".bold.black.bgWhite);
const _webServer = new WebServer();
const _socketServer = new SocketListener();

const _director = new Director(_webServer,_socketServer);
_director.start();
