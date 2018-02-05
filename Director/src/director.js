const robot = require('./robot');
const utilities = require('./utilities');

class Director{
    constructor(webServer, socketServer){
        this.robots = [];
        this.players = [];
        this._webServer = webServer;
        this._socketServer = socketServer;

        this.start = this.start.bind(this);
        this._newSerialConnection = this._newSerialConnection.bind(this);
        this._robotDataReceived = this._robotDataReceived.bind(this);
        this._wireSocketServerEvents = this._wireSocketServerEvents.bind(this);
    }

    start()
    {
      // this._wireSocketServerEvents();
       this._wireWebServerEvents();

        this._webServer.start();
        this._socketServer.start();
    }

    _wireSocketServerEvents(){
        this._socketServer.on(utilities.NEW_STATUS_CONNECTION,this._newSerialConnection);
    }

    _wireWebServerEvents(){

    }

    //#region SOCKET Event Hanlders
    _newSerialConnection(connection){
        let bot = new Robot();
        connection.on('data',(data)=>{this._robotDataReceived(data,bot)});
        Robots.push(bot);
    };

    _robotDataReceived(data,robot){
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

    //#endregion

}

module.exports = Director;