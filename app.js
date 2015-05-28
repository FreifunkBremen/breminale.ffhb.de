"use strict";angular.module("breminaleApp",["ngCookies","ngResource","ngSanitize","ui.router","gettext"]).config(["$urlRouterProvider","$locationProvider",function($urlRouterProvider,$locationProvider){$urlRouterProvider.otherwise("/"),$locationProvider.html5Mode(!0).hashPrefix("!")}]).run(function(gettextCatalog){gettextCatalog.currentLanguage="de",gettextCatalog.debug=!0}),angular.module("breminaleApp").config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$stateProvider.state("index",{url:"/",templateUrl:"app/main/main.html"}).state("about",{url:"/about",templateUrl:"app/main/about.html"})}]),angular.module("breminaleApp").config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$stateProvider.state("feed",{url:"/feed",templateUrl:"app/feed/feed.html",controller:"FeedCtrl"})}]),angular.module("breminaleApp").controller("FeedCtrl",["$scope","$http",function($scope,$http){$scope._filter="",$scope.refresh=function(){$scope.loading=!0,$http.get("/data.php").success(function(result){$scope.list=result.feed,$scope.lastUpdate=result.lastUpdate,$scope.Iterator=result.Iterator,$scope.loading=!1})},$scope.refresh(),$scope.setFilter=function(args){$scope._filter=args}}]),angular.module("breminaleApp").controller("NavbarCtrl",["$scope",function($scope){$scope.toggleMenu=function(){$("#navbarSidebar").sidebar("toggle")}}]),angular.module("gettext").run(["gettextCatalog",function(gettextCatalog){gettextCatalog.setStrings("de",{Home:"Startseite",Login:"Anmelden","Login not possible":"Anmeldung nicht Möglich",Logout:"Abmelden",Mail:"E-Mail",Password:"Passwort",Test:"Test","sign up":"registrieren"})}]),angular.module("breminaleApp").run(["$templateCache",function($templateCache){$templateCache.put("app/feed/feed.html",'<main class="ui page grid main"><div class=row><div class="column ui segment"><h1 class="ui header">{{\'Feeds\'|translate}}</h1>Filter: &nbsp;<div class="ui basis buttons mini"><div ng-click=setFilter(&quot;&quot;) ng-class="{&quot;primary&quot;:(_filter==&quot;&quot;)}" class="ui button">All</div><div ng-click=setFilter(&quot;twocootstravel&quot;) ng-class="{&quot;primary&quot;:(_filter==&quot;twocootstravel&quot;)}" class="ui button">twocootstravel</div><div ng-click=setFilter(&quot;StateParkSunday&quot;) ng-class="{&quot;primary&quot;:(_filter==&quot;StateParkSunday&quot;)}" class="ui button">StateParkSunday</div></div><div ng-click=refresh() class="ui button mini right"><i class="icon refresh"></i></div></div></div><div class=row><div class="column ui segment"><div class="ui feed"><div ng-repeat="item in list|filter:{hashtags:_filter}" class=event><div class=label><i class="icon newspaper"></i></div><div class=content><div class=date>{{item.created_time|date:\'EEE HH:mm\'}}</div><div class=summary>{{item.message}}</div><div class=meta><div ng-repeat="tag in item.hashtags" ng-click=setFilter(tag) class="ui button mini">{{tag}}</div></div></div></div></div><div ng-class={&quot;active&quot;:loading} class="ui dimmer"></div></div></div><div class=row><div class=column><p>last refresh: {{lastUpdate*1000|date:\'dd.MM.yyyy HH:mm:ss\'}}<br>count of refresh: {{Iterator}}</p></div></div></main>'),$templateCache.put("app/main/about.html",'<main class="ui page grid main"><div class=row><div class="column ui segment"><h1 class="ui header">{{\'About\'|translate}}</h1></div></div><div class=row><div class="column ui segment"><p style=height:1000px>About Text</p></div></div></main>'),$templateCache.put("app/main/main.html",'<main class="ui page grid main"><div class=row><div class="column ui segment"><h1 class="ui header">{{\'Home\'|translate}}</h1></div></div><div class=row><div class="column ui segment"><p style=height:1000px>Home Text</p></div></div></main>'),$templateCache.put("components/navbar/header.html",'<header><img src="http://breminale.sternkultur.de/images/layout/header.jpg"></header>'),$templateCache.put("components/navbar/navbar.html",'<div class="ui page grid"><div ng-include="\'components/navbar/header.html\'" class=row></div></div><div id=navbar ng-controller=NavbarCtrl class="ui grid"><div class="computer tablet only ui page grid"><div class=row><div class=column><div class="ui menu inverted"><a ui-sref=index ng-class="{\'active\':$state.includes(\'index\')}" class=item><i class="icon home"></i>{{\'Home\'|translate}}</a><a ui-sref=feed ng-class="{\'active\':$state.includes(\'feed\')}" class=item><i class="icon home"></i>{{\'Feed\'|translate}}</a><a ui-sref=about ng-class="{\'active\':$state.includes(\'about\')}" class=item><i class="icon mail"></i>{{\'About\'|translate}}</a></div></div></div></div><div class="mobile only ui menu inverted top fixed grid page"><div class="menu open"><a ng-click=toggleMenu() class=item><i class="icon content vertical"></i></a><a class="brand item">breminale.ffhb.de</a></div></div></div><div id=navbarSidebar class="row ui sidebar left vertical inverted menu labeled icon"><a ui-sref=index ng-class="{\'active\':$state.includes(\'index\')}" class=item><i class="icon home"></i>{{\'Home\'|translate}}</a><a ui-sref=feed ng-class="{\'active\':$state.includes(\'feed\')}" class=item><i class="icon home"></i>{{\'Feed\'|translate}}</a><a ui-sref=about ng-class="{\'active\':$state.includes(\'about\')}" class=item><i class="icon mail"></i>{{\'About\'|translate}}</a></div>')}]);