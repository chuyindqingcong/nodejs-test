var express = require('express');
var path=require('path');
var port=process.env.PORT || 3000;
var mongoose = require('mongoose');
var app =express();
var serverStatic=require('serve-static');
var bodyParser=require('body-parser');
var cookieSession = require('cookie-session');
mongoose.connect('mongodb://localhost/imooc')

app.use(serverStatic('public'));
app.use(cookieSession({
	secret:'imooc',
	esave:false,
	saveUninitialized:true
}))
//app.use(express.static(path.join(__dirname,'public')))
app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser.urlencoded());
app.listen(port);

require('./config/routes')(app)

console.log('port'+port);

