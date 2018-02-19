
//Create Fluro UI With dependencies
angular.module('fluro.ui', [
    'fluro.config',
    'fluro.util',
    ]);
/*

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
*/


/*
'use strict';


angular.module('fluro.ui')
    .directive('countdownClock', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'fluro/ui/countdown.html',
            scope: {
                model: '=ngModel',
            }
        };
    })

*/


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

    console.log('PLAYLISt', $scope.playlist.currentItem);

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

        // slide.$element = element[0];
        $scope.playlist.addItem(slide);

        if (slide == $scope.playlist.currentItem) {
            slide.active = true;
        }

    };

    _this.removeSlide = function(slide) {
        $scope.playlist.removeItem(slide);
    };

})

/////////////////////////////////////////////////////

.directive('fluroSlide', function() {
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



