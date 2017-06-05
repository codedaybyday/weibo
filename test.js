/**
 * Created by liubeijing on 2016/4/18.
 */
var process = require('process');
/*var express = require('express');
var url = require('url');
var path = require('path');
var fs = require('fs');*/
app = express();
app.listen(8080);
app.use(function(req,res){
	//console.log(new Date().toLocaleString);
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end();
	console.log('响应结束，其实程序并没有结束');
});