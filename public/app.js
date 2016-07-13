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

  .when('/users/new',{
    templateUrl:'/views/users/new.html',
    controller: 'NewUserController',
    controllerAs:'newUser'
  })

  .when('/posts/new',{
    templateUrl:'/views/posts/new.html',
    controller:'NewPostController',
    controllerAs:'newPost'
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

app.controller("NewUserController", function(){
  this.logger = function(){
    console.log('Hello');
  }
});

app.controller("NewPostController", ['$http','$scope', function($http,$scope){
  var store = this;

  $http({
    method:'GET',
    url:'/api/users'
  }).then(results => {
    store.users = results.data;
  });
}]);
