Drupal.behaviors.init_gallery = {
	attach: function (context, settings) {
		if(!jQuery('body').hasClass('mobile')){
			
			var items =  jQuery('.gallery.full .images li');
			var total_items = items.length;
			var current_item = 0;
			var last_item = 0;
			var trans_speed = 300;
			var border = 50;
			var gallery = jQuery('.gallery.full');
			var controls = jQuery('#controls');
			var win = jQuery(window);
			var win_w = win.width();
			var details = jQuery('.details-holder');

			var slide_show;

			var settings = Drupal.settings.gallery_settings;
			var autoplay = settings.autoplay;
			var hide_controls = settings.hide_controls;
			var start_thumbs = settings.start_thumbs;

			
			
			controls.hide();
			
			if(hide_controls == 0){
				controls.delay(trans_speed / 2).fadeIn(trans_speed);
			}

			jQuery(items).each(function(index) {
			   var $this = jQuery(this)
			   $this.addClass('item-' + index).hide();
				$this.attr('rel', index);


			});

			jQuery('.image-group img').each(function(index) {
			   var $this = jQuery(this)
			   var wt = $this.parent().data('wt');
			   var w = $this.data('width');
			   var h = $this.data('height');
			   var wp = (w / wt) * 99.5;
			   $this.css('max-width', wp + '%');
			   var captions = $this.siblings('.captions');
			   

			   if(index == 0){
			   	$this.css('margin-right', ((w / wt) / 2) + '%');
			   	// jQuery('.caption.c-left', captions).css('max-width', wp + '%');
			   }else{
			   	$this.css('margin-left', ((w / wt) / 2) + '%');
			   	// jQuery('.caption.c-right', captions).css('max-width', wp + '%');
			   }
			});
			
			// gallery functions
			function nextItem(){
				last_item = current_item;
				current_item++;
				if(current_item == total_items){
					current_item = 0;
				}
				fadeItems();
			}
			
			function lastItem(){
				last_item = current_item;
				current_item--;
				if(current_item == -1){
					current_item = total_items - 1;
				}
				fadeItems();
			}

			function selectItem(index){
				last_item = current_item;
				current_item = index;

				if(current_item == -1){
					current_item = total_items - 1;
				}
				fadeThumbs();
			}

			function fadeThumbs(){
				gallery.fadeOut(300, function(){
					gallery.addClass('is-not-thumb');
					gallery.removeClass('is-thumb');
					resizeStuff();
					items.hide();
					gallery.show();

					jQuery(' .item-' + current_item).fadeIn(trans_speed);
					resizeStuff();
					controls.fadeIn(300);
					setClicks();
				});
			}
			
	
			function fadeItems(){
				if(!jQuery('body').hasClass('mobile')){
					if(last_item != current_item){
						jQuery(' .item-' + current_item).fadeIn(trans_speed);
						jQuery(' .item-' + last_item).fadeOut(trans_speed);
					}			
				}
				resizeStuff();
				setCount();

			}
			
			function fadeImage(){
				gallery.fadeOut(300, function(){
					gallery.removeClass('is-not-thumb');
					gallery.addClass('is-thumb');
					items.removeAttr('style');
					items.show();
					gallery.fadeIn(300);
					controls.fadeOut(300);
					resizeStuff();
					setClicks();
					
				});

			}

			jQuery('#controls .item-last').click(function(){
				lastItem();
				clearInterval(slide_show);
				return false;
			});

			jQuery('#controls .thumbs-btn').click(function(){
				fadeImage();
				clearInterval(slide_show);
				return false;
			});

			function setClicks(){
				jQuery('.gallery.full .images li').unbind('click');
				if(gallery.hasClass('is-thumb')){
					jQuery('.gallery.full.is-thumb .images li').click(function(){
						var rel = jQuery(this).attr('rel');
						selectItem(rel);
						clearInterval(slide_show);
						return false;
					});
				}else{
					jQuery('.gallery.full.is-not-thumb .images li').click(function(){
						nextItem();
						clearInterval(slide_show);
						return false;
					});

				}
			}

			jQuery(document).keydown(function(e) {
			    switch(e.which) {
			        case 37: // left
			        clearInterval(slide_show);
			        lastItem();
			        break;

			        case 38: // up
			        break;

			        case 39: // right
				        clearInterval(slide_show);
				        nextItem();
			        break;

			        case 40: // down
			        	//fadeImage();
			        break;

			        default: return; // exit this handler for other keys
			    }
			    e.preventDefault(); // prevent the default action (scroll / move caret)
			});

			function setCount(){
				var count = (current_item + 1) + ' / ' + total_items;
				jQuery('.image-count').text(count);
			}

			function showDetails(){
				details.fadeIn(trans_speed);
			}

			function hideDetails(){
				details.fadeOut(trans_speed);
			}

			jQuery('#controls .details-btn').click(function(){
				showDetails();
				clearInterval(slide_show);
				return false;
			});

			jQuery('.details-holder .close-btn, .details-holder .overlay').click(function(){
				hideDetails();
				clearInterval(slide_show);
				return false;
			});
			
			jQuery('#controls .item-next').click(function(){
				nextItem();
				clearInterval(slide_show);
				return false;
			});	

			jQuery(window).resize(function(){
				resizeStuff();
			});

			function resizeStuff(){
				win_w = win.width();

				if( win_w > 1080){
					var gh = jQuery('.gallery.full li').height();
					jQuery('.gallery.full li img').each(function(index) {
					   var $this = jQuery(this);
					   var ih = $this.height();
					   var pt = (gh - ih) / 2;
					   $this.css('margin-top', pt);
					});

					jQuery('.image-group').each(function(index) {
					   var wt = 0;
					   jQuery('img', this).each(function(index) {
						   wt = wt + jQuery(this).width();
						});

						jQuery('.captions',  this).css('max-width', wt + 10);
					   
					});

					jQuery('.single-image').each(function(index) {
					   var wt = jQuery('img', this).width();
					  

						jQuery('.captions',  this).css('max-width', wt);
					   
					});
				}else{
					jQuery('.gallery.full li').css('display', 'block !important');
					clearInterval(slide_show);
				}
			}

			jQuery('.first.item-0').imagesLoaded(function(){
				// jQuery('.first.item-0').css('display', 'list-item');
				// jQuery('.first.item-0').animate({'opacity' : 1}, trans_speed);
				jQuery('.first.item-0').fadeIn(trans_speed);
				resizeStuff();

				if(autoplay == 1 && win_w > 1080){
					slide_show = setInterval(nextItem, 4000);
				}
			});
			
			
			if(start_thumbs == 1){
				fadeImage();
				clearInterval(slide_show);
			}

			//resizeStuff();
			setClicks();
			setCount();
		}
	}
}