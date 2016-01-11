<?php //print //kpr($form); ?>
<div class="form-holder clearfix">
	<div class="image-preview">
		
		<?php print render($form['preview']); ?>
	</div>
	<div class="image-details form-group">
		<?php print render($form['group_image_details']['filename']); ?>
		<?php print render($form['group_image_details']['media_title']); ?>
		<?php print render($form['group_image_details']['field_file_image_alt_text']); ?>
	</div>
	<div class="actions">
		<?php print render($form['actions']); ?>
	</div> 
</div>
<div class="form-hidden">
	<?php print drupal_render_children($form); ?>
</div>