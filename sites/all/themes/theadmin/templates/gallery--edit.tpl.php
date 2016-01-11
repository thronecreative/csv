<div class="form-holder clearfix">
	<?php print render($form['title']); ?>
	
	<div class="form-group collapsible collapsed">
		<h2 class="icon">Gallery Settings</h2>
		<div class="body">
				<?php print render($form['field_start_with_thumbnails']); ?>
				<?php print render($form['field_autoplay_slideshow']); ?>
				<?php print render($form['field_hide_controls']); ?>
				<?php print render($form['field_cover_image']); ?>
		</div>
	</div>
	
	<div class="form-group">
		<h2>Images</h2>
		<div class="body"><?php print render($form['field_other_images']); ?></div>
	</div>

	<div class="form-group collapsible collapsed">
		<h2 class="icon">Gallery Description</h2>
		<div class="body">
			<span class="hide-label"><?php print render($form['body']); ?></span>
		</div>
	</div>
	
	

	<div class="form-group collapsible collapsed">
		<h2 class="icon">Menu Settings</h2>
		<div class="body">
			<?php print render($form['menu']['enabled']); ?>
			<?php print render($form['menu']['link']['parent']); ?>
		</div>
	</div>

	<div class="form-group collapsible collapsed">
		<h2 class="icon">Publishing Options</h2>
		<div class="body">
		<?php print render($form['options']['status']); ?>
		<?php print render($form['author']['date']); ?>
		</div>
	</div>
	
	

	<div class="actions">
		<?php print render($form['actions']); ?>
	</div> 
</div>

<div class="form-hidden">
	<?php print drupal_render_children($form); ?>
</div>