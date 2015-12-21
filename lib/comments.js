var fs = require('fs');
const DATA_FILE = './data/guestLog.json';
var comments = fs.existsSync(DATA_FILE) && JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || [];


exports.add = function(entry){
	entry.time = new Date().getTime();
	comments.unshift(entry);
	save();
};
var save = function(){
	fs.writeFile(DATA_FILE, JSON.stringify(comments), function(err){});
};
var toRow = function(entry){
	return ['<tr>','<td>',entry.time,'</td>','<td>',entry.name, '</td>','<td>', entry.comment, '</td>','</tr>'].join(' ');
};
exports.generateTable = function(){
	return '<table><tr><th>Time</th><th>Name</th><th>Comment</th></tr>' + comments.map(toRow).join(' ') + '</table>';
};

exports.getAll = function(){
	return comments;
};
