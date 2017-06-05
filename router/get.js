/**
 * Created by liubeijing on 2016/4/18.
 */
var path = require('path'),
    url = require('url'),
    newEjs = require('../common/newEjs'),
    db = require('../common/db');
function get(req,res,next){
    if(req.method == 'GET'){
        //var path_name = url.parse(req.url).pathname;
        var extname = path.extname(req.url);
        var base_name = path.basename(req.url,extname);
        //console.log(req.url);
        switch(base_name){
            case '':
            case 'index':
                index(req,res);
                break;
            case 'login':
                login(req,res);
                break;
            case 'reg':
                reg(req,res);
                break;
            case 'logout':
                logout(req,res);
                break;
            default:
                next();
        }
    }else{
        next();
    } 
}
function logout(req,res){
    if(req.user){
        var sessionId = req.cookies.sessionId;
        delete global.session[sessionId];
        res.writeHead(302,{'Content-Type':'text/html','Location':'index.html'});
        res.end();
    }
    console.log(12312)
    
}
function index(req,res){
    if(req.user){
        db.find('articles',{'sort':{'date':-1},where:{'user':req.user}},function(err,result){
            if(err) throw err;
            console.log(result)
            newEjs(req,res,'index',{
                'filename':'./views/index.html',
                'title':'首页',
                'user':req.user,
                'articles':result
            },function(html){
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(html);
            });
        });
    }else{
        newEjs(req,res,'index',{
            'filename':'./views/index.html',
            'title':'首页',
            'user':req.user
        },function(html){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(html);
        });
    }
    
}
function login(req,res){
    if(req.user){
        res.writeHead(302,{'Content-Type':'text/html','Location':'./index.html'});
        res.end();
    }
    newEjs(req,res,'login',{
        'filename':'./views/login.html',
        'title':'登录',
        'names':['lily','mike','kangkang']
    },function(html){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(html);
    })
}
function reg(req,res){
    //console.log('reg')
    newEjs(req,res,'reg',{
        'filename':'./views/reg.html',
        'title':'注册',
        'names':['lily','mike','kangkang']
    },function(html){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(html);
    })
}
module.exports = get;