const events = require('events');
const Robot = require('./robot');
const SocketListener

class NetworkService{

}

class RobotConnection extends EventEmitter{
    constructor(webServer, socketServer, decoder){
        this.Robot = new Robot();
        this.HeartbeatConnection = {};
        this.StatusConnection = {};
        this.CommandConnection = {};
        this.WSSubscribers = [{}];
        this.StatusSubscribers = [{}];
        this.Decoder = decoder;
        this.webServer = webServer;
        this.socketServer = socketServer;
    }

    onNewStatus(status){

    }

    onCommandReply(reply){

    }

    sendCommand(cmd,callback){

    }

    _statusUpdated(){

    }

    _disconnected(){

    }

    _connected(){

    }

}

class RobotMessageDecoder{
    decode(message){
        return JSON.parse(message);
    }
}

class RobotMessage{
    constructor(data){
        this.MessageType = '';
        this.Data = data;
    }
}

module.exports = Robotconnection;
module.exports = RobotMessageDecoder;