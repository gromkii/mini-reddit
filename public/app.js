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

  .when('/users/:id',{
    templateUrl:'/views/users/show.html',
    controller: 'ShowUserController',
    controllerAs: 'show'
  })

  .when('/users/:id/posts',{
    templateUrl:'/views/users/posts.html',
    controller:'UserPostController',
    controllerAs:'userPosts'
  })

  .when('/posts',{
    templateUrl:'/views/posts/index.html',
    controller:'PostsController',
    controllerAs:'posts'
  })

  .when('/posts/new',{
    templateUrl:'/views/posts/new.html',
    controller:'NewPostController',
    controllerAs:'newPost'
  })

  .when('/posts/:post_id',{
    templateUrl:'/views/posts/show.html',
    controller:'ShowPostController',
    controllerAs: 'showPost'
  })

  .when('/posts/:post_id/comment',{
    templateUrl:'/views/posts/comment.html',
    controller:'NewCommentController',
    controllerAs:'newComment'
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

app.controller("ShowUserController", ['$http','$routeParams', function($http, $routeParams){
  var store = this;

  $http({
    method:'GET',
    url:'/api/users/' + $routeParams.id
  }).then( results => {
    console.log(results);
    store.user = results.data;
  })

}]);

app.controller("UserPostController", ['$http','$routeParams', function($http, $routeParams){
  var store = this;

  $http({
    method:'GET',
    url:`/api/users/${$routeParams.id}/posts`
  }).then(results => {
    store.data = results.data;
  })
}]);

app.controller("NewUserController", function(){
  //Do I even really need this?
});

app.controller("PostsController", ['$http', function($http){
  var store = this;

  $http({
    method:'GET',
    url:'/api/posts'
  }).then(results => {
    store.postsList = results.data;
  })
}]);

app.controller("NewPostController", ['$http','$scope', function($http,$scope){
  var store = this;

  $http({
    method:'GET',
    url:'/api/users'
  }).then(results => {
    store.users = results.data;
  });
}]);

app.controller("ShowPostController", ['$http','$routeParams', function($http, $routeParams){
  var store = this;
  $http({
    method:'GET',
    url:`/api/posts/${$routeParams.post_id}`
  }).then(results => {
    store.post = results.data;
  })
}])

app.controller("NewCommentController", ['$http','$routeParams', function($http,$routeParams){
  var store = this;
  $http({
    method:'GET',
    url:`/api/posts/${$routeParams.post_id}/comment`
  }).then(results=>{
    store.data = results.data;
  })
}])
