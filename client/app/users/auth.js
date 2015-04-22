'use strict';

angular.module('lunchCorgi.signup', ['ngRoute'])

.controller('SignUpCtrl', function ($scope, $window, $location, Users, Events) {
  $scope.user = {};

  $scope.signedIn = function() {
    return !!$window.localStorage['com.corgi']
  };

  $scope.signin = function () {
    var uName = $scope.user.username;
    Users.signin($scope.user)
      // .then(function(){
      //   Username.user=$scope.user.username
      // })
      .then(function (token) {
        localStorage.setItem('com.corgi', JSON.stringify({token: token, username: uName}));
        $location.path('/');
      })
      .catch(function (error) {
        if (error.status === 401) {
          $scope.loginError = true;
        }
        console.error(error);
      });
  };

  $scope.signup = function() {
    var uName = $scope.user.username;
    Users.signup($scope.user)
      .then(function(token){
        localStorage.setItem(JSON.stringify({token: token, username: uName}));
        $location.path('/');
      })
      .catch(function (error) {
        if (error.status === 401) {
          $scope.signupError = true;
        }
        console.error(error);
    });
  };

  $scope.signout = function() {
    localStorage.removeItem('com.corgi');
    $location.path('/signin');
  }

});




