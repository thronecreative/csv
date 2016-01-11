

<div class="form-holder clearfix">
	<div class="admin-actions">
	<div class="body">
		<div class="buttons">
			<a href="/admin/structure/menu/manage/main-menu" class="admin-btn" >Back</a>
		</div>
	</div>
</div>

	<?php print render($form['link_title']); ?>
	<?php print render($form['link_path']); ?>

	<div class="actions">
		<?php print render($form['actions']); ?>
	</div> 
</div>

<div class="form-hidden">
	<?php print drupal_render_children($form); ?>
</div>