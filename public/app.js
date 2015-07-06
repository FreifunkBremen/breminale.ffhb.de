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
.filter('hashtagFilter',function() {
	return function(input, filter,exactCase) {
		exactCase = exactCase||false;
		var result = [];
		console.log(filter);
		if(!filter || (filter == '!undefined')){
			return input;
		}
		if(typeof filter === 'string'){
			filter = [filter,'un'+filter]
		}
		for (var i=0; i<input.length; i++) {
			if(input[i].hashtags){
				for (var j=0; j<input[i].hashtags.length; j++) {
					for (var z=0; z<filter.length; z++) {
						if ((!exactCase && (input[i].hashtags[j].toLowerCase() == filter[z].toLowerCase())) || (exactCase && (input[i].hashtags[j] == filter[z]))) {
							result.push(input[i]);
						}
					}
				}
			}
		}
		return result;
	};
})
.controller('MainCtrl',['$scope','$http','$filter',function($scope,$http,$filter) {
	$scope._filter = 'Wetter';
	$scope._days = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
	$scope.feed = [];
	$scope.alert = {exists:false,msg:{},unwetter:false};
	$scope.state = {lastUpdate:'',Iterator:'0'};
	$scope.dimmer = true;

	$scope.refresh = function(fn){
		$scope.dimmer = true;
		$http.get('data.php').success(function(r){
			$scope.feed = $filter('orderBy')(r.feed, 'created_time',true);
			$scope.state.lastUpdate = r.lastUpdate;
			$scope.state.Iterator = r.Iterator;
			var tmp = $filter('hashtagFilter')($scope.feed, ['wetter','unwetter'],false);
			if(tmp.length>0){
				$scope.alert.msg = tmp[0];
				if($scope.alert.msg.created_time>=r.today){
					$scope.alert.exists = true;
					$scope.alert.unwetter = ($filter('filter')([$scope.alert.msg], {hashtags:'unwetter'}).length > 0);
				}else{
					$scope.alert.exists = false;
					$scope.alert.msg = {};
					$scope.alert.unwetter = false;
				}
			}else{
				$scope.alert.exists = false;
				$scope.alert.msg = {};
				$scope.alert.unwetter = false;
			}
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
