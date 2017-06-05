var express = require('express'),
	get = require('./router/get'),
	public = require('./common/public'),
	fs = require('fs'),
	dataBody = require('./common/dataBody'),
	post = require('./router/post'),
	reqCookies = require('./common/reqCookies'),
	session = require('./common/session');

app = express();
app.listen(8080);
app.use(public);
app.use(reqCookies);
app.use(session);
app.use(dataBody);
app.use(post);
app.use(get);