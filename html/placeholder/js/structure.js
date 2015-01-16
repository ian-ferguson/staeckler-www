$(document).ready(function($) {
		$('body').addClass('loading');
		
		var windowHeight = $(window).height();
		
		// init controller
		var controller = new ScrollMagic();

		// assign handler "scene" and add it to Controller
		var scene = new ScrollScene({duration: 100})
						.addTo(controller);
						
		//loop through curtains
		$('.background-wrapper').addClass('fixed').each(function(){
				
				var curtain = $(this);
				var backgroundScene;
				var titleScene;
				
				//set height to window height
				curtain.css('min-height',windowHeight);
				
				//if there is an image with class background-image, remove it and set as curtain background
				var backgroundImg = $('.background-img',this);
				if(backgroundImg.length > 0){
					var imgUrl = backgroundImg.attr('src');
					curtain.css('background-image','url(' + imgUrl + ')')
					backgroundImg.remove();
				}
				
				//make background 'unfix' when container begins to leave screen
				controller.addScene([
						scene,
						backgroundScene = new ScrollScene({
										triggerElement: $(this), duration:500})
										.triggerHook('onLeave')
										.addTo(controller)
										.on("start end", function(e){
											curtain.toggleClass('fixed');})
						]);
				
				//make optional titles scroll
				var pinTitle = $('.pin-title',this);
				
				if (pinTitle.length > 0){
					controller.addScene([
						scene,
						titleScene = new ScrollScene({
										triggerElement: $(this), duration:500})
										.setPin(pinTitle)
										.triggerHook('onLeave')
										.offset(-200)
										.addTo(controller)
						]);
					}
			});
			
		$('body').removeClass('loading');
		
		$(window).resize(function(){
			windowHeight = $(window).height();
			$('.background-wrapper').css('min-height',windowHeight);
		});
	});