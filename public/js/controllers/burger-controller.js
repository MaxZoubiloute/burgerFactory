/**
 * Created by mlarde01 on 14/01/15.
 */
angular.module('burgerFactory.controllers.burger',[])
    .controller('BurgerController', ['$scope', 'Burger', '$modal', '$routeParams', '$location', function ($scope, Burger, $modal, $routeParams, $location) {

        $scope.refresh = function(){
            console.log("Refreshing");
            $scope.burgers =  Burger.query(function(){

            });
        };

        $scope.createBurgerModal = function() {
            var createModalInstance = $modal.open({
                templateUrl: 'views/burger-creator.html',
                controller: function ($scope, $location, $modalInstance, Burger, Ingredient) {
                    $scope.ingredients = Ingredient.query();
                    $scope.newBurger = {name:"", ingredients:[]};

                    $scope.createBurger = function () {
                        $scope.newBurger = new Burger($scope.newBurger);
                        $scope.newBurger.$save(function (data, getResponseHeaders) {
                            $modalInstance.close();
                        }, function (data, getResponseHeaders) {
                            //error call-back
                        });
                    };

                    $scope.addIngredient = function(ingredient, index){
                        $scope.newBurger.ingredients.push(ingredient);
                        $scope.ingredients.splice(index, 1);
                    };

                    $scope.removeIngredient = function(ingredient, index){
                        $scope.ingredients.push(ingredient);
                        $scope.newBurger.ingredients.splice(index, 1);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                }
            });

            createModalInstance.result.then(function(){
                $scope.refresh();
            }, function(){
                $scope.refresh();
            });
        }

        $scope.selectBurger = function (burger) {
            var editModalInstance = $modal.open({
                templateUrl: 'views/burger-editor.html',
                controller: function($scope, $modal, $modalInstance, Ingredient, burger){
                    $scope.burger = burger;

                    $scope.ingredients = Ingredient.query();

                    $scope.close = function(){
                        $modalInstance.close();
                    };

                    $scope.addIngredient = function(ingredient, index){
                        if (!$scope.burger.ingredients){
                            $scope.burger.ingredients = [];
                        }
                        $scope.burger.ingredients.push(ingredient);
                        $scope.ingredients.splice(index, 1);
                    };

                    $scope.removeIngredient = function(ingredient, index){
                        $scope.ingredients.push(ingredient);
                        $scope.burger.ingredients.splice(index, 1);
                    };

                    // Open a confirmation modal then delete
                    $scope.delete = function(burger){
                        var confirmModalInstance = $modal.open({
                            templateUrl: 'views/confirm-delete.html',
                            size:"sm",
                            controller: function($scope, $modalInstance, Burger, burger) {
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                }

                                $scope.delete = function(){
                                    burger = new Burger(burger);
                                    burger.$remove({burgerId: burger.burgerid}, function(){
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

                    // Update burger when modified
                    $scope.update = function(){
                        $scope.burger = new Burger($scope.burger);
                        $scope.burger.$update({burgerId: $scope.burger.burgerid}, function(){
                            $scope.edit = false;
                            $modalInstance.close();
                        });
                    };
                },
                resolve: {
                    burger: function(){
                        return burger;
                    }
                }
            });

            editModalInstance.result.then(function(){
                $scope.refresh();
            }, function(){});
        };

        // Initialisation
        $scope.refresh();
        if($routeParams.action){
            $scope.createBurgerModal();
            $location.search('action', null);
        }

    }]);
