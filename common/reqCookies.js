var querystring = require('querystring');

module.exports = function(req,res,next){
	var cookie = querystring.parse(req.headers.cookie);
	req.cookies = cookie;
	next();
}