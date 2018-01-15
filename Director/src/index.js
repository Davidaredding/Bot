var express = require('express');
var process = require('process');
var app = express();

require("./controllers.js").default(app);

var port = 8080

var server = app.listen(port,
	()=> process.stdout.write(`Director now listening on ${port}`)
);