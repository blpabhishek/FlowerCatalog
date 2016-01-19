var pg = require('pg');
var con ={
			host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
			user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
			password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
			port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
			database : 'flower_catalog',
};		
var conString = 'postgres://'+con.user+':'+con.password+'@'+con.host+':'+con.port+'/'+con.database;

if(!con.user)
	conString = "postgres://postgres:ankur@localhost/flower_catalog";

var comments =[];

exports.add = function(req,res){
	var entry = req.entry;
	var values = ['\''+entry.name+'\'','\''+entry.comment+'\'','NOW()'].join(',');
	var query = 'insert into commentlog (name,comment,stamp) values('+values+');';
	pg.connect(conString,function(err,client,done) {
	  if(err)
	    return console.error('Could not connect to database', err);
	client.query(query, function(err, result) {
	    if(err)
	      return console.error('Error in running query', err);
	exports.getAll(req,res);
	  });
	});
};

var toRow = function(entry){
	console.log(entry);
	entry.stamp = (new Date(entry.stamp)).toDateString();
	return ['<tr>','<td>',entry.stamp,'</td>','<td>',entry.name, '</td>','<td>', entry.comment, '</td>','</tr>'].join(' ');
};

exports.generateTable = function(){
	return '<table><tr><th>Time</th><th>Name</th><th>Comment</th></tr>' + comments.map(toRow).join(' ') + '</table>';
};

exports.getAll = function(req,res){
	var comment=[];
	pg.connect(conString,function(err,client,done){
	if(err)
	   return console.error('Could not connect to database', err);
	var query =client.query('select name,comment,stamp from commentlog order by commentid DESC;');
	done(); 
	query.on('row',function(row){
		comment.push(row);
	});
	query.on('end',function(){
		client.end();
		comments = comment;
		res.send(JSON.stringify(comment));
	});
});
};




