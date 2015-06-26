'use strict';

angular.module('ffhbApp',[])
.filter('parseUrl',['$sce',function($sce) {
	// var replacePattern = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gim;
	var replacePattern = /\b((http:\/\/|https:\/\/|ftp:\/\/|mailto:|news:)|www\.|ftp\.|[^ \,\;\:\!\)\(\""\'\<\>\f\n\r\t\v]+@)([^ \,\;\:\!\)\(\""\'\<\>\f\n\r\t\v]+)\b/gim;

	return function(text, target, otherProp) {
		if(text == undefined || text == ""){
			return "";
		}else{
			return $sce.trustAsHtml(text.replace(replacePattern, function($0,$1) {
				if ((/^www\./i).test($0))
					return '<a href="http://'+$0+'">Link</a>';
				return '<a href="'+$0+'">Link</a>';
			}));
		}
	};
}])
.controller('MainCtrl',['$scope','$http','$filter',function($scope,$http,$filter) {
	$scope._filter = 'unwetter';
	$scope._days = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
	$scope.feed = [];
	$scope.state = {lastUpdate:'',Iterator:'0'};
	$scope.dimmer = true;
	$scope.refresh = function(fn){
		$scope.dimmer = true;
		$http.get('data.php').success(function(r){
			$scope.feed = r.feed;
			$scope.state.lastUpdate = r.lastUpdate;
			$scope.state.Iterator = r.Iterator;
			if(typeof fn == 'function')
				fn();
			$scope.dimmer = false;
		});
	};
	$scope.setFilter = function(args){
			$scope._filter = args;
		};
	$scope.refresh(function(){
		if(($filter('filter')($scope.feed, {hashtags:$scope._filter})).length <= 0)
			$scope._filter = '!undefined';
	});
}]);
/*
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
			tmp    += '<div class="label"><i class="fa fa-facebook"></i></div>';
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
			for(var j = 0; j < filterE.childNodes.length; j++){
				var e = filterE.childNodes[j].className;
				e +='';
				e=e.replace('active','');
				e=e.replace('  ',' ');
				filterE.childNodes[j].className = e;
				console.log(e);
			}
			this.className += ' active';
			feed.className += ' active';
			_feed_filter = this.getAttribute('name');
			show_feed();
			feed.className = feed.className.replace('active','');
			feed.className = feed.className.replace('  ',' ');
		}

	}
}();*/
