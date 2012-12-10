//jQuery plugins
function shopDropdown(){/*create a function to animate the main dropdown menu*/
	var animationMilliseconds = 200,
		nav = $('#shop-nav'),
		drop = $('#shop-nav-drop'),
		main = $('#shop-nav-main li'),
		height = 132;

	drop.addClass('hidden');
	
	/* rollover state */
	nav.bind('mouseenter', function(){
		drop.removeClass('hidden');
		drop.stop().animate({ 'height' : height }, animationMilliseconds);
	});
	nav.bind('mouseleave', function(){
		drop.addClass('hidden');
		drop.stop().animate({ 'height' : 0 }, animationMilliseconds);
	});
}

$.fn.saleCarousel = function(options) {
        var s = $.extend({
            slides: '#sale-carousel li', //the jquery object of items
            animtimeout: 1000, //use this to control length of animation
            pausetimeout: 4000, //use this to control how long between timed animations
            nextbtn: '#control-right', //next button
            prevbtn: '#control-left', //previous button
            indexbtns: '#sales-pager', //previous button
            slider: '.item-list.sale', //the thing that is slid
            count: 4,  // item number per index
            width: 166 //width of slide including margins
        }, options || {});
        return this.each(function () {
            var count = $(s.slides).length;
            var page = 0;
            var slide = 0;
            var t = setTimeout(nextpage, s.pausetimeout);
            $(s.slider).css({ width: count * s.width });
            for (i = 0; i < Math.ceil(count / s.count); i++) {
                $(s.indexbtns).append('<li></li>');
            }
            $(s.indexbtns + ' li').eq(0).addClass('active');
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
                $(s.indexbtns + ' li').removeClass('active');
                $(s.indexbtns + ' li').eq(cur).addClass('active');
                $(s.slider).stop().animate({ left: -number * s.width }, s.animtimeout);
            }
            $(s.nextbtn).click(function (e) {
                e.preventDefault();
                nextpage(s.count);
            });
            $(s.prevbtn).click(function (e) {
                e.preventDefault();
                nextpage(-s.count);
            });
            $(s.indexbtns + ' li').click(function (e) {
                e.preventDefault();
                var ind = $(s.indexbtns + ' li').index(this) * s.count;
                page = Math.max(Math.min(ind, count - s.count), 0);
                gotopage(page);
            });
        });
};

//Run the functions
shopDropdown();