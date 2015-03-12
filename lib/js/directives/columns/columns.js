'use strict';

angular.module('fluro.ui')
    .directive('columns', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'fluro/ui/columns.html',
            controller: 'ColumnsController',
            scope: {
                model: '=ngModel',
            }
        };
    })

/////////////////////////////////////////////////////

.controller('ColumnsController', function($scope) {

    console.log('COLUMNS', $scope.model, 12/$scope.model.length)
    $scope.columnWidth = Math.round(12 / $scope.model.length)
})


