/**
 * Created by liubeijing on 2016/4/19.
 */
var url = require('url'),
	querystring = require('querystring');

module.exports = function(req,res,next){
	var content_type = req.headers['content-type'];
	//console.log(content_type);
    if(req.method == 'GET'){
        req.bodys = url.parse(req.url,true).query;
        next();
        //console.log(req.bodys);
    }else if(req.method == 'POST' && content_type == 'application/x-www-form-urlencoded'){
    	var data = '';
    	req.on('data',function(chunk){
    		data += chunk;
    	});
    	req.on('end',function(){
    		//console.log(data);
    		req.bodys = querystring.parse(data,null,null);
    		//console.log(req.bodys);
    		next();
    	})
    	
    }else{
    	next();
    }
}