/**
 * Created by liubeijing on 2016/4/18.
 */
var fs = require('fs'),
    process = require('process'),
    path = require('path');
function public(req,res,next){
    if(req.url.indexOf('/public/') != -1){
        var file_path = decodeURI(process.cwd()+req.url);
        fs.exists(file_path,function(exists){
            console.log(exists,file_path);
            if(!exists){
                res.writeHead(404,{'Content-Type':'text/plain'});
                res.end();
            }else{
                fs.readFile(file_path,'base64',function(err,data){
                    if(err) next();
                    //console.log(path);
                    var type = path.extname(file_path);
                    //console.log(type);
                    res.writeHead(200,{'Content-Type':types[type]});
                    res.end(data,'base64');
                });
            }
        });
    }else{
        next();
    }
}
module.exports = public;
var types = {
    ".css": "text/css",
    ".gif": "image/gif",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".swf": "application/x-shockwave-flash",
    ".tiff": "image/tiff",
    ".txt": "text/plain",
    ".wav": "audio/x-wav",
    ".wma": "audio/x-ms-wma",
    ".wmv": "video/x-ms-wmv",
    ".xml": "text/xml"
};