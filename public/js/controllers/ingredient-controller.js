/**
 * Created by mlarde01 on 14/01/15.
 */
angular.module('burgerFactory.controllers.ingredient',[])
    .controller('IngredientController', ['$scope', 'Ingredient', '$modal', function ($scope, Ingredient, $modal) {

        $scope.refresh = function(){
            $scope.ingredients = Ingredient.query();
        };

        $scope.createIngredient = function(){
            var createModalInstance = $modal.open({
                templateUrl: 'views/ingredient-creator.html',
                controller: function ($scope, $location, $modalInstance, Burger) {
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
    }]);
