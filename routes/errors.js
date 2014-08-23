/*
 * Error handling
 */

module.exports = function(app){

	// 404's
	app.use(function(req, res, next){
		res.status(404);
		
		if(req.accepts('html')){
			return res.send("<h2>I'm sorry, I couldn't find that page.</h2>");
		}
		
		if(req.accepts('json')){
			return res.json({ error: 'Not found' });
		}
		
		//default response type
		res.type('txt');
		res.send("Hmmm, couldn't find that page.");
		
	});
	
	app.use(function(err, req, res, next){
		res.send(500, "Error occured on server.");
	});
};
