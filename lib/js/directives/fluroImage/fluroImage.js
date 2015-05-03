'use strict';

angular.module('fluro.ui')
    .directive('fluroImage', function() {
        return {
            restrict: 'EA',
            replace: true,
            template: '<div class="fluro-image"><img ng-style="styles" ng-src="{{url}}" spinner-on-load/></div>',
            controller: 'InlineImageController',
            scope: {
                id: '=fluroImage',
                imageWidth: '=',
                imageHeight: '=',
                ngParams:'&',
            }
        };
    })

/////////////////////////////////////////////////////

.controller('InlineImageController', function($scope, $window, Fluro) {


     $scope.params = $scope.ngParams();
    if(!$scope.params){
        $scope.params = {}
    }

    $scope.styles ={}

    if($scope.params.width) {
        $scope.styles['width'] = $scope.params.width;
    }

    if($scope.params.height) {
        $scope.styles['height'] = $scope.params.height;
    }

    if($scope.params.maxWidth) {
        $scope.styles['max-width'] = $scope.params.maxWidth;
    }

    if($scope.params.maxHeight) {
        $scope.styles['max-height'] = $scope.params.maxHeight;
    }



    if($scope.imageWidth) {
        $scope.params.imageWidth = $scope.imageWidth;
    }

    if($scope.imageHeight) {
        $scope.params.imageHeight = $scope.imageHeight;
    }

    //////////////////////////////////////////////////////////////

    var urlString = Fluro.apiURL + '/get/' + $scope.id;

    //////////////////////////////////////////////////////////////

    if ($scope.params.imageWidth || $scope.params.imageHeight) {
        urlString += '?dimensions';

        if ($scope.params.imageWidth) {
            urlString += '&w=' + $scope.params.imageWidth;
        }

        if ($scope.params.imageHeight) {
            urlString += '&h=' + $scope.params.imageHeight;
        }
    } else {

        var limit = 1200;

        if ($window.screen.width <= 768) {
            limit = 768;
        }

        urlString += '?dimensions&w=' + limit;

    }


    //console.log('URL String', urlString)

    //////////////////////////////////////////////////////////////

    $scope.url = urlString;
})



.directive('spinnerOnLoad', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {

            var preloader = angular.element('<span class="image-preloader"><i class="fa fa-spinner fa-spin"></i></span>');

            element.on('load', function() {
                element.removeClass('spinner-hide');
                element.addClass('spinner-show');

                preloader.remove();
            });

            scope.$watch('ngSrc', function() {
                // Set visibility: false + inject temporary spinner overlay
                element.addClass('spinner-hide');


                element.parent().append(preloader);
            });
        }
    };
});