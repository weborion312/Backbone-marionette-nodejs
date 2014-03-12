'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('Calendar', ['$scope', 'Phone', '$rootScope',
    function ($scope, Phone, $rootScope) {
        console.warn('calendar **')
        $rootScope.activeLink = '/calendar'
    }]);


phonecatControllers.controller('Tasks', ['$scope', 'Phone', '$rootScope',
    function ($scope, Phone, $rootScope) {
        $rootScope.activeLink = '/task'
        $rootScope.activeTasks = [
            {title: 't', description: 'qweqwe'},
            {title: 'b', description: 'asdasd'}
        ]
        $rootScope.doneTasks = [
            {title: 't1', description: 'qweqwe'},
            {title: 'b1', description: 'asdasd'}
        ]
        $scope.creatTask = function () {
            if (event.keyCode === 13) {
                $scope.onEnter()
            }
        }
        $scope.markAsActive = function (task, index) {
            $rootScope.activeTasks.unshift(task)
            $rootScope.doneTasks.splice(index, 1);
        }
        $scope.markAsDone = function (task, index) {
            $rootScope.doneTasks.unshift(task)
            $rootScope.activeTasks.splice(index, 1);
        }
        $scope.remove = function(array, index){
            array.splice(index, 1);
        }

        $scope.onEnter = function () {
            $scope.activeTasks.unshift({title: $scope.new_task, description: ''})
            $scope.new_task = ''
        }


    }]);


phonecatControllers.controller('Help', ['$scope', 'Phone', '$rootScope',
    function ($scope, Phone, $rootScope) {
        $rootScope.activeLink = '/help'
    }]);

phonecatControllers.controller('Settings', ['$scope', 'Phone', '$rootScope',
    function ($scope, Phone, $rootScope) {
        $rootScope.activeLink = '/settings'
    }]);


phonecatControllers.controller('Notification', ['$scope', 'Phone', '$rootScope',
    function ($scope, Phone, $rootScope) {
        $rootScope.activeLink = '/notification'
    }]);

phonecatControllers.controller('Profile', ['$scope', 'Phone', '$rootScope',
    function ($scope, Phone, $rootScope) {

    }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
    function ($scope, $routeParams, Phone) {
        $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
            console.log("get Phone", phone)
            $scope.mainImageUrl = phone.images[0];
        });


        $scope.setImage = function (imageUrl) {
            console.log('set Image')
            $scope.mainImageUrl = imageUrl;
        }
    }]);
