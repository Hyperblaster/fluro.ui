'use strict';

angular.module('fluro.ui')
    .directive('fluroNotifications', function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            controller: 'FluroNotificationsController',
            template: '<div class="notifications"><div class="notification animate {{message.type}}" ng-repeat="message in messages"><i class="fa fa-{{message.type}}"></i><span>{{message.text}}</span><i class="close fa fa-times" ng-click="message.remove()"></i></div></div>',
        };
    })

/////////////////////////////////////////////////////

.controller('FluroNotificationsController', function($scope, Notifications) {
    $scope.messages = Notifications.list;
})

/////////////////////////////////////////////////////

.service('Notifications', function($timeout) {

    var controller = {
        list: []
    }

    /////////////////////////////////////////////////////

    controller.warning = function(text, delay) {
        controller.post(text, 'warning', delay);
    }

    controller.error = function(text, delay) {
        controller.post(text, 'error', delay);
    }

    controller.status = function(text, delay) {
        controller.post(text, 'status', delay);
    }

    /////////////////////////////////////////////////////

    controller.post = function(text, type, delay) {

        if (typeof type === 'undefined') {
            type = 'status';
        }

        if (typeof delay === 'undefined') {
            delay = 5000;
        }

        var msg = {};
        msg.text = text;
        msg.type = type;
        msg.remove = function() {
            var i = controller.list.indexOf(msg);
            if (i != -1) {
                controller.list.splice(i, 1);
            }
        }

        controller.list.push(msg)

        //Remove automatically after 5 seconds
        $timeout(msg.remove, delay);
    }

    /////////////////////////////////////////////////////

    return controller;
});