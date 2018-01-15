var process = require('process');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());

require("./controllers.js").default(app);

var port = 8080

var server = app.listen(port,
	()=> process.stdout.write(`Director now listening on ${port}`)
);