
$( document ).ready(function() {
		if(!$('body').hasClass('mobile')){
			
			var items =  $('.slide');
			var total_items = items.length;
			var current_item = 0;
			var last_item = 0;
			var trans_speed = 300;
			var border = 50;
			var gallery = $('.gallery.full');
			var controls = $('#controls');
			var win = $(window);
			var win_w = win.width();
			var details = $('.details-holder');

			var slide_show;

	
			
			controls.hide();
			
			if(hide_controls == 0){
				controls.delay(trans_speed / 2).fadeIn(trans_speed);
			}

			$(items).each(function(index) {
			   var $this = $(this)
			   $this.addClass('item-' + index).hide();
				$this.attr('rel', index);
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
			}

	
			function fadeItems(){
				if(!$('body').hasClass('mobile')){
					if(last_item != current_item){
						$(' .item-' + current_item).fadeIn(trans_speed);
						$(' .item-' + last_item).fadeOut(trans_speed);
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

			$('#controls .item-last').click(function(){
				lastItem();
				clearInterval(slide_show);
				return false;
			});


			$(document).keydown(function(e) {
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
				$('.image-count').text(count);
			}

			$('#controls .item-next').click(function(){
				nextItem();
				clearInterval(slide_show);
				return false;
			});	

			$(window).resize(function(){
				resizeStuff();
			});

			function resizeStuff(){
				win_w = win.width();

			}

			$('.item-0').imagesLoaded(function(){

				$('.item-0').fadeIn(trans_speed);
				resizeStuff();

				if(autoplay == 1 && win_w > 1080){
					slide_show = setInterval(nextItem, 4000);
				}
			});
			

		}
	}
}

});
