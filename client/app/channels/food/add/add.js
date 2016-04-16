angular.module('platypus.food-add', [])
 .controller('FoodAddController', function($scope, YelpApi, Restaurants, Likes){

  $scope.data = {};

  $scope.like = {};

  $scope.search = function(){
    $scope.data.restaurants = {};

    YelpApi.retrieveYelp($scope.name, function(restaurants){
      $scope.data.restaurants = restaurants;
      console.log(restaurants);
      $scope.name = '';
    });
  };

  $scope.addOne = function(restaurant){
    var restaurantCategories = [];

    // Categories Have extra information that has to be sanitized 
    for(var i = 0; i < restaurant.categories.length; i++) {
      restaurantCategories.push(restaurant.categories[i][0]);
    }

    Restaurants.addOne({
      name: restaurant.name,
      yelpID: restaurant.id,
      eat24_url: restaurant.eat24_url || null,
      image_url: restaurant.image_url,
      likes: 0,
      categories: restaurantCategories
    }, function(resp) {
      var id = {restaurant: resp.data._id};
        //add a like
        Likes.addOne(id);
    });
  }
 });
