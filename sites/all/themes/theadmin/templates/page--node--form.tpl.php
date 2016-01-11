<div class="form-holder clearfix">
	<?php print render($form['title']); ?>
	<div class="form-group">
		<h2>Page Image</h2>
		<?php print render($form['field_page_image']); ?>
	</div>
	<?php print render($form['body']); ?>
	<?php print render($form['options']['status']); ?>

	<div class="actions">
		<?php print render($form['actions']); ?>
	</div> 
</div>

<div class="form-hidden">
	<?php print drupal_render_children($form); ?>
</div>