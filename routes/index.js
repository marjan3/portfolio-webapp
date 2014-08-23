/*
 * GET home page.
 */

var nodemailer = require("nodemailer"),
	mongoose = require('mongoose'),
	errors = require('./errors.js');


module.exports = function(app){
	
	var mail = nodemailer.mail,
		Page = mongoose.model('Page');
	
	app.get('/', function(req, res, next) {

		Page.findOne({_id: 'mtanevski-portfolio-webapp'}, function(err, page){
			if(err) next(err);

			if(page){
				res.charset = 'utf-8';
				page.isDev = process.env.NODE_MODE && process.env.NODE_MODE.toLowerCase() === 'dev' ? true : false;
				
				res.render('index', page);
			}else{
				next(new Error('Page not found in database'));
			}
		});
	});
	
	app.post('/email', function(req, res){
		
		var userName = req.body.name, 
			userEmail = req.body.email,
			userMessage = req.body.message;
		
		var emailPass = process.env.EMAIL_PASS || null;
		var toEmail = process.env.EMAIL_ADDR || null;
		
		if(userEmail){

			// create reusable transport method (opens pool of SMTP connections)
			var smtpTransport = nodemailer.createTransport("SMTP",{
			    //service: "Gmail", // don't need when using @gmail.com
			    auth: {
			        user: toEmail,
			        pass: emailPass
			    }
			});

			// setup e-mail data with unicode symbols
			var mailOptions = {
			    from: userName + " <"+ userEmail + ">", // sender address
			    to: toEmail, // list of receivers
			    subject: userName + " says hello from mTanevski!", // Subject line
			    text: userMessage + " ", // plaintext body
			    html: "<b>" + userMessage + " </b>" // html body
			}

			// send mail with defined transport object
			smtpTransport.sendMail(mailOptions, function(error, response){
			    if(error){
			        console.log(error);
			    	res.json({ emailSent: "false" });
			    }else{
			        console.log("Message sent: " + response.message);
			    	res.json({ emailSent: "true" });
			    }
			    
			    smtpTransport.close(); // shut down the connection pool, no more messages
			});
			
		}
	});
	

	errors(app);

};
