var express = require('express');
var querystring = require('querystring');
var comments = require('./comments.js');
var bodyParser = require('body-parser');
var template = require('fs').readFileSync('./templates/guestBook.html', 'utf8');

var app = express();

app.use(express.static('./public'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/guestBook',function(req,res){
	res.send(template.replace(/__COMMENTS_TABLE__/, comments.generateTable()));
});

app.post('/comment',urlencodedParser,function(req,res){
	var entry = req.body;
	req.entry = entry;
	comments.add(req,res);
});

app.get('/',function(req,res){
	res.redirect('/index.html');
});

app.get('/ghost',function(req,res){
	res.redirect('/guestBook');
});

app.get('/comments',function(req,res){
	comments.getAll(req,res);
});
module.exports=app;