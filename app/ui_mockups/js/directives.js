'use strict';
/* Services */

phonecatControllers.controller('leftMenu', ['$scope', 'Phone', '$rootScope',
    function ($scope, Phone, $rootScope) {
        console.log('left menu included ****')
        $rootScope.goTo = function (link) {
            console.warn('linkkkkkkkkkkkk', link)
            $rootScope.activeLink = link
            window.location.hash = link
        }
        $rootScope.activeLink = '/task'
        $rootScope.links = [
            {name: 'Tasks', url: '/task', icon: 'icon-home'},
            {name: 'Calendar', url: '/calendar', icon: 'icon-calendar'},
            {name: 'Settings', url: '/settings', icon: 'icon-cog'},
            {name: 'Help', url: '/help', icon: 'icon-question'},
            {name: 'Notifications', url: '/notification', icon: 'icon-exclamation'}
        ]
    }]);
