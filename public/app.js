'use strict';

var a=function(){
	var _feed_filter='';
	var _feed='';
	var days = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

	function show_feed(){
		var innerHTML = '';
		for (var i in _feed.feed){
			var filter_ok = false;
			var item = _feed.feed[i];
			var d = new Date(item.created_time);
			var hour = d.getHours();
			if(hour < 10)
				hour = '0'+hour;
			var min = d.getMinutes();
			if(min < 10)
				min = '0'+min;

			var tmp = '<div class="event">';
			tmp    += '<div class="label"><i class="fa fa-newspaper-o"></i></div>';
			tmp    += '<div class="content">';
			tmp    += '<div class="date">'+days[d.getDay()]+', '+hour+':'+min+'</div>';
			tmp    += '<div class="summary">'+item.message+'</div>';
			tmp    += '<div class="meta">';
			for(var j in item.hashtags){
				tmp    += '<div class="button">'+item.hashtags[j]+'</div>';
				if(!filter_ok)
					filter_ok = (item.hashtags[j]==_feed_filter);
			}
			tmp    += '</div>';
			tmp    += '</div>';
			tmp    += '</div>';
			if(filter_ok || _feed_filter == '')
				innerHTML +=tmp;	
		}
		document.getElementById('feed').innerHTML = innerHTML;
		document.getElementById('state').innerHTML = '<p>last refresh: '+new Date(_feed.lastUpdate)+'<br/>count of refresh: '+_feed.Iterator+'</p>';
	}

	function refresh(){
		var feed = document.getElementById('feed')
//		feed.innerHTML = '';
		feed.className += ' active';
		var xmlhttp;
		if (window.XMLHttpRequest){
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}else{
			// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				_feed=JSON.parse(xmlhttp.responseText);
				show_feed();
				feed.className = feed.className.replace('active','');
				feed.className = feed.className.replace('  ',' ');
			}
		}
		xmlhttp.open("GET","data.php",true);
		xmlhttp.send();
	}
	document.getElementById('refresh').onclick = refresh;
	refresh();

	var filterE = document.getElementById('filter');
	for(var i = 0; i < filterE.childNodes.length; i++){
		filterE.childNodes[i].onclick = function(){
			var feed = document.getElementById('feed')
//			feed.innerHTML = '';
			feed.className += ' active';
			_feed_filter = this.getAttribute('name');
			show_feed();
			feed.className = feed.className.replace('active','');
			feed.className = feed.className.replace('  ',' ');
		}
	
	}
}();
