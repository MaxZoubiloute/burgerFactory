/**
 * Created by mlarde01 on 14/01/15.
 */
angular.module('burgerFactory.services.ingredient', [])
    .factory('Ingredient', ['$resource', 'apiUrl', function($resource, apiUrl) {

        var Ingredient = $resource(apiUrl + '/ingredient/:ingredientId', {ingredientId: '@id'}, {
            update: { method: 'PUT'}
        });

        return Ingredient;
    }]);
