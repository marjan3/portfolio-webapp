// Page model
var mongoose = require('mongoose');
 
var pageSchema = new Schema({
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
    published: {Date, default: Date.Now},
    author: String,
    authorUrl: String,
    aboutAuthor: String
});
 
mongoose.model('Page', pageSchema);