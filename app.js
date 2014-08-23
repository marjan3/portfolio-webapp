/**
 * Module dependencies.
 */
var express = require('express'),
  routes = require('./routes'),
  mongoose = require('mongoose');

// Environment variables configuration
var isDev = process.env.NODE_MODE && process.env.MODE.toLowerCase() === 'dev' ? true : false;
var port = process.env.PORT || 3000;
var mongoHq = {
		user: process.env.MONGOHQ_USER,
		pass: process.env.MONGOHQ_PASS,
		host: process.env.MONGOHQ_HOST,
		port: process.env.MONGOHQ_PORT,
		name: process.env.MONGOHQ_NAME,
}

mongoose.connect('mongodb://' + user + ':' + pass + '@' + host + ':' + port + '/' + name, function(err){
	if(err) throw err;
	if(isDev) console.log('connected to mongoose!');

	var app = module.exports = express.createServer();

	// Configuration
	app.configure(function(){
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'ejs');
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(app.router);
	  app.use(express.static(__dirname + '/public'));
	  //app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
	});

	if(isDev){
		app.configure('development', function(){
		  app.use(express.logger('dev'));
		  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
		});
	}else{
		app.configure('production', function(){
		  app.use(express.logger('short'));
		  app.use(express.errorHandler()); 
		});
	}
	
	// Routes
	if(isDev) {
		console.log("Routes: ");
		for(var route in routes){
			console.log(' -' + route);
		}
	}

	routes(app);

	app.listen(port);

	if(isDev){
		console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
	}
	
	mongoose.disconnect();
	
	if(isDev){
		console.log("mongoose disconnected!", app.address().port, app.settings.env);
	}
})


