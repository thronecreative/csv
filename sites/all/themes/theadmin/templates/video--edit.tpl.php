<div class="form-holder clearfix">
	<?php print render($form['title']); ?>
	<?php print render($form['field_video_url']['und'][0]['video_url']); ?>
	
	<div class="form-group collapsible collapsed">
		<h2 class="icon">Video Description</h2>
		<div class="body">
			<span class="hide-label"><?php print render($form['body']); ?></span>
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