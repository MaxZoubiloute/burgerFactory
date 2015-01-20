/**
 * Created by mlarde01 on 19/01/15.
 */
angular.module('burgerFactory.controllers.navbar',[])
    .controller('NavbarController', ['$scope', '$location', '$modal', function ($scope, $location, $modal) {

        $scope.createBurgerView = function(){
            $location.search('action', 'create');
            $location.path('burger');
        }
    }]);
