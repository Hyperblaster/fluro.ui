'use strict';

angular.module('fluro.ui')
.directive('slider', function() {
    return {
        restrict: 'EA',
        transclude:true,
        replace:true,
        template: '<div class="slider"><div class="slider-contents" ng-transclude></div></div>',
    };
});



