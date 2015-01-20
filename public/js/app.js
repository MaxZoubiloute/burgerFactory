
// Declare app level module which depends on filters, and services
angular.module('burgerFactory.controllers', [
    'burgerFactory.controllers.home',
    'burgerFactory.controllers.navbar',
    'burgerFactory.controllers.burger',
    'burgerFactory.controllers.ingredient'

]);
angular.module('burgerFactory.services', [
    'burgerFactory.services.burger',
    'burgerFactory.services.ingredient'

]);

var app = angular.module('burgerFactory',
    [
        'ui.bootstrap',
        'ngRoute',
        'ngResource',
        'burgerFactory.services',
        'burgerFactory.controllers'
    ]
);

app.constant("apiUrl", "http://localhost:8080")
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'views/home.html', controller: 'HomeController'})
            .when('/burger', {templateUrl: 'views/burger.html', controller: 'BurgerController'})
            .when('/ingredient', {templateUrl: 'views/ingredient.html', controller: 'IngredientController'})
            .when('/about', {templateUrl: 'views/about.html'})
            .otherwise({redirectTo: '/'});
    }]);
