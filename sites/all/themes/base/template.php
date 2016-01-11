<?

/** 
 * @file
 * template.php for Gallery Base theme.
 * 
 * Implements preprocess and hook alter functions in this file.
 */
 
 
/**
 * Preprocess functions for page.tpl.php.
 */
function base_preprocess_page(&$vars){

}
 

/**
 * Preprocess functions for node.tpl.php.
 */
 
function base_preprocess_node(&$vars){
	$node = $vars['node'];
	$options = array('absolute' => TRUE);
	$nid = $vars['vid']; // Node ID
	$url = url('node/' . $nid, $options);
	
	$vars['theme_hook_suggestions'][] = 'node__' . $vars['view_mode'];
	$vars['theme_hook_suggestions'][] = 'node__' . $vars['type'] . '__' . $vars['view_mode'];


	// GENERAL VARS ====================================================
	$vars['body'] = render($vars['content']['body']);
	$vars['created'] = format_date($vars['created'], 'custom', "n/j/y");
	$vars['sections'] = render($vars['content']['field_section']);
	$vars['tags'] =  render($vars['content']['field_tags']);
	$vars['service_links'] = render($vars['content']['service_links']);
	$vars['video'] = render($vars['content']['field_video_url']);
	
	if($vars['view_mode'] == 'teaser'){
		$vars['title'] = l(html_entity_decode($vars['title']), $url, array('html' => TRUE));

		$vars['cover_image'] = render($vars['content']['field_cover_image']);

		if($vars['type'] == 'video'){
			$vars['cover_image'] = render($vars['content']['field_video_url']);
		}
	}

	// ARTICLE ====================================================
	if($vars['type'] == 'project'){
		
		$vars['cover'] = render($vars['content']['field_cover']);
		$vars['post_date'] = $vars['created'];
		$vars['tags'] =  render($vars['content']['field_tags']);
		$vars['short'] = render($vars['content']['field_short_description']);
		$vars['other_images'] = render($vars['content']['other_images']);

		if($vars['view_mode'] == 'teaser'){
			$vars['title'] = l($vars['title'], $url, array('html'=>TRUE));
		}
	}

	// ARTICLE ====================================================
	if($vars['type'] == 'article'){
		
		$vars['cover_image'] = render($vars['content']['field_cover_image']);
		$vars['post_date'] = $vars['created'];
		$vars['tags'] =  render($vars['content']['field_tags']);
		$vars['summary'] = render($vars['content']['body']);
		$vars['service_links'] =  render($vars['content']['service_links']);
		$vars['comment_count'] = l('Comments ' . $vars['comment_count'], $url . '#comments');

		if($vars['view_mode'] == 'teaser'){
			//$vars['title'] = l($vars['title'], $url);
			$vars['cover_image'] = l($vars['cover_image'], $url, array('html'=>TRUE));
			$read_more = l(' — read more', $url);
			$summary_text = render($vars['content']['body']);
			$vars['summary'] = $summary_text . '  ' . $read_more;
		}

		//kpr($vars);
	}
	
}

// Renders image with a given image style
function render_image($img, $style){
	$uri = $img['uri'];
	$title = $img['title'];
  	$alt = $img['alt'];
  	$iw = $img['width'];
  	$ih = $img['height'];
  	
  	$image_style = array(
  		'style_name' => $style, 
  		'path' => $uri,
  		'alt' => $alt,
  		 
  		'attributes' => array(
  			'data-width' => $iw, 
  			'data-height' => $ih,
  			'data-title' => $title,
  		),
  	);

  	return theme('image_style', $image_style);
};





