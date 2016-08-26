// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('contact-page', {
            url: "/",
            templateUrl: 'view/contact.html',
            controller: 'ListContactCtrl'
        })
        .state('add-page', {
            url: "/add",
            templateUrl: 'view/add.html',
            controller: 'NewContactCtrl'
        });

    $urlRouterProvider.otherwise("/");
})

.service('ContactService', function() {
    contact = [];

    $initContact = [{
        "name": "Kijja Chalantorn",
        "tel": "0909603759",
        "isFav": false
    }, {
        "name": "Preeyaphat Kiratisakdapong",
        "tel": "0823459784",
        "isFav": true
    }];

    contact = $initContact;

    this.getContact = function() {
        return contact;
    }

    this.addContact = function($obj) {
        contact.push($obj);
    }

    this.deleteContact = function($i) {
        contact.splice($i, 1);
    }

    this.editFavorite = function($i) {
        contact[$i].isFav = !contact[$i].isFav;
    }
})

.controller('ListContactCtrl', function($scope, ContactService) {
    $scope.list = [];
    $scope.shouldShowDelete = false;

    $scope.list = ContactService.getContact();

    $scope.deleteContact = function($index) {
        ContactService.deleteContact($index);
    }

    $scope.editFavorite = function($index) {
        ContactService.editFavorite($index);
    }

    $scope.btnDelete = function() {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
    }
})

.controller('NewContactCtrl', function($scope, ContactService) {
    $scope.save = function($name, $tel, $fav) {
        $objectContact = {
            "name": $name,
            "tel": $tel,
            "isFav": $fav
        };

        ContactService.addContact($objectContact);
    }
})
