'use strict';



angular.module('fluro.ui')


.directive('fluroVideo', function($compile, Fluro) {

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="fluro-video video-{{model.assetType}}"></div>',
        controller: 'FluroVideoController',
        scope: {
            model: '=ngModel',
        },
        link: function($scope, $element, $attrs) {

            ///////////////////////////

            var template;

            switch ($scope.model.assetType) {
                case 'youtube':
                    template = '<div class="video-wrapper"><youtube-video video-url="model.external.youtube" player-vars="playerVars"/></div>';
                    break;
                case 'vimeo':
                    template = '<div class="video-wrapper"><vimeo-video video-url="model.external.vimeo" player-vars="playerVars"/></div>';
                    break;
                case 'upload':
                    $scope.playUrl = Fluro.apiUrl + '/get/' + $scope.model._id;
                    template = '<div class="video-wrapper"><video controls><source ng-src="{{playUrl | trustfluro}}" type="{{model.mimetype}}"></video></div>';
                    break;
            }

            //Create the template
            if (template) {
                var cTemplate = $compile(template)($scope);
                $element.append(cTemplate);
            }
        },


    };
})


.filter('trustfluro', ['$sce',
    function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }
])

/////////////////////////////////////////////////////

.controller('FluroVideoController', function($scope) {

    if (!$scope.playerVars) {
        $scope.playerVars = {
            controls: 0,
            autoplay: 0,
            modestbranding: 1,
            playsinline: 1,
            showinfo: 0,
            theme: 'light',
            byline: 0,
            portrait: 0,
            title: 0
        }
    }

    //console.log('Inline video', $scope.model)
    // var urlString = $fluro_url + '/get/' + $scope.id;

    //$scope.url = urlString;
});