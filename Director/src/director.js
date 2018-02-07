const Robot = require('./robot');
const utilities = require('./utilities');

const robot_status ={
    offline: 0,
    registered: 1,
    online : 2
}

class Director{
    constructor(webServer, socketServer){
        this.robots = [];
        this.players = [];
        this._webServer = webServer;
        this._socketServer = socketServer;

        this.start = this.start.bind(this);
        this._newRobotConnection = this._newRobotConnection.bind(this);
        this._robotDataReceived = this._robotDataReceived.bind(this);
        this._wireSocketServerEvents = this._wireSocketServerEvents.bind(this);
        this._robotNewEndpoints = this._robotNewEndpoints.bind(this);
    }

    start()
    {
       this._wireSocketServerEvents();
       this._wireWebServerEvents();

        this._webServer.start();
        this._socketServer.start();
    }

    _wireSocketServerEvents(){
        this._socketServer.on(this._socketServer.events.SOCKET_ON_NEW_STATUS_CONNECTION,this._newRobotConnection);
        this._socketServer.on(this._socketServer.events.SOCKET_ON_REGISTRATION, this._newRobotRegistration);
    }

    _wireWebServerEvents(){
        
    }

    //#region SOCKET Event Hanlders


    _robotNewEndpoints(robot){
        return {
            status:
                this._webServer.createWSEndpoint(`/robots/${robot.status.name}`, 
                (ws,req)=>{
                    console.log(`\t{Address: ${req.connection.remoteAddress}} is listenting to ${robot.status.name}`.yellow.bold);
                    robot.director.status_ws = ws; //todo, need to push to all subsrcribers; this will only push to the last subscribed websocket
                }),
            command:
                this._webServer.createWSEndpoint(`/robots/${robot.status.name}/command`,
                (ws,req)=>{
                    console.log(`\t ${req.connection.remoteAddress} is connected to ${robot.status.name}'s command`.yellow.bold);
                    ws.on('message',msg=>{this._robotSendCommand(ws,msg,robot,msg);});
                }),
            error:
                this._webServer.createWSEndpoint(`/robots/${robot.status.name}/errors`,
                (ws,req)=>{
                    console.log(`\t ${req.connection.remoteAddress} is connected to ${robot.status.name}'s errors`.yellow.bold);
                }),
        }
    }

    _newRobotRegistration(connection){
        connection.on('data',(data)=>{this._newRobotRegistration(data,connection)});
    }

    _newRobotRegistration(data){
        //Decode Data
        let bot_reg = JSON.stringify(data);
        //Check if robot with registration details already exists
        if(robots.some(r=>r.mac==bot_reg.mac)){
            //  if so: reregister (todo)->;
        }
        //  if not: Create new robot, add to collection, set status as registered
        var botSettings = 
            Object.assign({},{
                director:{
                    status:0,
                    endpoints:{}
                }
            })
        
        let bot = new Robot(botSettings);
        bot.director = {
            status: robot_status.registered,
            endpoints: _robotNewEndpoints(bot)
        }
        
    }

    _newRobotConnection(connection){
        console.log(`.....New status connection...`.grey.bold);
        let bot = new Robot();
        
        connection.on('data',(data)=>{this._robotDataReceived(data,bot)});
        this.robots.push(bot);
    };

    _robotDataReceived(data,robot){
        robot.updateSettings(JSON.parse(data.toString('utf8')));
        if(!robot.director.endpoints)
            this._robotNewEndpoints(robot);
        if(robot.director.endpoints.status)
            robot.director.status_ws.send(JSON.stringify(robot.status));
    }

    _robotSendCommand(ws,msg,robot,command){
        console.log(
            `${robot.status.name} received command ${msg}`);
                setTimeout(() => {
                    console.log(`${robot.status.name} response to command ${msg} is 5`);    
                    ws.send(`{[${msg}]:5}`);
                }, 3000);
    }
    //#endregion

}

module.exports = Director;