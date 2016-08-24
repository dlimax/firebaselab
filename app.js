var app = angular.module('myApp', ['ngRoute', 'firebase']);

app.run(function($rootScope, $firebaseObject) {
	var sessions_ref = firebase.database().ref().child("sessions");
	$rootScope.sessions = $firebaseObject(sessions_ref);    	    	

	var items_ref = firebase.database().ref().child("items");
	$rootScope.items = $firebaseObject(items_ref);    	    	
})

var vtemplate = '<strong>status:</strong> {{ status }}<br/><strong>sessions: </strong>{{ sessions }}<br/><strong>items:</strong> {{ items }}'

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/', {
            controller: 'IndexController',
            template: vtemplate
        }).
        when('/signin', {
            controller: 'SignInController',
            template: vtemplate
        }).        
        when('/sessions/create', {
            controller: 'CreateSessionController',
            template: vtemplate
        }).
        when('/logout', {
            controller: 'LogoutController',
            template: vtemplate
        }).                
        otherwise({
            redirectTo: '/'
        });        
}]);

app.controller('IndexController', ['$rootScope', '$scope', 
	function ($rootScope, $scope) {
    	$rootScope.status = "Olá mundo!"
}]);

app.controller('SignInController', ['$rootScope', '$scope', '$firebaseObject',
	function ($rootScope, $scope, $firebaseObject) {
    	firebase.auth().signInWithEmailAndPassword('dudumonteiro@gmail.com', 'teste123').then(function(){
  			$rootScope.status = 'Signed In';
		}, function(error) {
  			$rootScope.status = 'Sign In Error';
		});
}]);

app.controller('LogoutController', ['$rootScope', '$scope', '$firebaseObject',
	function ($rootScope, $scope, $firebaseObject) {
    	firebase.auth().signOut().then(function() {
  			$rootScope.status = 'Signed Out';
		}, function(error) {
  			$rootScope.status = 'Sign Out Error';
		});
}]);

app.controller('CreateSessionController', ['$rootScope', '$scope', '$firebaseObject',
	function ($rootScope, $scope, $firebaseObject) {
		newSession = {'name': 'Drinks'}
		// Obtém chave para nova sessao.
   		var newSessionKey = firebase.database().ref().child('sessions').push().key;
   		var update = {};
   		update['/sessions/' + newSessionKey] = newSession;
 		firebase.database().ref().update(update);
 		$rootScope.status = "Sessão criada. " + newSessionKey;
}]);