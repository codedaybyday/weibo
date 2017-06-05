var path = require('path'),
	crypto = require('crypto'),
	newEjs = require('../common/newEjs'),
	db = require('../common/db'),
	postData = require('../common/postData');
	//reqCookies = require('../common/reqCookies');

module.exports = function(req,res,next){
	if(req.method == 'POST'){
		var extname = path.extname(req.url);
		var basename = path.basename(req.url,extname);
		console.log(basename+2132);
		switch(basename){
			case '':
				postData(req,res);
			break;
			case 'index':
				index(res);
				break;
			case 'login':
				login(req,res);
				break;
			case 'reg':
				reg(req,res);
				break;
			default:
				next();
		}
	}else{
		next();
	}
}
function index(res){

}
/**
 * [login 处理登录表单]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function login(req,res){
	var data = req.bodys;
	if(data){
		var md5 = crypto.createHash('md5');
		md5.update(data.password);
		var password = md5.digest('hex');

		var user = db.findOne('users',{'user':data.user,'password':password},function(err,result){
			if(err){
				throw err;
			}
			if(result.length){
				newEjs(req,res,'index',{
					'filename':'./views/index.html',
					'title':'首页'
				},function(html){
					var obj =  {
						'user':result[0].user,
						'email':result[0].email
					};
					success(res,html,obj);
				})
			}
			
			//console.log();
		});
	}
}
function success(res,html,obj){
	var sessionId = random(20);
	global.session = {};
	global.session[sessionId] = obj;
	//console.log(global.session);
	res.writeHead(302,{
		'Set-Cookie':['sessionId='+sessionId+';Max-Age=3600;HttpOnly=true'],
		'Content-Type':'text/html',
		'Location':'/index.html'
	});
	//res.writeHead(200,{'Contetn-Type':'text/html'});
	res.end(html);
}
/**
 * [random 产生唯一的session序列号]
 * @param  {[type]} len [description]
 * @return {[type]}     [description]
 */
function random(len){
	var factor = 'qwertyuiopasdfghjklzxcvbnm/1234567890QWERTYUIOPASDFGHJKLZXCVBNM?';
	var str = '';
	for(var i=0;i<len;i++){
		var index = Math.floor(Math.random()*factor.length);
		str += factor.charAt(index);
	}
	if(global.session){
		if(global.session[str]){
			random(len);
		}else{
			return str;
		}
	}else{
		return str;
	}

}
function reg(req,res){
	var data = req.bodys;
	if(data){
		var md5 = crypto.createHash('md5');
		md5.update(data.password);
		var password = md5.digest('hex');

		var obj = {
			'user':data.user,
			'password':password,
			'email':data.email
		}
		if(data.password !== data.password_repeat){
			newEjs(res,'reg',{
				'filename':'./views/reg.html',
				'title':'注册',
				'prompt':'两次密码不正确!'
			},function(html){
				res.writeHead(200,{'Contetn-Type':'text/html'});
				res.end(html);
			})
		}
		if(data.user == ''){
			newEjs(res,'reg',{
				'filename':'./views/reg.html',
				'title':'注册',
				'prompt':'用户名不能为空!'
			},function(html){
				res.writeHead(200,{'Contetn-Type':'text/html'});
				res.end(html);
			})
		}
		db.insert('users',obj,function(err,result){
			if(err){
				if(err.code == '11000'){
					newEjs(res,'reg',{
						'filename':'./views/reg.html',
						'title':'注册',
						'prompt':'用户名重复!'
					},function(html){
						res.writeHead(200,{'Contetn-Type':'text/html'});
						res.end(html);
					});
				}else{
					throw err;
				}
			}
			newEjs(req,res,'login',{
				'filename':'./views/login.html',
				'title':'登录'
			},function(html){
				res.writeHead(302,{'Location':'./login.html'});
				res.end(html);
			});
		});
	}
}