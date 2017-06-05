var mongodb = require('mongodb')
	host = '127.0.0.1',
	port = 27017;

var server = new mongodb.Server(host,port,{auto_reconnect:true});
var db = new mongodb.Db('weibo',server,{safe:true});

exports.insert = function(coll,data,callback){
	db.open(function(err,db){
		if(err){
			callback(err);
			return;
		}
		db.collection(coll,function(err,coll){
			if(err){
				callback(err);
				return;
			}
			coll.insert(data,{safe:true},callback);
		});
	});
}
exports.findOne = function(coll,where,callback){
	db.open(function(err,db){
		if(err){
			callback(err);
			return;
		}
		db.collection(coll,function(err,coll){
			if(err){
				callback(err);
				return;
			}
			coll.find(where).toArray(callback);
		})
	})
}
exports.find = function(coll,where,callback){
	db.open(function(err,db){
		if(err){
			callback(err);
			return;
		}
		db.collection(coll,function(err,coll){
			if(err){
				callback(err);
				return;
			}
			coll.find(where.where).sort(where.sort).toArray(callback);
		});
	});
}