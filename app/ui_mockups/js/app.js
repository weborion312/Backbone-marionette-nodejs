'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
    'ngRoute',
    'phonecatAnimations',

    'phonecatControllers',
    'phonecatFilters',
    'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/tasks', {
                templateUrl: 'partials/tasks.html',
                controller: 'Tasks'
            }).
            when('/dashbord', {
                templateUrl: 'partials/dashbord.html',
                controller: 'Help'
            }).
            when('/inbox', {
                templateUrl: 'partials/inbox.html',
                controller: 'Settings'
            }).
            when('/notification', {
                templateUrl: 'partials/notification.html',
                controller: 'Notification'
            }).
            when('/calendar', {
                templateUrl: 'partials/calendar.html',
                controller: 'Calendar'
            }).
            when('/profile', {
                templateUrl: 'partials/profile.html',
                controller: 'Profile'
            }).
            otherwise({
                redirectTo: '/tasks'
            });
    }]);
