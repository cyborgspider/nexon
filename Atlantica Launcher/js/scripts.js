function mallBanner() {
        var slides       = $('#item-ban li'), //the items that are being transitioned
            buttons      = $('#item-controls li'), //click on these to cycle through the banners
            fadetimeout  = 500, //use this to control length of animation
            pausetimeout = 3000, //use this to control how long between timed animations
            activeclass  = 'active'; //determines the current banner showing
			t            = setTimeout(nextslide, pausetimeout);
            slide        = 0;
			leftbutton   = $('#item-controls .left'),//when clicked, go backwards in the slideshow
			rightbutton  = $('#item-controls .right'),//when clicked, go forward in the slideshow
            count        = slides.length;
            displayslide(0);
            buttons.click(function(e) {
                e.preventDefault();
                displayslide(buttons.index(this));
            });
            function nextslide() {
                slide = (slide + 1) % count;
                displayslide(slide);
            }
			function prevslide() {
                slide = (slide - 1) % count;
                displayslide(slide);
            }
            function displayslide(number) {
                slide = number;
                var selected = $(slides).eq(number);
                var button = $(buttons).eq(number);

                slides.removeClass(activeclass);
                selected.addClass(activeclass);
                selected.stop().fadeIn(fadetimeout, function() {
                    slides.not('.' + activeclass).fadeOut(0);
                })         
                buttons.removeClass(activeclass);
                button.addClass(activeclass);

                clearTimeout(t);
                t = setTimeout(nextslide, pausetimeout + fadetimeout);
			}
			rightbutton.click(function(e){
				nextslide();
			});
			leftbutton.click(function(e){
				prevslide();
			});
			
}