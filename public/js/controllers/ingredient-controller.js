/**
 * Created by mlarde01 on 14/01/15.
 */
angular.module('burgerFactory.controllers.ingredient',[])
    .controller('IngredientController', ['$scope', 'Ingredient', '$modal', function ($scope, Ingredient, $modal) {

        $scope.refresh = function(){
            $scope.ingredients = Ingredient.query();
        };
        
        $scope.selectIngredient = function (ingredient) {
            var editModalInstance = $modal.open({
                templateUrl: 'views/ingredient-editor.html',
                controller: function($scope, $modal, $modalInstance, Ingredient, ingredient){
                    $scope.ingredient = ingredient;

                    $scope.ingredients = Ingredient.query();

                    $scope.close = function(){
                        $modalInstance.close();
                    }

                    // Open a confirmation modal then delete
                    $scope.delete = function(ingredient){
                        var confirmModalInstance = $modal.open({
                            templateUrl: 'views/confirm-delete.html',
                            size:"sm",
                            controller: function($scope, $modalInstance, Ingredient, ingredient) {

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                }

                                $scope.delete = function(){
                                    ingredient = new Ingredient(ingredient);
                                    ingredient.$remove({ingredientId: ingredient.ingredientid}, function(){
                                        $modalInstance.close();
                                    }, function(){
                                        console.log('Error ingredient not deleted');
                                    });
                                }
                            },
                            resolve: {
                                ingredient: function(){
                                    return ingredient;
                                }
                            }
                        });

                        confirmModalInstance.result.then(function(){
                            $modalInstance.close();
                        }, function (){});

                    };

                    // Update ingredient when modified
                    $scope.update = function(ingredient){
                        ingredient = new Ingredient(ingredient);
                        ingredient.$update({ingredientId: ingredient.ingredientid}, function(){
                            $modalInstance.close();
                        });
                    };
                },
                resolve: {
                    ingredient: function(){
                        return ingredient;
                    }
                }
            });

            editModalInstance.result.then(function(){
                $scope.refresh();
            }, function(){});
        };
        
        $scope.createIngredientModal = function(){
            var createModalInstance = $modal.open({
                templateUrl: 'views/ingredient-creator.html',
                controller: function ($scope, $location, $modalInstance, Ingredient) {
                    $scope.createIngredient = function () {
                        $scope.newIngredient = new Ingredient($scope.newIngredient);
                        $scope.newIngredient.$save(function (data, getResponseHeaders) {
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

        // Initialisation
        $scope.refresh();
    }]);
