'use strict';

angular.module('fluro.ui')
    .directive('fluroGallery', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'fluro/ui/gallery.html',
            scope:{
                model:'=ngModel',
            },
            controller: 'FluroGalleryController',
            link: function($scope, $element, $attributes) {
                $scope.$element = $element;
                //$scope.playlist.items = $element.find('slide');
            }
        };
    })


/////////////////////////////////////////////////////

.controller('FluroGalleryController', function($scope, Playlist) {

    var _this = this;


    

    //Setup a playlist
    $scope.playlist = new Playlist();
    $scope.playlist.items = $scope.model;


    $scope.isActive = function(image) {
        return $scope.playlist.currentItem == image;
    }

    //Link functionality
    $scope.next = $scope.playlist.next;
    $scope.previous = $scope.playlist.previous;
    
    $scope.select = $scope.playlist.select;


    //Select specific index
    $scope.selectIndex = function(index) {
        $scope.playlist.index = index;
    }

})
