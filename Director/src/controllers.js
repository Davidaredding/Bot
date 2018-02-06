//these are default endpoints avilable 
function Controllers(WebServer){
    let app = WebServer.app;

    app.ws('/echo',
        (ws,req)=>{ws.send(ws.data);});
    
    app.get('/', (req,res)=>{
        res.send('Director');
    });

    app.get('/Endpoints', (req,res)=>{
        res.append('Content-Type', 'application/json');
        res.send(JSON.stringify(app._router.stack.filter(r=>r.route).map(r=>r.route.path)));
    });


};

module.exports = Controllers;