(function($) {
    var slide = function(ele,options) {
        var $ele = $(ele);
        var setting = {
            speed: 1000,
            interval: 5000,
            
        };
        $.extend(true, setting, options);
        var states = [
            { $zIndex: 1, width: 430, height: 300, top: 120, left: -20, $opacity: 0.2 },
            { $zIndex: 2, width: 530, height: 400, top: 90, left: 100, $opacity: 0.3 },
            { $zIndex: 3, width: 650, height: 500, top: 35, left: 220, $opacity: 0.7 },
            { $zIndex: 4, width: 850, height: 610, top: 0, left: 370, $opacity: 1 },
            { $zIndex: 3, width: 650, height: 500, top: 35, left: 720, $opacity: 0.7 },
            { $zIndex: 2, width: 530, height: 400, top: 90, left: 960, $opacity: 0.3 },
            { $zIndex: 1, width: 430, height: 300, top: 120, left: 1200, $opacity: 0.2 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

        function next() {
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    slide()
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        return this;
    }
})(jQuery);
