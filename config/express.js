var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var rClient = require('redis').createClient();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);



module.exports = function(){
	

	app.use(express.static(path.join(__dirname, '../client')));
	app.use(bodyParser.json());
	app.use(logErrors);
	app.use(clientErrorHandler);
	app.use(errorHandler);

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	function logErrors(err, req, res, next) {
	  console.error(err.stack);
	  next(err);
	}

	function clientErrorHandler(err, req, res, next) {
	  if (req.xhr) {
	    res.status(500).send({ error: 'Something failed!' });
	  } else {
	    next(err);
	  }
	}

	function errorHandler(err, req, res, next) {
	  res.status(500);
	  res.render('error', { error: err });
	}
	
	require('../server/routes/api.server.routes')(app);
	var events = require('../server/sockets/events');
	
	app.use(session({ 
	    store: new RedisStore({ 
	        client: rClient
	    }),
	    secret: "dsf", 
	    saveUninitialized: true,
	    resave: false 
	}));

	rClient.on("error",function(err){
		console.log("error",err);
	})
	events.getEvents(io,rClient);
	module.exports = app;

	return http;	
}
