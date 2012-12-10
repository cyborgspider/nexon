$.fn.sliderCarousel = function (options) {
	var s = $.extend({
		thumbs: '#mcp_carousel_inner a',
		handle: '#mcp_carousel_slider',
		wrapper: '#mcp_carousel_inner',
		totalWidth: 700,
		offset: 5
	}, options || {}),
		$this = $(this);
	

	if($(this).find(s.thumbs).length <= s.offset)
		$(this).find(s.handle).hide();
	else
		$(this).find(s.handle).show();
	
	return this.each(function () {
		var count = $this.find(s.slides).length,
			
			thumbWidth = $this.find(s.slides).eq(0).outerWidth(true),
			thisWidth = s.totalWidth,
			wrapperWidth = count * thumbWidth,
			handleWidth = Math.floor(s.offset * thisWidth / count),
			handleThumbWidth = (thisWidth - handleWidth) / (count - s.offset),
			
			wrapper = $this.find(s.wrapper),
			handle = $this.find(s.handle),
			
			animationTimeout = 500,
			isSlidingHandle = false,
			initX = 0,
			currentPage = 0,
			lastPage = 0;
		
		function moveToPage(pageNumber) {
			wrapper.stop()
				.css({ left: -pageNumber * thumbWidth });
			handle.stop()
				.css({ left : pageNumber * handleThumbWidth });
		}
		
		function slideToPage(pageNumber) {
			wrapper.stop()
				.css({ left : wrapper.position().left })
				.animate({ left: -pageNumber * thumbWidth }, animationTimeout);
			handle.stop()
				.css({ left : handle.position().left })
				.animate({ left: pageNumber * handleThumbWidth }, animationTimeout);
		}
		
		$this.bind('sliderCarouselGoToPage', function(e, page) {
			slideToPage(page || 0);
		});
		
		function snapToClosest(){
			var left = Math.abs(wrapper.position().left / thumbWidth);
			if (lastPage > currentPage) {
				slideToPage(Math.floor(left));
			} else {
				slideToPage(Math.ceil(left));
			}
		}
		
		$(document).bind('mouseup', function(){
			if (isSlidingHandle) {
				isSlidingHandle = false;
				snapToClosest();
				handle.removeClass('mcp_active');
			}
		});
		
		$(document).bind('mousemove', function(e){
			if (isSlidingHandle) {
				lastPage = currentPage;
				currentPage = count * (e.pageX - initX) / thisWidth;
				currentPage = Math.max(0, currentPage);
				currentPage = Math.min(currentPage, (count - s.offset));
				moveToPage(currentPage);
			}
		});
		
		handle.bind('mousedown', function(e){
			e.preventDefault();
			wrapper.stop();
			handle.addClass('mcp_active');
			initX = e.pageX - handle.position().left;
			isSlidingHandle = true;
		});
		
		// set width of slides
		handle.css({ width : handleWidth - 2 });
		wrapper.css({ width : wrapperWidth });
	});
	
};

$.fn.mediaCarouselPopup = function(){

	var MCP_POPUP = '<div id="mcp_screen"></div><div id="mcp"><div id="mcp_inner"> <a id="mcp_close" href="#"></a> <div id="mcp_content"></div><div id="mcp_carousel"><div id="mcp_carousel_inner"></div><div id="mcp_carousel_slider"><div id="mcp_carousel_slider_left"></div><div id="mcp_carousel_slider_right"></div></div></div></div></div>';
	
	if(!$('body').find('#mcp').length)
		$('body').append(MCP_POPUP);
			
	var hidePopup = function (e) {
		if (e) {
			e.preventDefault();
		}
		$('#mcp_content').html('');
		$('#mcp, #mcp_screen').hide();
	};
	
	$('#mcp_close, #mcp_screen').click(hidePopup);
	hidePopup();


	//showContent click event

	$(this).find('.mcp_source, .mcp_carousel_content').live('click', function(e){
		
		//popuplateCarousel
		if($(this).attr('class') == 'mcp_source'){
			var html = '';
			$.each($(this).parents('#m-media').find('.mcp_source'), function(i, o){
				html += '<a href="#" class="mcp_carousel_content" data-index="' + i +
				'" data-mcp-type="' +  $(o).data('mcp-type') + '" data-mcp-info="' + $(o).data('mcp-info') + '"><img alt="" src="' + $(o).data('thumb') + '"/>';
			
				switch($(o).data('mcp-type')){
				case 'v':
				case 'youtube':
					html += '<span class="mcp_video_overlay"></span>';
					break;
				case 'i':
				case 'img':
				case 'image':
				default:
					html += '<span class="mcp_image_overlay"></span>';
					break;
				}
		
				html += '</a>';
				
			});
			$('#mcp_carousel_inner').html(html);
		}
		var i = $(this).data('index');
		e.preventDefault();
		
	
		var current,
			mcp = $('#mcp_content');
			
		if (i === undefined) {
			return;
		}

		current = $(this);
		
		$('#mcp').css('top', 100 + $(document).scrollTop()).show();
		$('#mcp_screen').show();
		
		switch(current.data('mcp-type')){
			case 'v':
			case 'youtube':
				mcp.html('<iframe src="https://www.youtube.com/embed/' + current.data('mcp-info') + 
						'?version=3' + 
						'&hd=1' + 
						'&rel=0' + 
						'&showsearch=0' + 
						'&showinfo=0' + 
						'&iv_load_policy=3' + 
						'&cc_load_policy=0' + 
						'&autoplay=0' + 
						'&modestbranding=1' + 
						'&autohide=1' + 
						'&fs=1" frameborder="0" ></iframe>');
				break;
			case 'i':
			case 'img':
			case 'image':
			default:
				 mcp.html('<img src="' + current.data('mcp-info') +'" alt="" />');
				break;

		}

		
		// carousel
		$('#mcp').sliderCarousel({
			slides: '#mcp_carousel_inner a',
			handle: '#mcp_carousel_slider',
			slider: '#mcp_carousel_inner',
			offset: 5
		});
		
		$('#mcp').trigger('sliderCarouselGoToPage', [Math.max(0, Math.min(i - 2, $('#mcp_carousel_inner a').length - 5))]);
		$('#mcp_carousel_inner a').removeClass('mcp_active').eq(i).addClass('mcp_active');

		
	});
}
function heroBanner() {
        var slides       = $('#m-events-ban li'), //the items that are being transitioned
            buttons      = $('#m-events-controls li'), //click on these to cycle through the banners
            fadetimeout  = 500, //use this to control length of animation
            pausetimeout = 5000, //use this to control how long between timed animations
            activeclass  = 'active'; //determines the current banner showing
			t            = setTimeout(nextslide, pausetimeout);
            slide        = 0;
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
            function displayslide(number) {
                slide = number;
                var selected = $(slides).eq(number);
                var button = $(buttons).eq(number);

                slides.removeClass(activeclass);
                selected.addClass(activeclass);
                selected.stop().fadeIn(fadetimeout, function() {
                    slides.not('.' + activeclass).fadeOut(0);
                })         

                //selected.addClass(activeclass).stop().fadeIn(fadetimeout);

                buttons.removeClass(activeclass);
                button.addClass(activeclass);

                //$(slider).stop().animate({ top: (-number * s.height) }, s.fadetimeout,'easeInOut');

                clearTimeout(t);
                t = setTimeout(nextslide, pausetimeout + fadetimeout);
		}
}

//A function to populate Featured Items automatically
function mainFeaturedItems() {
    $.getScript('http://nxcache.nexon.net/publisher/mabinogi/publisher_mainitems.js', function () {
        if (typeof Data_mainitems == 'undefined') { return false; }
        var ul = $('<ul>');
        for (i = 0; i < Data_mainitems.length; i++) {
            var data = Data_mainitems[i];
            $('<li>').append(
                $('<a>').attr('href', data.item_url).append(
                    $('<img>').attr({
                        'src': data.item_image_url_thumb,
                        'alt': data.item_image_url,
                        'alt2': data.item_image_overlay_url
                    })
                    )
                )
                .append(
                    ('<p><span class="description">{0}</span><span class="price">{1}</span></p>').format(data.item_name, data.price.digits())
                ).appendTo(ul);
        }
        ul.appendTo('#m-items-carousel');

        $("#m-items").highlightcarousel({
            slides: '#m-items-carousel li',
            nextbtn: '#m-items-next',
            prevbtn: '#m-items-prev',
            slider: '#m-items-carousel ul',
            desc: true,
            descholder: '#m-items-display-text',
            imgholder: '#m-items-display-image',
            newicon: '.m-items-new',
            width: 58
        });
        $('#m-items-display').css('background', 'url("null")').click(function () {
            window.location.href = $(this).attr('href');
        });
    }
    );
}

//a function for the media tabs
function mediaTabs(){
	$('#tab-video').click(function(){
		$(this).addClass('active');
		$('#tab-screenshots').removeClass();
		$('#video').removeClass('dn')
		$('#screenshots').addClass('dn')
	})
	$('#tab-screenshots').click(function(){
		$(this).addClass('active');
		$('#tab-video').removeClass();
		$('#screenshots').removeClass('dn')
		$('#video').addClass('dn')		
	})	
}
/*digits() and format() function taken from the old website*/
jQuery.fn.digits=function(){return this.each(function(){$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"))})},String.prototype.digits=function(){var n=this;return n=n.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,")},String.prototype.format=function(){for(var t=this,n=arguments.length;n--;)t=t.replace(new RegExp("\\{"+n+"\\}","gm"),arguments[n]);return t}


