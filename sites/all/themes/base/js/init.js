Drupal.behaviors.init = {
	attach: function (context, settings) {
		(function ($) {

			// GLOBAL VARIABLES!!!
 			//===================================
			var $body = $('body');
 			
 			
			// MENU TWEAKS!!!
 			//===================================
 			$('#menu-toggle, .menu-toggle').click(function(){
				$body.toggleClass('nav-open');
				return false;
			});

			$('a[href*=#]:not([href=#])').click(function() {
				$body.removeClass('nav-open');
		      

		     
		      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		        
		        var target = $(this.hash);
		        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		        if (target.length) {
		          
		          $('html,body').delay(300).animate({
		            scrollTop: target.offset().top
		          }, 1000);
		          return false;
		        }
		      }
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


