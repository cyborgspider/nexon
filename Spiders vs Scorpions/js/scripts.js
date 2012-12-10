//Scripts
/*JavaScript widgets:
Popup animated hovers
1024 background image scroller
----Nice to have----
Parallax effect*/

(function ($) {
    $.fn.extend({
        rewardCycler: function(){
            var items = $(this),
                currentItem = 0,
                lastItem = 0,
                timer;
                
            function nextItem(e) {
                lastItem = currentItem;
                currentItem = (currentItem + 1) % items.length;
                changeItem();
            };

            function changeItem(){
                //items.css({'opacity' : 0});
                items.eq(lastItem).css({'opacity' : 1}).stop().animate({'opacity' : 0}, 500);
                items.eq(currentItem).css({'opacity' : 0}).stop().animate({'opacity' : 1}, 300);
                
                // reset timer
                clearTimeout(timer);
                timer = setTimeout(nextItem, 4000);
            }
            items.not(':eq(0)').css({'opacity' : 0});
            timer = setTimeout(nextItem, 3000);
            return this;
        },
        videoPopup: function(){
            
            $(this).live('click', function(e){
            
                e.preventDefault(); 
     
                var videoUrl,
                    header,
                    current,
                    description,
                    like_button;
                
                current = $(this);
                header = current.find('h2').text();
                description = current.find('p').html();
                videoUrl = current.data('video-id');
                like_button = current.find('iframe#like').text();
                
                //if ($('#gnt_popup').has('#popup_youtube_info').length){$('#popup_youtube_info').remove()}
                nexon.gnt.popupGeneric('<iframe id="video_frame" src="http://www.youtube.com/embed/' + videoUrl +'" allowfullscreen="true" />','youtube');
                $('#gnt_popup_center').append('<div id="popup_youtube_info"><h2>' +  header + '</h2><iframe id="like" src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.youtube.com%2Fembed%2F'+videoUrl+'&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21"  scrolling="no" frameborder="0" allowTransparency="true"></iframe>'+like_button+'<p>' + description + '</p></div>');      
            });
        return this;
        },
        videoListPopup: function(){
            
            $(this).live('click', function(e){
            
                e.preventDefault(); 
     
                var videoUrl,
                    header,
                    current,
                    description;
                
                current = $(this);
                header = current.data('title');
                description = current.data('description');
                videoUrl = current.data('video-id');
                
                //if ($('#gnt_popup').has('#popup_youtube_info').length){$('#popup_youtube_info').remove()}
                nexon.gnt.popupGeneric('<iframe id="video_frame" src="http://www.youtube.com/embed/' + videoUrl +'" allowfullscreen="true" />','youtube');
                $('#gnt_popup_center').append('<div id="popup_youtube_info"><h2>' +  header + '</h2><iframe id="like" src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.youtube.com%2Fembed%2F'+videoUrl+'&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21"  scrolling="no" frameborder="0" allowTransparency="true"></iframe><p>' + description + '</p></div>');      
            });
        return this;
        },        
        popupWindow: function(){
            var self = $(this),
                popupX = (screen.width/2) - (810/2),
                popupY = 100;//if you want to center from the top, use (screen.height/2) - (650/2);
        	self.live('click',function(e) {
                e.preventDefault();
                var newWin = window.open(self.attr("href"), "popup", "width=810, height=600, resizable=no, scrollbars=yes, top="+popupY+", left="+popupX+"");
                if (!newWin) {
                    alert("Your browser's pop-up blocker is currently enabled. If you wish to view the legal information, please disable the pop-up blocker temporarily and try again. Thank you.");
                }
            });
        },
        fadeTransition: function(){
            $(this).hover(function(){  
                onState =  $(this).find('.on');
                links =  onState.siblings('.btn-links');
                learnMore = $(this).find('.btn-lm');
                onState.stop().animate({'opacity':'1'}, 200); 
                links.show(); 
                learnMore.hide();
            },  function(){
                onState =  $(this).find('.on'); 
                links =  onState.siblings('.btn-links'); 
                learnMore = $(this).find('.btn-lm');
                onState.stop().animate({'opacity':'0'}, 100);
                links.hide();
                learnMore.show();
            });
        },
        checkResolution: function(){
        var win = $(window),
            bod = $('body');
            function resized(){
                if (win.width()>=1680){
                    bod.removeClass();  
                }
                /*if ((win.width()<=1600) && (win.width() >=1520)) {
                    bod.removeClass(); 
                    bod.addClass('w1600');			 
                }				
                if ((win.width()<=1520) && (win.width() >=1440)) {
                    bod.removeClass(); 
                    bod.addClass('w1520');			 
                }
                if ((win.width()<=1440) && (win.width() >=1400)) {
                    bod.removeClass();  
                    bod.addClass('w1440');
                }
                if ((win.width()<=1400) && (win.width() >=1366)) {
                    bod.removeClass();  
                    bod.addClass('w1400');
                }		
                if ((win.width()<=1366) && (win.width() >=1320)) {
                    bod.removeClass();  
                    bod.addClass('w1366');
                }
                if ((win.width()<=1320) && (win.width() >=1280)) {
                    bod.removeClass();  
                    bod.addClass('w1320');
                }*/			
                if ((win.width()<=1680) && (win.width() >=1440)) {
                    bod.removeClass();  
                    bod.addClass('w1680');
                }				
                if ((win.width()<=1440) && (win.width() >=1330)) {
                    bod.removeClass();  
                    bod.addClass('w1440');
                }
                if ((win.width()<=1330) && (win.width()>=1280)) {
                    bod.removeClass();  
                    bod.addClass('w1330');
                }		
                if ((win.width()<=1280) && (win.width()>=1044)) {
                    bod.removeClass();  
                    bod.addClass('w1280');
                }		
                if (win.width()<=1044) {
                    bod.removeClass();  
                    bod.addClass('w1024');
                }	                
            }
            win.resize(resized);
            resized();            
        },
        popupImages: function(){

            $(this).live('click', function(e){
            
                e.preventDefault(); 
                var imgUrl,
                    current,
                    container;
                
                current = $(this);
                imgUrl = current.data('img');
                container = current.parents('#screenshots');
                le = container.children('li').length;
                
                nexon.gnt.popupGeneric('<img src="'+imgUrl+'" alt=""/>','keyart');
                $('.popup_content').append('<div id="prev"></div><div id="next"></div>');

                $('#next').click(function(e){
                    e.preventDefault();
                    $(container.children('li')[(current.index() + 1) % le]).click();
                });
                $('#prev').click(function(e){
                    e.preventDefault();
                    $(container.children('li')[(current.index() - 1 + le) % le]).click();
                });                  

            });
        return this;        
        },
        popupKeyart: function(){

            $(this).live('click', function(e){
            
                e.preventDefault(); 
                var imgUrl,
                    current,
                    container,
                    orientation,
                    windowClass;
                
                current = $(this);
                imgUrl = current.data('img');
                orientation = current.data('orientation');
                container = current.parents('#screenshots');
                le = container.children('li').length;
                
                
                nexon.gnt.popupGeneric('<img src="'+imgUrl+'" alt=""/>', orientation);
                $('.popup_content').append('<div id="prev"></div><div id="next"></div>');

                $('#next').click(function(e){
                    $('#gnt_popup').removeClass();
                    e.preventDefault();
                    $(container.children('li')[(current.index() + 1) % le]).click();
                    //orientation = current.data('orientation');
                    //$('#gnt_popup').removeClass().addClass(orientation);
                });
                $('#prev').click(function(e){
                    $('#gnt_popup').removeClass()
                    e.preventDefault();
                    $(container.children('li')[(current.index() - 1 + le) % le]).click();
                    //orientation = current.data('orientation');                  
                    //$('#gnt_popup').removeClass().addClass(orientation);
                });                  

            });
        return this;        
        },        
        navEffect: function(){
            var time,
                nav,
                drop,
                dropSiblings,
                alreadyHovered,
                mainNav;
            
            nav = $(this);
            drop = nav.children().find('ul');
            
            nav.hover(function(){
                drop.stop(true,true).fadeIn('fast');
            }, function(){
                drop.stop(true,true).fadeOut('fast');
            })
        }
    });
})(jQuery);

function makeVideoList(){
    var i, len, el, loadOffset;
    el = $('#videos ul');
    for (i=0, len = videos.length; i<len; i++){
        el.append($('<li><span data-title="'+videos[i].title+'" data-description="'+videos[i].description+'" data-video-id="'+videos[i].video+'"></span><img src="'+videos[i].thumb+'"/><h3>'+videos[i].title+'</h3><p>'+videos[i].description+'</p><iframe id="like" src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.youtube.com%2Fembed%2F'+videos[i].video+'&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21"  scrolling="no" frameborder="0" allowTransparency="true"></iframe>'))        
    } 
    $('#videos ul li').filter(':gt(2)').hide();
}