var toRow = function(entry){
	var time = new Date(entry.time);
	var represent = [time.toLocaleTimeString(),time.toDateString()].join(' ');
	return ['<tr>','<td>',represent,'</td>','<td>',entry.name, '</td>','<td>', entry.comment, '</td>','</tr>'].join(' ');
};
var generateTable = function(comments){
	return '<table><tr><th>Time</th><th>Name</th><th>Comment</th></tr>' + comments.map(toRow).join(' ') + '</table>';
};
var updateComments = function(){
	$.get('comments',function(data){
		var comments = JSON.parse(data);
	   	$('#comments').html(generateTable(comments));
	});
};
var postComment = function(){
	var name = $('input[name="name"]').val()
	var comment = $('textarea[name="comment"]').val();
	var posting = $.post('comment',{name:name,comment:comment});
	posting.done(function(data){
		var comments = JSON.parse(data);
	   	$('#comments').html(generateTable(comments));
		$('input[name="name"]').val('');
 		$('textarea[name="comment"]').val('');
	});
};

$(window).load(function() {
	updateComments();
	$('input[type="submit"]').click(postComment);
});
