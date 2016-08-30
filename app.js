var app = angular.module('myApp', ['ngRoute', 'firebase']);

function bindFirebase($rootScope, $firebaseArray) {
    var sessions_ref = firebase.database().ref().child("sessions");
    $rootScope.sessions = $firebaseArray(sessions_ref);            

    var items_ref = firebase.database().ref().child("items");
    $rootScope.items = $firebaseArray(items_ref);            
}

app.run(bindFirebase)

var vtemplate = '<strong>status:</strong> {{ status }}<br/><strong>sessions: </strong>{{ sessions }}<br/><strong>items:</strong> {{ items }}<br/>'
var editSessionTempl = '<h2>Edit Session</h2><div><input type=text placeholder="Session name" ng-model="session.name" /><button ng-click="save(session)" >Save</button></div>'
var signInTempl = '<h2>Sign In</h2><div><input type=text placeholder=email ng-model="user.email" /><input placeholder=password type=password ng-model="user.password" /><button ng-click="login(user)" >Sign In</button></div>'
var editItemTempl = 
      '<h2>Edit Item</h2>'
      + '<div>'
        + 'Session: <select ng-model="item.session">'
          + '<option ng-repeat="session in sessions" value="{{ session.$id }}"> {{ session.name }} </option>'        
        + '</select><br />'        
        + '<input type=text placeholder="Item name" ng-model="item.name" />'
        + '<button ng-click="save(item)">Save</button>'
      +'</div>';

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/', {
            controller: 'IndexController',
            template: vtemplate
        }).
        when('/signin', {
            controller: 'SignInController',
            template: vtemplate + signInTempl
        }).        
        when('/sessions/create', {
            controller: 'CreateSessionController',
            template: vtemplate + editSessionTempl
        }).
        when('/items/create', {
            controller: 'CreateItemController',
            template: vtemplate + editItemTempl
        }).                
        when('/logoff', {
            controller: 'LogoutController',
            template: vtemplate
        }).                
        otherwise({
            redirectTo: '/'
        });        
}]);

app.controller('IndexController', ['$rootScope', '$scope', 
	function ($rootScope, $scope) {
      if(!$rootScope.status)
    	 $rootScope.status = "Olá mundo!"
}]);

app.controller('SignInController', ['$rootScope', '$scope', '$firebaseObject', '$location',
	function ($rootScope, $scope, $firebaseObject, $location) {
      $scope.login = function(user) {
        	firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function(){
      			$rootScope.status = 'Signed In';
            $location.path('#/');
            bindFirebase($rootScope, $firebaseObject);
    		}, function(error) {
      			$rootScope.status = 'Sign In Error: ' + error;
    		});
    }
}]);

app.controller('LogoutController', ['$rootScope', '$scope', '$firebaseObject', '$location',
	function ($rootScope, $scope, $firebaseObject, $location) {
       console.log('Logging out');
    	firebase.auth().signOut().then(function() {
  			$rootScope.status = 'Signed Out';
        $location.path('#/');
		}, function(error) {
  			$rootScope.status = 'Sign Out Error: ' + error;
		});
}]);

app.controller('CreateItemController', ['$rootScope', '$scope', '$location', '$firebaseObject',
  function ($rootScope, $scope, $location, $firebaseObject) {
    $scope.save = function(item){    
      // Obtém chave para nova sessao.
      var newItemKey = firebase.database().ref().child('item').push().key;
      var update = {};
      update['/items/' + newItemKey] = item;
      firebase.database().ref().update(update);
      $rootScope.status = "Item criado. " + newItemKey;
      $location.path('#/');
    }
}]);

app.controller('CreateSessionController', ['$rootScope', '$scope', '$location', '$firebaseObject',
	function ($rootScope, $scope, $location, $firebaseObject) {
    $scope.save = function(session){    
      // Obtém chave para nova sessao.
      var newSessionKey = firebase.database().ref().child('sessions').push().key;
      var update = {};
      update['/sessions/' + newSessionKey] = session;
      firebase.database().ref().update(update);
      $rootScope.status = "Sessão criada. " + newSessionKey;
      $location.path('#/');
    }
}]);