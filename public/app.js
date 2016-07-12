var app = angular.module('miniReddit', ['ngRoute']);

app.controller('IndexController', function(){
  this.greeting = "What's up.";
});

app.config(function($locationProvider, $routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/views/index.html',
    controller: 'IndexController',
    controllerAs: 'index'
  })

  .when('/users',{
    templateUrl: '/views/users/index.html',
    controller: 'UsersController',
    controllerAs: 'users'
  })

  .when('/users/:id',{
    templateUrl:'/views/users/show.html',
    controller: 'ShowController',
    controllerAs: 'show'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})

app.controller('UsersController', ['$http', function($http){
  var store = this;

  $http({
    method:'GET',
    url:'/api/users'
  }).then(function(results){
    store.usersList = results.data;
  });
}]);

app.controller("ShowController", ['$http','$routeParams', function($http, $routeParams){
  var store = this;

  $http({
    method:'GET',
    url:'/api/users/' + $routeParams.id
  }).then( results => {
    console.log(results);
    this.user = results.data;
  })

}]);
