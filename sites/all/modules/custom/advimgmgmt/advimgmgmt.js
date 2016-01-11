(function($) {

var attachPlugin = function(context, id, widget_type) {

  var weightClass = '.mvw-weight-delta-order';

  var wrapper = $('#' + id);
  if (widget_type == 'blocks') {
    $('.mvw-group .mvw-group-title .ui-icon', wrapper )
      .not('.ui-icon-processed')
      .addClass("ui-icon-processed")
      .click(function() {
        $(this)
          .toggleClass("ui-icon-minusthick")
          .toggleClass( "ui-icon-plusthick" )
          .parents('.mvw-group:first').find('.mvw-group-content').toggle();
    });
  }

  $(weightClass).hide();

  var updateField =  function (event, ui) {

    var siblings = [];
    if (widget_type == 'tabs') {
      $('.mvw-tabs li a', wrapper).each(function() {
        var sibling = $($(this).attr('href')).get(0);
        siblings.push(sibling)
      })
      var targetElement = $(weightClass, $($('a', ui.item.context).attr('href'))).get(0);
    }
    else {
      $('.mvw-group', wrapper).each(function(){siblings.push(this)})
      var targetElement = $(weightClass, $(ui.item.context)).get(0);
    }
    

    if ($(targetElement).is('select')) {

      // Get a list of acceptable values.
      var values = [];
      $('option', targetElement).each(function () {
        values.push(this.value);
      });

      var maxVal = values[values.length - 1];

      // Populate the values in the siblings.
      $(weightClass, siblings).each(function () {
        // If there are more items than possible values, assign the maximum value to the row.
        if (values.length > 0) {
          this.value = values.shift();
        }
        else {
          this.value = maxVal;
        }
      });
    }
    else {
      // Assume a numeric input field.
      var weight = parseInt($(weightClass, siblings[0]).val(), 10) || 0;
      $(weightClass, siblings).each(function () {
        this.value = weight;
        weight++;
      });
    }

  }

  switch (widget_type) {
    case 'tabs':
      var tabs = wrapper.tabs();
      tabs.find( ".ui-tabs-nav" )
      .sortable({
        axis: "x",
        stop: function() { tabs.tabs( "refresh" ); },
        update: updateField,
        delay: 100
      });
      break;

    case 'accordion':
      wrapper
      .accordion({
        collapsible: true,
        active: false ,
        header: '> div > .mvw-group-title',
      })
      .sortable({
          axis: 'y',
          handle: '.mvw-group-title',
          stop: function( event, ui ) { ui.item.children('.mvw-group-title').triggerHandler('focusout'); },
          update: updateField,
          delay: 100
      });
      break;

    case 'blocks':
	wrapper.multisortable({
        items: ".mvw-group",
		handle: '.Image-Weight,.NormalImage-Weight',
        start: function(e){ 
            $(".ui-multisort-grouped").addClass("dragging");
        } ,
        stop: function(e){
            $(".ui-multisort-grouped").removeClass("dragging");
        }
    });	
    break;
    
  }

}

/**
 * Main behavior for multiple value widget.
 */
Drupal.behaviors.advimgmgmt = {
  attach: function (context, settings) {

    $.each(settings.mvw,function(id, type) {
      attachPlugin(context, id, type);
    })

  }
};




/**
 * Additional JS
 */

$(document).ready(function(){
	
//click on advanceimgmgmt and standard image mgmt
		//set active class
		$('.ADV-Image-MGMT').live('mouseenter',function() {
			$( ".ADV-Image-MGMT" ).removeClass("ACTIVE-FILED");
			$(this).addClass("ACTIVE-FILED");		
		});
		
		//switching tabs
		$( ".AdvanceImageMgmt" ).live( "click", function() {
			$(this).parents( ".ADV-Image-MGMT" ).addClass( "Advance-Image-Widget" ).removeClass( "Normal-Image-Widget" );
			each_functions(); //call each function			
			//cookie function
			var cookiename = $(this).attr("data");
			$.cookie(cookiename, 10);
		});
		
		$( ".standardImageMgmt" ).live( "click", function() {
			$(this).parents( ".ADV-Image-MGMT" ).removeClass( "Advance-Image-Widget" ).addClass( "Normal-Image-Widget" ); //show/hide class
			each_functions(); //call each function
			//cookie function
			var cookiename = $(this).attr("data");
			$.cookie(cookiename, 12);
		});
//EOF:click on advanceimgmgmt and standard image mgmt
	
	
//advance image details form	
function each_functions(){		
		
		//image widget data
		$('.image-widget-data').each(function(){			
			//wrap inner
			if(!$(this).children().hasClass('Imagedata-Sub')){
				$(this).wrapInner('<div class="Imagedata-Sub"></div>');	
			}
			
			//remove button moving
			if(!$(this).parents('.ADV-Image-MGMT').hasClass('Normal-Image-Widget')){
				$(this).find('.IMAGE-ATTRIBUTES').insertBefore($(this).find('span.file'));
				$(this).find('.Remove-Button').appendTo($(this).find('span.remove-button')); //moving
			}else{
				$(this).find('.Remove-Button').insertAfter($(this).find('span.file-size')); //moving
			}
			
			//linktonextmove
			$($(this).find('.form-type-checkbox')).appendTo($(this).find('.LinkTonextimage'));
		});
		
		//adv image MGMT each
		$('.ADV-Image-MGMT').each(function(){
			var lengthofgrp = $(this).find('.mvw-group').length;
			//move addmore button	
			if(!$(this).hasClass('Normal-Image-Widget')){
				$(this).find('.ADD-New-Image').appendTo($(this).find('.Add-Moreimage'));		
			}else{
				$(this).find('.ADD-New-Image').insertAfter($(this).find('.mvw-type-blocks'));
			}
			
			//append Link BG
			var indexofmvcgroup = $(this).find('.mvw-group');
			$(indexofmvcgroup).each(function(index){
				if(!$(this).children('span').hasClass('LINK-Bg')){ 
					if(index+1 < lengthofgrp){
						$(this).append('<span class="LINK-Bg"></span>');
					}
				}
			});
		});
				
		//clone remove button
		$('.mvw-group').each(function(){			
			if(!$(this).parents('.ADV-Image-MGMT').hasClass('Normal-Image-Widget')){
				if(!$(this).find('.Image-Remove').children().hasClass('Remove-Button')){
					$(this).find('.Remove-Button').clone().appendTo($(this).find('.Image-Remove'));//clone
				}				
			}
		});			
}
each_functions();
	 
//cancel button & save button
	$('.Cancel-Button').live("click",function(){
		$('.ui-multisort-grouped .image-widget-data').hide();
		$(this).parents('.mvw-group').removeClass("ui-multisort-grouped");
	});
	$('.save-button').live("click",function(){
		$('.ui-multisort-grouped .image-widget-data').hide();
		$(this).parents('.mvw-group').removeClass("ui-multisort-grouped");
	});
//EOF:advance image details form

//highlight form
	$('.ACTIVE-FILED .Image-Activites').live("click",function(e){//click to highlight			
		 if(e.metaKey || e.ctrlKey || e.shiftKey){
			return true;
		 }else{
			$('.ACTIVE-FILED .mvw-group').removeClass("ui-multisort-grouped");
			$(this).parents('.mvw-group').toggleClass("ui-multisort-grouped");
		}
		
	});
//EOF:highlight form

//onclick edit details
	$('.Edit-Imagedetails').live('click',function(){
		$('.ACTIVE-FILED .mvw-group').removeClass("ui-multisort-grouped");
		$(this).parents('.mvw-group').not('.ui-multisort-grouped').toggleClass("ui-multisort-grouped");
		$('.ui-multisort-grouped .image-widget-data').show();
	});
//EOF:onclick edit details

//Link to image process
	$('.LinkTonextimage .form-checkbox').live('change',function(){
		if($(this).attr('checked')){			
			$(this).parents('.mvw-group').addClass("Comibine-Next");
		}else{
			$(this).parents('.mvw-group').removeClass("Comibine-Next");
		}
		
	});
//EOF:Link to image process

/*******Confrim Box************/
//onclick remove all buttons
$('.ACTIVE-FILED .Removeall-Button a').live("click",function(){
	var the_id = [];
	var count = $('.ACTIVE-FILED .ui-multisort-grouped').length;
	if(count != 0){
		$('.CONFIRM-Box').hide();
		$('.ACTIVE-FILED .CONFIRM-Box').show();	
	}else{
		alert("Please Select the files to Remove");
	}
});

//confirm delete
$('.ACTIVE-FILED .CONFIRM-Box .Removeall-ConfirmButton a').live("click",function(){
		var the_id = [];
		$('.ui-multisort-grouped .FID').each(function(){
			the_id.push($(this).val()); //push selectd image fid's
		});
		var nid = $('.ui-multisort-grouped .FID').attr('nid'); //get nid
		$.ajax({
			type: 'POST',
			url: '/advanceimageremove/'+nid,
			data: {data:the_id},
			success: function(result) {
				window.location.href = window.location.href;
			}
		});
});
//mind changed
$('.ACTIVE-FILED .CONFIRM-Box .Changed-Mind').live("click",function(){
	$('.CONFIRM-Box').hide();
	$('.ACTIVE-FILED .mvw-group').removeClass('ui-multisort-grouped');
});
/*******EOF:Confrim Box************/

//call function by setintervel
setInterval(function(){ //one second
	each_functions();	
}, 1000);

setInterval(function(){ //half second
	//set active class by cookie
	$('.NAVIGATIONS a').each(function(){
		var cookiedata_name = $(this).attr("data");
		var cookiedata_value = $.cookie(cookiedata_name);
		if(cookiedata_value == 12){
			$('#'+cookiedata_name).removeClass( "Advance-Image-Widget" ).addClass( "Normal-Image-Widget" );
		}else{			
			$('#'+cookiedata_name).addClass( "Advance-Image-Widget" ).removeClass( "Normal-Image-Widget" );
		}
	});
}, 200);
//EOF:call function by setintervel

//select all images
$('.SELECT-ALL').live("click",function(){		
	$(this).toggleClass("active");
	if ($(this).hasClass("active")){
		$(this).text("Unselect everything");
		$('.ACTIVE-FILED .mvw-group').addClass("ui-multisort-grouped");
	}
	else{
		$(this).text("Select everything");
		$('.ACTIVE-FILED .mvw-group').removeClass("ui-multisort-grouped");
	}
});

//special class to muti drag
$('.ACTIVE-FILED .mvw-group').live("click",function(ex){
	var totalofselected  = $('.ACTIVE-FILED .ui-multisort-grouped').length;	
	if(totalofselected == 1){//remove class "ReadytoDrag" if one
		$('.ACTIVE-FILED .ui-multisort-grouped').removeClass("ReadyToDrag");
	}else{
		$('.ACTIVE-FILED .ui-multisort-grouped').each(function(){
			$(this).addClass("ReadyToDrag");
		});
	}
});

//remove cookie on submit clicks
$('#edit-actions').live("click",function(){		
	update_weight();//update weight field value
	$('.NAVIGATIONS a').each(function(){
		var cookiedata_name = $(this).attr("data");
		$.removeCookie(cookiedata_name);
	});		
});

//update weight field value
$('body').live("click",function(){	
update_weight();
});

//function for update weight field value
function update_weight(){
	$('.ADV-Image-MGMT').each(function(){
		var indexofmvc = $(this).find('.mvw-group');
		$(indexofmvc).each(function(indexnumber){
			$(this).find('.mvw-weight-delta-order').val(indexnumber);
		});		
	});
}
//END:function for update weight field value



//disalbe sortable for input box
$('.ADV-Image-MGMT input').live('click', function(e) {
    $(this).trigger({
        type: 'mousedown',
        which: 3
    });
});

$('.ADV-Image-MGMT input').live('mousedown', function(e) {
    if(e.which == 3){
        $(this).focus();   
    }
});
//EOF:disalbe sortable for input box

});	

/**
* EOF: Additional JS
*/

})(jQuery);
