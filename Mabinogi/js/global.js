//jQuery plugins
function globalNavDropDown(){/*create a function to animate the main dropdown menu*/
	var animationMilliseconds = 200,
		nav = $('#nav'),
		drop = $('#drop'),
		main = $('#main li'),
		height = 0;
	/* show the drop and move it off screen */
	drop.show().css('left',-5000);
	/* get heights of the children and bind hover */
	drop.children('li').each(function(i){
		var mainLI = main.eq(i);
		var dropLI = $(this);
		height = Math.max(height, $(this).height());
		$(this).bind('mouseenter', function(){
			main.removeClass('hover');
			mainLI.addClass('hover');
			dropLI.addClass('hover');
		});
		$(this).bind('mouseleave', function(){
			main.removeClass('hover');
			dropLI.removeClass('hover');
		});
		mainLI.bind('mouseenter',function(){
			dropLI.addClass('hover');
		});
		mainLI.bind('mouseleave',function(){
			dropLI.removeClass('hover');
		});	
	});
	/* set heights of the children */
	drop.children('li').height(height);
	/* now use the height var for the height of the drop */
	height = drop.height();
	drop.css({'height':0, 'left':0});
	
	/* rollover state */
	nav.bind('mouseenter', function(){
		drop.stop().animate({ 'height' : height }, animationMilliseconds);
	});
	nav.bind('mouseleave', function(){
		drop.stop().animate({ 'height' : 0 }, animationMilliseconds);
	});
}
//Site popups
$.fn.popupinit = function () {
    /* check if the popup exists and create it */
    if ($('#popup').length == 0) {
        $('body').append('<div id="popup">');
    }
    /* check if the screen exists and create it */
    if ($('#screen').length == 0) {
        $('body').append('<div id="screen">');
    }
    /* hide the popup */
    $('#screen, #popup').hide();
    /* check if the popup has been processed and process it */
    if (!$('#popup').hasClass('processed')) {
        $('#popup').html('<div id="popup-close"></div><div id="popup-content"></div>');
        $('#screen, #popup-close').click(function (e) {
            e.preventDefault();
            $().popuphide();
        });
        $('#popup').addClass('processed');
    }
}
$.fn.popuphide = function () {
    $('#popup').hide();
    $('#popup-content').html('');
    $('#screen').fadeOut(200);
    $('#popup').removeClass();
    $('#popup').addClass('processed');
}
$.fn.popupyoutube = function () {

    $.fn.popupinit(); 
	var c; 
	return this.each(function () {

        $(this).click(function (a) {
			a.preventDefault(); 
			c = $(this).data("video"); 
			d = $(this).next('.desc').children('h2').text();
			e = $(this).next('.desc').children('p').text();
			$("#popup").addClass("youtube");
			$("#popup").css({ top: $(document).scrollTop() + 150 }).animate({ top: $(document).scrollTop() + 195 }, 200); 
			var a = $(this).data("width") ? parseInt($(this).data("width")) : 698, b = $(this).data("height") ? parseInt($(this).data("height")) : 398, a = '<iframe width="' + a + '" height="' + b + '" src="http://www.youtube.com/embed/' + c + '?autoplay=0&rel=0" ></iframe><h2>'+d+'</h2><p>'+e+'</p>';
			$("#popup-content").html(a);
            $("#screen, #popup").fadeIn(200);

        })
    })
};
$.fn.popupflash = function () {

    $.fn.popupinit(); 
	var c; 
	return this.each(function () {

        $(this).click(function (a) {

            a.preventDefault();
			$("#popup").addClass("flash"); 
			$("#popup").css({ top: $(document).scrollTop() + 150 }).animate({ top: $(document).scrollTop() + 195 }, 200);
			var src = $(this).attr('href'),
				w = $(this).data("width"),
				h = $(this).data("height");				

            $("#popup-content").append('<div id="flash-content"></div>');
			$('#flash-content').flash({ "src": src, "width": w, "height": h, "allowscriptaccess": "always" });
            $("#screen, #popup").fadeIn(200);

        })
    })
};


//Run the functions
globalNavDropDown();
