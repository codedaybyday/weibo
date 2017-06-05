var formidable = require('formidable'),
	fs = require('fs'),
	db = require('./db');

module.exports = function(req,res){
	if(!req.user){
		res.writeHead(302,{'Location':'/login.html'});
		res.end();
	}
	var form = formidable.IncomingForm();
	var path = './public/images/'+req.user.user+'/';
	var exists = fs.existsSync(path);
	if(!exists){
		fs.mkdirSync(path);
	}
	form.uploadDir = path;
	form.parse(req,function(err,fields,files){
		var new_path = '';
		if(files.image.name){
			new_path = path + files.image.name;
			fs.renameSync(files.image.path,new_path);
		}
		var obj = {
			'article':fields.article,
			'image':new_path,
			'user':req.user,
			'date':new Date().toLocaleString()
		};
		db.insert('articles',obj,function(err,result){
			if(err) throw err;
			console.log('数据插入成功');
		});
		res.writeHead(302,{'Content-Type':'text/plain','Location':'/index.html'});
		res.end();
	});
}