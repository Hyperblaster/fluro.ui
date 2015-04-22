'use strict';

angular.module('fluro.ui')
    .directive('fluroSlideshow', function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'fluro/ui/slideshow.html',
            transclude: true,
            require: 'fluroSlideshow',
            controller: 'FluroSlideshowController',
            link: function($scope, $element, $attributes) {

                $scope.$element = $element;
                //$scope.playlist.items = $element.find('slide');
            }
        };
    })


/////////////////////////////////////////////////////

.controller('FluroSlideshowController', function($scope, Playlist) {

    var _this = this;


        //Setup a playlist
        $scope.playlist = new Playlist();

    //Link functionality
    $scope.next = $scope.playlist.next;
    $scope.previous = $scope.playlist.previous;
    
    $scope.select = $scope.playlist.select;


    //Select specific index
    $scope.selectIndex = function(index) {
        $scope.playlist.index = index;
    }



    $scope.$watch('playlist.currentItem', function(newSlide, oldSlide) {
        if (oldSlide != newSlide) {
            if (oldSlide) {
                oldSlide.active = false;
            }

            if (newSlide) {
                newSlide.active = true;




                /**
                var h = newSlide.$element.height();
                $scope.styles.height = h + 'px';
                /**/
               
            }
        }
    })

    /*
        $scope.play = function() {
            if (!isPlaying) {
                isPlaying = true;
                restartTimer();
            }
        };
    $scope.pause = function() {
        if (!$scope.noPause) {
            isPlaying = false;
            resetTimer();
        }
    };
*/

    _this.addSlide = function(slide) {

        console.log('ADD SLIDE')
       // slide.$element = element[0];
        $scope.playlist.addItem(slide);

        if(slide == $scope.playlist.currentItem) {
        	slide.active = true;
        }

    };

    _this.removeSlide = function(slide) {
        $scope.playlist.removeItem(slide);
    };

})

/////////////////////////////////////////////////////

.directive('slide', function() {
    return {
        require: '^fluroSlideshow',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: 'fluro/ui/slide.html',
        scope: {
            active: '=?'
        },
        link: function(scope, element, attrs, slideshowController) {

            slideshowController.addSlide(scope);
        }
    };
})