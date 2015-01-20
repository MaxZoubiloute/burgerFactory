angular.module('burgerFactory.controllers.home', [])
  .controller('HomeController', ['$scope', '$http', 'apiUrl', function ($scope, $http, apiUrl) {

        $http.get(apiUrl + '/burger/last').
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.lastBurgers = data;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

  }]);
