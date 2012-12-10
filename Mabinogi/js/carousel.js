$.fn.carousel = function(options) {
        var s = $.extend({
            slides: '#sale-carousel li', //the slides
            animtimeout: 3000, //use this to control length of animation
            pausetimeout: 3000, //use this to control how long between timed animations
            slider: '.item-list.sale', //the thing that is slid
            count: 4,  // item number per index
            width: 168 //width of slide including margins
        }, options || {});
        return this.each(function () {
            var count = $(s.slides).length;
            var page = 0;
            var slide = 0;
            var t = setTimeout(nextpage, s.pausetimeout);
            $(s.slider).css({ width: count * s.width });
            function nextpage(shift) {
                if (typeof shift == 'undefined') shift = s.count;
                page += shift;
                if (page >= count) page = 0;
                else if (page < 0) page = count - ((count - 1) % s.count + 1);
                gotopage(page);
            }
            function gotopage(number) {
                clearTimeout(t);
                if (count > s.count)
                    t = setTimeout(nextpage, s.pausetimeout + s.animtimeout);
                var cur = Math.ceil(number / s.count);
                $(s.slider).stop().animate({ left: -number * s.width }, s.animtimeout);
            }
        });
};