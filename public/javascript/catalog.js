var onWaterJarClicked = function(){
	var jar = document.querySelector('#jar');
	jar.setAttribute('class', 'hidden');
	setTimeout( function(){
		jar.setAttribute('class', null);
	},1000);
}