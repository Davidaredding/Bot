const net = requrie('net');

class SocketServer{
    constructor(){

    }

    start(){

    }

    createSocketListener(port)
    {

    }
}

var status_server = net.createServer(
    (c)=>{
        console.log(`Status Socket Connected ${JSON.stringify(c.address())}`);
        c.on('data',  onReceiveStatus);
        c.on('close', ()=>{});
        c.on('error', ()=>{});
    })
.listen(statusPort,()=>{console.log(`Director now listening for Robot Status on port ${statusPort}`)});