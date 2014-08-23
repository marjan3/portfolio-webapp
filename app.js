/**
 * Module dependencies.
 */
var express = require('express'),
	routes = require('./routes'),
  mongoose = require('mongoose');

// Environment variables configuration
var isDev = process.env.NODE_MODE && process.env.NODE_MODE.toLowerCase() === 'dev' ? true : false;
var port = process.env.PORT || 3000;
var mongoHq = {
		user: process.env.MONGOHQ_USER,
		pass: process.env.MONGOHQ_PASS,
		host: process.env.MONGOHQ_HOST,
		port: process.env.MONGOHQ_PORT,
		name: process.env.MONGOHQ_NAME,
}

// Create server
var app = module.exports = express.createServer();

//Page model
var pageSchema = new mongoose.Schema({
	_id: String,
	title: String,
	titles: [String],
	projects:[{
	    title : String,
	    imgUrl : String,
	    htmlDesc: String,
	    client: String,
	    clientUrl: String,
	    date: Date,
	    service: String
	     }],
	aboutCol1: String,
	aboutCol2: String,
	htmlLocation: String,
	skypeUrl: String,
	linkedInUrl: String,
	gPlusUrl: String,
	twitterUrl: String,
	githubUrl: String,
    published: {type: Date},
    author: String,
    authorUrl: String,
    aboutAuthor: String,
    copyright: String
});
 
mongoose.model('Page', pageSchema);

mongoose.connect('mongodb://' + mongoHq.user + ':' + mongoHq.pass + '@' + mongoHq.host + ':' + mongoHq.port + '/' + mongoHq.name, function(err){
	if(err) throw err;
	
	if(isDev) console.log('connected to mongoose!');

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
	
	routes(app);

	app.listen(port);

	if(isDev){
		console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
	}
	
	//mongoose.disconnect();
	
	if(isDev){
		console.log("mongoose disconnected!");
	}
})


