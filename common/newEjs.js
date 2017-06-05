/**
 * Created by liubeijing on 2016/4/18.
 */
var fs = require('fs'),
    ejs = require('ejs'),
    process = require('process');
/*fs.readFile('./views/index.html','utf8',function(err,data){
    if(err) throw err;
    var html = ejs.render(data,{
        'filename':'./views/index.html',
        'title':'首页',
        'names':['lily','mike','kangkang']
    });
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
});*/
/**
 * [html 渲染模板]
 * @param  {[type]}   res      [description]
 * @param  {[type]}   filename [description]
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function html(req,res,filename,data,callback){
    var path = process.cwd()+'/views/'+filename+'.html';
    if(data['prompt'] == undefined){
        data['prompt'] = '';
    }
    if(req.user == undefined){
        data['user'] = null;
    }/*else{
        data['user'] = req.user;
    }*/
    //console.log(req.user)
    //console.log(data);
    fs.readFile(path,'utf8',function(err,html){
        if(err) throw err;
        html = ejs.render(html,data);
        callback(html);
    });
}
module.exports = html;