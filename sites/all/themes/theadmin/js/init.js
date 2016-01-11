Drupal.behaviors.init_admin = {
	attach: function (context, settings) {
		(function ($) {
 			
 			
			// MENU TWEAKS!!!
 			//===================================
 			$('.menu-toggle').click(function(){
				$('#header-container #menu').slideToggle(300);
				return false;
			});

 			$('#block-menu-menu-common-tasks .content > ul > li > span').click(function() {
 				$('#block-menu-menu-common-tasks .content > ul > li > ul').slideUp(300);
 				$(this).next().slideDown(300);
 				$('#block-menu-menu-common-tasks .content > ul > li').removeClass('active-trail');
 				$(this).parent().addClass('active-trail');

 			});


 			// FORMS!!!
 			//===================================

 			$('.form-group.collapsible h2').click(function(){
 				$(this).parent().toggleClass('collapsed');
 			});




 			// MASONRY!!!
 			//===================================
			// var masonry_container = $('.node-image-gallery .field-name-field-other-images');
			
			// masonry_container.imagesLoaded(function(){
			// 	masonry_container.masonry({
			// 	  itemSelector: '.field-item'
			// 	});
			// });


			// SKROLR!!!
 			//===================================
			// if($(window).width() > 500){
	 		//		var s = skrollr.init({
	 		// 		forceHeight: false,
	 		// 	});
	 		// }


		}(jQuery));
	}	
}
