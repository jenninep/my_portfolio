var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');
// var ParseServer = require('parse-server').ParseServer;
var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
var app = express(); //Sets up the the express app

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

app.post('/send', function(req, res, next){
	console.log(req.body);
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'jenninepun@gmail.com',
			pass: 'Gmailpassword'
			}
	});



	var mailOptions = {
	    from: '"Me" <foo@blurdybloop.com>', // sender address
	    to: 'jenninepun@gmail.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'You have a new submission', // plaintext body
	    html: '<p>you have a new submission with the following details..</p><ul><li>Name: ' + req.body.name+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	        res.redirect('/');
	    }
	    console.log('Message sent: ' + info.response);
	    res.redirect('/');
	});
});




//Where all of the post information is being pushed to
//setting up the port that the server will be listening on
var PORT = process.env.PORT || 3000;

//displaying data from the home.html file
app.get('/', function(req,res){
	res.sendfile(path.join(__dirname, 'public/index.html'));
});





//starts the server with the listening queue
app.listen(PORT, function(){
	console.log("Listening on port", PORT);
});