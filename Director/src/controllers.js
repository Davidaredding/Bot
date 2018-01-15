function Robot(robotConfig){
	this.Name = robotConfig.Name;
	this.Command_Queue = robotConfig.Commands;
	this.Status_Queue = robotConfig.Status;
	this.Exception_Queue = robotConfig.Exception_Queue;

	this.Config = robotConfig;
}



export default (app)=>{
	app.get('/', (req,res)=>{

	});

	app.post('/Register',(req,res)=>{
		console.dir(req.body);
		res.sendStatus(200);
	});
};