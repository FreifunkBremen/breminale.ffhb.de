'use strict';

var a=function(){
	var _feed_filter='';
	//TODO Filter
	var _feed='';
	var _feed_loading=true;




	function refresh(){
		_feed_loading=true;
		$.get( "data.php",function(data){
			_feed=data;
			_feed_loading=false;
		});
	}
	refresh();
}();
