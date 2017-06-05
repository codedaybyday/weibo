
module.exports = function(req,res,next){
	if(req.cookies){
		var sessionId = req.cookies['sessionId'];

		if(global.session){
			if(global.session[sessionId]){
				req.user = global.session[sessionId]
			}else{
				req.user = undefined;
			}
		}else{
			req.user = undefined;
		}
	}
	next();
}