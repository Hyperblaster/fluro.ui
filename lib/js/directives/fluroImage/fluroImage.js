'use strict';

angular.module('fluro.ui')
.directive('fluroImage', function() {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div class="fluro-image"><img ng-src="{{url}}" spinner-on-load/></div>',
        controller: 'InlineImageController',
        scope: {
            id: '=fluroImage',
            imageWidth: '=',
            imageHeight: '=',
        }
    };
})

/////////////////////////////////////////////////////

.controller('InlineImageController', function($scope, Fluro) {


    if(!$scope.imageVars) {
        $scope.imageVars = {
        }
    }

    //////////////////////////////////////////////////////////////

    var urlString = Fluro.apiUrl + '/get/' + $scope.id;

    //////////////////////////////////////////////////////////////

    if ($scope.imageWidth || $scope.imageHeight) {
        urlString += '?dimensions';

        if ($scope.imageWidth) {
            urlString += '&w=' + $scope.imageWidth;
        }

        if ($scope.imageHeight) {
            urlString += '&h=' + $scope.imageHeight;
        }
    }

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
