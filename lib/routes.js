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
	comments.add(entry);
	res.send(JSON.stringify(comments.getAll()));
});

app.get('/',function(req,res){
	res.redirect('/index.html');
});

app.get('/ghost',function(req,res){
	res.redirect('/guestBook');
});

app.get('/comments',function(req,res){
	res.end(JSON.stringify(comments.getAll()));
});
module.exports=app;