const events = require('events')
const net = require('net');
const colors = require('colors');

const ON_NEW_STATUS_CONNECTION = "NEW_STATUS_CONNECTION";
const ON_STATUS_OFFLINE = "ONSTATUSOFFLINE";
const ON_STATUS_ONLINE = "ONSTATUSONLINE";
const ON_STATUS_ERROR = "ONSTATUSERROR";

class SocketListener extends events.EventEmitter{
    constructor(options){
        super();
        this.options = Object.assign({},{
            status_port: 9000,
            comm_port: 9001,
            error_port: 911
        }, options);
        

        this.statusServer = {};
        this.commServer = {};
        this.errorServer = {};
        this._statusServer_listen = this._statusServer_listen.bind(this);
        this._statusServer_onNewConnection = this._statusServer_onNewConnection.bind(this);
        this.emit = this.emit.bind(this);
    }

    start(){
        return new Promise((resolve,reject)=>{
            console.log("Initializing status server...".cyan);
            this.statusServer = net.createServer();
            this.statusServer.listen(this.options.status_port,this._statusServer_listen);
            resolve();
        })
    }

    _statusServer_listen(){
        console.log(`Status Server Connected ${JSON.stringify(this.statusServer.address())}`.black.bgCyan);
        this.emit(ON_STATUS_ONLINE)
        this.statusServer.on('connection', this._statusServer_onNewConnection)
        this.statusServer.on('close', this._statusServer_onClose);
        this.statusServer.on('error', ()=>{console.log('Error'.bgRed.Bold.Underline)})
    }
    
    _statusServer_onNewConnection(connection){
        console.log(`.....New serial connection...`.grey.bold)
        this.emit(ON_NEW_STATUS_CONNECTION,connection);
    }

    _statusServer_onClose(){
        console.log('Status Server Offline...'.yellow.bold.bgRed);
        this.emit(ON_STATUS_OFFLINE)
    }
    _statusServer_onError(error){
        console.log('Status server error'.red.bold);
        this.emit(ON_STATUS_ERROR);
    }
}
module.exports = SocketListener;