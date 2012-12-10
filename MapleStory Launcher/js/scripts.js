function loadEvents(){
	$.getJSON('publisher_hero_banner.js', function(d) {
        var slideUL  = $('#m-events-slide'),
			indexDIV = $('#m-events-controls'),
			slideLI, 
			slideCount = Math.min(d.length),
			slideHeight = 229,
			currentSlide = 0,
			timer;
		/* function inside loadEvents for closure and minification */
		function updateSlides(){
			slideUL.stop().animate({top:-slideHeight * currentSlide}, 300);
			indexDIV.children('a').removeClass('active').eq(currentSlide).addClass('active');
		}
		function nextSlide(){
			currentSlide = (currentSlide + 1) % slideCount;
			updateSlides();
			window.clearTimeout(timer);
			timer = window.setTimeout(nextSlide, 5000);
		}
		function buttonClick(e){
			e.preventDefault();
			currentSlide = $(this).attr('data-slide');
			updateSlides();
			window.clearTimeout(timer);
			timer = window.setTimeout(nextSlide, 10000);
		}
        for (var i = 0; i < slideCount; i++) {
			/* setup slides */
			slideLI = $('<li>').append(
				$('<a>').attr({href:d[i].href}).append(
					$('<img>').attr({src:d[i].imgSrc,alt:d[i].imgAlt})
				)
			).appendTo(slideUL);
			/* setup buttons */
			slideLI = $('<a>').attr({href:'#', 'data-slide':i}).appendTo(indexDIV).click(buttonClick);
        }
		updateSlides();
		timer = window.setTimeout(nextSlide, 5000);
    });
}
function loadRanking(){
	$.getJSON('publisher_overall.js', function(d) {
		//alert(d[1].Type)
	var avatarIMG = $('#m-ranks-avatar-img'),
		petIMG = $('#m-ranks-avatar-pet'),
		rankPARENT = $('#m-ranks-list'),
		rankUL = $('<ul>'),
		rankLI, 
		fieldClasses = ['number', 'name'],
		fieldInput = ['Rank', 'CharacterName'],
		i, j;
		function listItemHover(){
			avatarIMG.attr('src', $(this).attr('data-avatar'));
			petIMG.attr('src', $(this).attr('data-pet'));
		}
		for (i = 0; i < 5; i++) {
			rankLI = $('<li>');
			for (j = 0; j< 2; j++){
				rankLI.append($('<span>').addClass(fieldClasses[j]).text(d[i][fieldInput[j]]));
			}
			rankLI.bind('mouseenter', listItemHover);//hover state to change avatar and pet
			rankLI.attr({'data-avatar':d[i].CharacterLook,'data-pet':d[i].PetLook});//save the avatar and pet images 
			rankUL.append(rankLI);
		}
		rankPARENT.append(rankUL);		
		avatarIMG.attr('src', $('#m-ranks-list ul li:first').attr('data-avatar'));//load the first person you see on the ranking list
		petIMG.attr('src', $('#m-ranks-list ul li:first').attr('data-pet'));			
	})
}

function infiniteCarousel(){
  var width= 87,
	  speed= 3000,
	  itemEls= '#m-carousel li',
	  popupEl= '#m-carousel-popup',
	  minItemsToRun= 4,
	  isDisabled = ($(itemEls).length < minItemsToRun),
	  goingLeft = true,
	  $itemEls = $(itemEls),
	  $popupEl = $(popupEl),
	  t;
	  if (isDisabled) {
		  //$(leftBtn + ', ' + rightBtn).addClass('disabled');// disabled, since there are no left or right buttons
	  }
	  function hidePopup() {
		  $popupEl.hide();
		  if (!isDisabled) {
			  startMove();
		  }
	  }
	  function startMove() {
		  $itemEls = $(itemEls);
		  var firstLi = $itemEls.eq(0);
		  var percent = 1 + (parseInt(firstLi.css('margin-left')) / width);
		  if (goingLeft) {
			  firstLi.stop().animate({ 'margin-left': -width }, speed * percent, 'linear', function () {
				  firstLi.appendTo(firstLi.parent()).css('margin-left', 0);
				  startMove();
			  });
		  } else {
			  percent = 1 - percent;
			  firstLi.stop().animate({ 'margin-left': 0 }, speed * percent, 'linear', function () {
				  $itemEls.eq($itemEls.length - 1).prependTo(firstLi.parent()).css('margin-left', -width);
				  startMove();
			  });
		  }
	  }
	  function stopMove(hoverLi) {
		  var first = $itemEls.eq(0),
		  positionX = 32 + Math.min(557, Math.max(0, 46 + parseInt(first.css('margin-left')) + width * ($itemEls.index(hoverLi))));
		  first.stop();
		  $popupEl.children('.name').html(hoverLi.attr('data-name'));
		  $popupEl.children('.nx').html('(' + hoverLi.attr('data-nx') + ')');
		  $popupEl.children('.desc').html(hoverLi.attr('data-desc'));
		  $popupEl.show().css({ 'left': positionX });
	  }
	  $itemEls.hover(function () {
		  clearTimeout(t);
		  stopMove($(this));
	  }, function () {
		  t = setTimeout(hidePopup, 50);
	  });
	  $popupEl.hover(function () {
		  clearTimeout(t);
	  }, function () {
		  t = setTimeout(hidePopup, 50);
	  });
	  hidePopup();
};
function makeCashShopPage(){
	var i,
		j,
		len,
		el;	
	/* make infinite carousel */
	el = $('#m-carousel ul');
    for (i = 0, len = shopInfiniteItems.length; i < len; i++)	{
		el.append($('<li>')
			.append($('<img>').attr('src', shopInfiniteItems[i].thumb))
			.attr('data-nx', shopInfiniteItems[i].nx)
			.attr('data-name', shopInfiniteItems[i].name)
			.attr('data-desc', shopInfiniteItems[i].desc));
	}
	infiniteCarousel();
}
