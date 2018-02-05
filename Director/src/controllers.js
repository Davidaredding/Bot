//these are default endpoints avilable 
function Controllers(WebServer){
    let app = WebServer.app;

    app.ws('/echo',
        (ws,req)=>{ws.send(ws.data);});
    
    app.get('/', (req,res)=>{
        res.send('Director');
    });

    app.get('/Endpoints', (req,res)=>{
        res.send(JSON.stringify(app._router.stack));
    });


};

module.exports = Controllers;