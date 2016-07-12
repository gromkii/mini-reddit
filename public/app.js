var app = angular.module('miniReddit', ['ngRoute']);

app.controller('IndexController', function(){
  this.greeting = "What's up.";
});

app.config(function($locationProvider, $routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/index.html',
    controller: 'IndexController',
    controllerAs: 'index'
  })

  .when('/users',{
    templateUrl: 'views/users/index.html',
    controller: 'UsersController',
    controllerAs: 'users'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})

app.controller('UsersController', ['$http', function($http){

}]);
