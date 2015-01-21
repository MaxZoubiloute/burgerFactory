/**
 * Created by mlarde01 on 14/01/15.
 */
angular.module('burgerFactory.services.burger', [])
    .factory('Burger', ['$resource', 'apiUrl', function($resource, apiUrl) {

        var Burger = $resource(apiUrl + '/burger/:burgerId', {burgerId: '@id'}, {
            update: { method: 'PUT'}
        });
        return Burger;
    }]);
