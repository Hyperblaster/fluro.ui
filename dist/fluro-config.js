
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




'use strict';

//Extend the date
(function() {
    
    Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    Date.longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    Date.shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    Date.longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // defining patterns
    var replaceChars = {
        // Day
        d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
        D: function() { return Date.shortDays[this.getDay()]; },
        j: function() { return this.getDate(); },
        l: function() { return Date.longDays[this.getDay()]; },
        N: function() { return (this.getDay() == 0 ? 7 : this.getDay()); },
        S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
        w: function() { return this.getDay(); },
        z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, // Fixed now
        // Week
        W: function() { 
            var target = new Date(this.valueOf());
            var dayNr = (this.getDay() + 6) % 7;
            target.setDate(target.getDate() - dayNr + 3);
            var firstThursday = target.valueOf();
            target.setMonth(0, 1);
            if (target.getDay() !== 4) {
                target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
            }
            return 1 + Math.ceil((firstThursday - target) / 604800000);
        },
        // Month
        F: function() { return Date.longMonths[this.getMonth()]; },
        m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
        M: function() { return Date.shortMonths[this.getMonth()]; },
        n: function() { return this.getMonth() + 1; },
        t: function() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, // Fixed now, gets #days of date
        // Year
        L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
        o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
        Y: function() { return this.getFullYear(); },
        y: function() { return ('' + this.getFullYear()).substr(2); },
        // Time
        a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
        A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
        B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
        g: function() { return this.getHours() % 12 || 12; },
        G: function() { return this.getHours(); },
        h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
        H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
        i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
        s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
        u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ?
    '0' : '')) + m; },
        // Timezone
        e: function() { return "Not Yet Supported"; },
        I: function() {
            var DST = null;
                for (var i = 0; i < 12; ++i) {
                        var d = new Date(this.getFullYear(), i, 1);
                        var offset = d.getTimezoneOffset();
    
                        if (DST === null) DST = offset;
                        else if (offset < DST) { DST = offset; break; }                     else if (offset > DST) break;
                }
                return (this.getTimezoneOffset() == DST) | 0;
            },
        O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
        P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
        T: function() { return this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); },
        Z: function() { return -this.getTimezoneOffset() * 60; },
        // Full Date/Time
        c: function() { return this.format("Y-m-d\\TH:i:sP"); }, // Fixed now
        r: function() { return this.toString(); },
        U: function() { return this.getTime() / 1000; }
    };

    // Simulates PHP's date function
    Date.prototype.format = function(format) {
        var date = this;
        return format.replace(/(\\?)(.)/g, function(_, esc, chr) {
            return (esc === '' && replaceChars[chr]) ? replaceChars[chr].call(date) : chr;
        });
    };

}).call(this);




angular.module('fluro.ui')

.filter('formatDate', function(){
  return function(dateString, format){
    return new Date(dateString).format(format)
  };
});
