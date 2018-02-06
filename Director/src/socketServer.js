const events = require('events')
const net = require('net');
const colors = require('colors');
const utilities = require('./utilities');



class SocketListener extends events.EventEmitter{
    constructor(options){
        super();
        this.options = Object.assign({},{
            status_port: 9000,
            comm_port: 9001,
            error_port: 911
        }, options);
        
        this.events={
            SOCKET_ON_NEW_STATUS_CONNECTION  : "SOCKET_ON_NEW_STATUS_CONNECTION",
            SOCKET_ON_STATUS_OFFLINE         : "SOCKET_ON_STATUS_OFFLINE",
            SOCKET_ON_STATUS_O               : "SOCKET_ON_STATUS_ONLINE",
            SOCKET_ON_STATUS_ERROR           : "SOCKET_ON_STATUS_ERROR"
        }


        this.statusServer = {};
        this.commServer = {};
        this.errorServer = {};
        this._statusServer_listen = this._statusServer_listen.bind(this);
        this._statusServer_onNewConnection = this._statusServer_onNewConnection.bind(this);
        
        this._comServer_listen = this._comServer_listen.bind(this);
        this._comServer_onNewConnection = this._comServer_onNewConnection.bind(this);
        this.emit = this.emit.bind(this);
     
    }

    start(){
        return new Promise((resolve,reject)=>{
            console.log("Initializing status server...".cyan);
            this.statusServer = net.createServer(this._statusServer_onNewConnection);
            this.statusServer.listen(this.options.status_port,this._statusServer_listen);

            this.comServer = net.createServer(this._comServer_onNewConnection);
            this.comServer.listen(this.options.comm_port,this._comServer_listen);
            resolve();
        })
    }
    //#region Status Server
    _statusServer_listen(){
        console.log(`\tStatus Server Online ${JSON.stringify(this.statusServer.address())}`.cyan.bold);
        this.emit(this.events.SOCKET_ON_STATUS_ONLINE)
        this.statusServer.on('close', this._statusServer_onClose);
        this.statusServer.on('error', ()=>{console.log('Error'.bgRed.Bold.Underline)})
    }
    
    _statusServer_onNewConnection(connection){
        this.emit(this.events.SOCKET_ON_NEW_STATUS_CONNECTION,connection);
    }

    _statusServer_onClose(){
        console.log('Status Server Offline...'.yellow.bold.bgRed);
        this.emit(uthis.events.SOCKET__ON_STATUS_OFFLINE)
    }
    _statusServer_onError(error){
        console.log('Status server error'.red.bold);
        this.emit(uthis.events.SOCKET__ON_STATUS_ERROR);
    }
    //#endregion

    //#region Com Server
    _comServer_onNewConnection(connection){
        console.log("Com Server Connected");
    }

    _comServer_listen(){
        console.log(`\tCom Server Online ${JSON.stringify(this.comServer.address())}`.cyan.bold);
    }
}
module.exports = SocketListener;