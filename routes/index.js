/*
 * GET home page.
 */

var mongoose = require('mongoose'),
	errors = require('./errors.js');


module.exports = function(app, isDev){
	
	var Page = mongoose.model('Page');
	
	app.get('/', function(req, res, next) {

		Page.findOne({_id: 'mtanevski-portfolio-webapp'}, function(err, page){
			if(err) next(err);

			if(page){
				res.charset = 'utf-8';
				page.isDev = isDev;
				
				res.render('index', page);
			}else{
				next(new Error('Page not found in database'));
			}
		});
	});
	
	errors(app);

};
