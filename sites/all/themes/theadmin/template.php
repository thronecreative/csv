<?

/** 
 * @file
 * template.php for THE Admin theme.
 * 
 * Implements preprocess and hook alter functions in this file.
 */


/**
 * Preprocess functions for page.tpl.php.
 */
function theadmin_preprocess_page(&$vars){
	$node = menu_get_object();
	if (isset($node->nid) && $node->type == 'media_gallery') {
    $node_title = $node->title;

    $vars['title'] = '<span>edit: </span>' . $node_title;
  }	
}


 /**
 * Preprocess functions for node.tpl.php.
 */

function theadmin_preprocess_node(&$vars){
	$node = $vars['node'];
	$url = substr($vars['node_url'], 5);
	
	// Add general theme suggestions for all content types and view modes
	$vars['theme_hook_suggestions'][] = 'node__' . $vars['type'] . '__' . $vars['view_mode'];
	$vars['nid'] = $vars['node']->nid;
	// IMAGE GALLERY ====================================================
	if($vars['type'] == 'media_gallery'){

		drupal_set_title(t('welcome to your backend.'));
	
		if((isset($vars['user']->roles[1]) && $vars['user']->roles[1]) || $vars['view_mode'] == 'gallery_preview'){
			//$vars['images'] = render($vars['content']['media_gallery_file']);
			$images = array();

			for($i = 0; $i < count($vars['media_gallery_file']); $i++){
				$uri = $vars['media_gallery_file'][$i]['uri'];
				$alt = $vars['media_gallery_file'][$i]['alt'];
				$title = $vars['media_gallery_file'][$i]['title'];
				$images[] = render_image($uri, $style = 'gallery_large', $alt);
			}

			$vars['images'] = theme_item_list(array('items' => $images, 'title' => null,'type' => 'ul', 'attributes' => array()));

			$vars['theme_hook_suggestions'][] = 'node__' . $vars['type'] . '__preview';

			drupal_add_js(path_to_theme() . '/js/init_gallery.js');
		}else{
			$vars['add_media'] = render($vars['content']['add_media_link']);
			$vars['images'] = render($vars['content']['media_gallery_file']);
		}
		//kpr($vars);
	}

  if($vars['type'] == 'image_gallery'){
    $images = array();

    for($i = 0; $i < count($vars['field_images']); $i++){
      $uri = $vars['field_images'][$i]['uri'];
      $alt = $vars['field_images'][$i]['alt'];
      $images[] = render_image($uri, $style = 'gallery_large', $alt);
    }
  }

 // kpr($vars);
}






function theadmin_theme() {
  return array(
    'file_entity_edit' => array(
      'arguments' => array('form' => NULL),
      'template' => 'templates/file--entity--edit',
      'render element' => 'form'
    ),

    'video_node_form' => array(
      'arguments' => array('form' => NULL),
      'template' => 'templates/video--edit',
      'render element' => 'form'
    ),

    'image_gallery_node_form' => array(
      'arguments' => array('form' => NULL),
      'template' => 'templates/gallery--edit',
      'render element' => 'form'
    ),

    'menu_overview_form' => array(
      'arguments' => array('form' => NULL),
      'template' => 'templates/menu--edit',
      'render element' => 'form'
    ),

    'menu_edit_item' => array(
      'arguments' => array('form' => NULL),
      'template' => 'templates/menu--item--edit',
      'render element' => 'form'
    ),

    'article_node_form' => array(
      'arguments' => array('form' => NULL),
      'template' => 'templates/news--node--form',
      'render element' => 'form'
    ),

    'page_node_form' => array(
      'arguments' => array('form' => NULL),
      'template' => 'templates/page--node--form',
      'render element' => 'form'
    ),
  );
}

 


function theadmin_form_alter(&$form, &$form_state, $form_id) {
  
  if ($form_id == 'user_login') {
    
   	$form['name']['#description'] = false;
   	$form['pass']['#description'] = false;

   	$form['name']['#attributes']['placeholder'] = t('username');
   	$form['pass']['#attributes']['placeholder'] = t('password');

   	$form['forgot_password'] = array(
  			'#markup' => '<a href="/user/password" class="text-btn">Oops, I forgot my password!</a>',
  			'#weight' => 1000
  		);

   	drupal_set_title(t('Welcome to your backend.'));

  }

  if ($form_id == 'user_pass') {
    
   	$form['name']['#description'] = false;
   	$form['name']['#attributes']['placeholder'] = t('email');

    $form['forgot_password'] = array(
        '#markup' => '<a href="/user" class="text-btn">Nope, I remembered it.</a>',
        '#weight' => 1000
      );

   	drupal_set_title(t('Did you forget somehting?'));

  }

  if ($form_id == 'menu_edit_item') {
    
   	$form['link_title']['#description'] = false;
   	$form['link_path']['#description'] = false;
   	$form['enabled']['#description'] = false;
   	$form['expanded'] = false;
   	$form['parent']['#description'] = false;
   	$form['weight'] = false;

   	//kpr($form);

   	drupal_set_title(t('Edit Link'));

  }

  if ($form_id == 'file_entity_edit') {
    unset($form['media_description']);
    unset($form['field_file_image_title_text']);
    unset($form['field_license']);
    unset($form['destination']);
    unset($form['user']);

    $form['preview']['#weight'] = -10000;
   	$form['filename']['#title'] = t('Filename');
    $form['replace_upload']['#description'] = false;

   // kpr($form);

  }

  if ($form_id == 'media_gallery_node_form') {
    $form['menu']['#group'] = false;
    unset($form['menu']['link']['weight']);
   // kpr($form);
  }

  if ($form_id == 'menu_overview_form') {
    drupal_set_title(t('Edit Main Menu'));
  }

  if ($form_id == 'news_node_form') {
    drupal_set_title(t('Add News'));
  }

  if ($form_id == 'user_profile_form') {
    unset($form['timezone']);
    unset($form['account']['pass']['#description']);
    //
  }

  if ($form_id == 'page_node_form') {
    drupal_set_title(t('edit: page'));
    unset($form['field_page_image']['und'][0]['#description']);
    unset($form['field_page_image']['und'][0]['#title']);
    
  }

  //dpm($form);

  
} 



