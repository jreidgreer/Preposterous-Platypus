angular.module('platypus', [
  'ngRoute',
  'platypus.auth',
  'platypus.user',
  'platypus.services',
  'platypus.food-feed',
  'platypus.food-add',
  'platypus.foodServices'
  ])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/food/add', {
      templateUrl: 'app/channels/food/add/add.html',
      controller: 'FoodAddController',
      authenticate: true
    })
    .when('/food/feed', {
      templateUrl: 'app/channels/food/feed/feed.html',
      controller: 'FoodFeedController',
      authenticate: true
    })
    .when('/user/dashboard', {
      templateUrl: 'app/user/dashboard.html',
      controller: 'UserController',
      authenticate: true
    })
    .when('/user/settings', {
      templateUrl: 'app/user/settings.html',
      controller: 'UserController',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/user/dashboard'
    });
})
.run(function ($rootScope, $location, $http) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate) {
      $http.get('/api/users/signedin').success(function(user){
        if (!user) {
          $location.url('/');
        }
      });
    }
  });
});