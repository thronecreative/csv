Drupal.behaviors.intro_gallery = {
	attach: function (context, settings) {
		(function ($) {
 			
 			var images = Drupal.settings.intro_images;
 			var controls = $('#bg-images .controls span');
 			var bs = $.backstretch(images, {duration: 3000, fade: 1000});
 			var i = 0;

 			

 			$(window).on("backstretch.before", function (e, instance, index) {
			  i = index;
			  fadeControls();
			});

			

			controls.click(function(){
				i = $(this).data('index');
				bs.pause();
				bs.show(i);
				fadeControls();
			});

			function fadeControls(){
				controls.removeClass('active');
				$('.controls span[data-index=' + i + ']').addClass('active');
			}

			fadeControls();

			jQuery(document).keydown(function(e) {
			    switch(e.which) {
			        case 37: // left
			        bs.pause();
			        bs.prev();
			        break;

			        case 38: // up
			        break;

			        case 39: // right
				        bs.pause();
				        bs.next();
			        break;

			        case 40: // down
			        	//fadeImage();
			        break;

			        default: return; // exit this handler for other keys
			    }
			    e.preventDefault(); // prevent the default action (scroll / move caret)
			});


		}(jQuery));
	}	
}