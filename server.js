var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');
// var ParseServer = require('parse-server').ParseServer;

//Sets up the the express app
var app = express();

//Where all of the post information is being pushed to
//setting up the port that the server will be listening on
var PORT = process.env.PORT || 3000;

//Sets up the express app to handle parsing
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
	limit: '50mb',
	extended: true, 
	parameterLimit:50000}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//lets the server recognize the js files
app.use(express.static('public'));



//displaying data from the home.html file
app.get('/', function(req,res){
	res.sendfile(path.join(__dirname, 'public/index.html'));
});



//starts the server with the listening queue
app.listen(PORT, function(){
	console.log("Listening on port", PORT);
});