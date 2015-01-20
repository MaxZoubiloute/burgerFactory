/**
 * Created by mlarde01 on 14/01/15.
 */
angular.module('burgerFactory.controllers.burger',[])
    .controller('BurgerController', ['$scope', 'Burger', '$modal', '$routeParams', '$location', function ($scope, Burger, $modal, $routeParams, $location) {

        $scope.refresh = function(){
            $scope.burgers =  Burger.query(function(){

            });
        };

        $scope.createBurgerModal = function() {
            var createModalInstance = $modal.open({
                templateUrl: 'views/burger-creator.html',
                controller: function ($scope, $location, $modalInstance, Burger, Ingredient) {
                    $scope.ingredients = Ingredient.query();

                    $scope.createBurger = function () {
                        $scope.newBurger = new Burger($scope.newBurger);
                        console.log($scope.newBurger);
                        $scope.newBurger.$save(function (data, getResponseHeaders) {
                            $modalInstance.close();
                        }, function (data, getResponseHeaders) {
                            //error call-back
                        });
                    }

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    }
                },
                resolve: {
                }
            });

            createModalInstance.result.then(function(){
                $scope.refresh();
            }, function(){});
        }

        $scope.selectBurger = function (burger) {
            $modal.open({
                templateUrl: 'views/burger-editor.html',
                controller: function($scope, $modal, $modalInstance, Ingredient){
                    $scope.ingredients = Ingredient.query();

                    $scope.close = function(){
                        $modalInstance.close();
                    }

                    // Open a confirmation modal then delete
                    $scope.delete = function(burger){
                        var confirmModalInstance = $modal.open({
                            templateUrl: 'views/confirm-delete.html',
                            size:"sm",
                            controller: function($scope, $modalInstance, Burger) {
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                }
                                $scope.delete = function(){
                                    $scope.burger = new Burger($scope.burger);
                                    $scope.burger.$remove({burgerId: $scope.burger.burgerId}, function(){
                                        $modalInstance.close();
                                    }, function(){
                                        console.log('Error burger not deleted');
                                    });
                                }
                            },
                            resolve: {
                                burger: function(){
                                    return burger;
                                }
                            }
                        });

                        confirmModalInstance.result.then(function(){
                            $modalInstance.close();
                        }, function (){});

                    };

                    $scope.update = function(){
                        //TODO
                    };
                },
                resolve: {
                    burger: function(){
                        return burger;
                    }
                }
            });
        };

        // Initialisation
        $scope.refresh();
        if($routeParams.action){
            $scope.createBurgerModal();
            $location.search('action', null);
        }

    }]);
