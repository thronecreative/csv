<div class="gallery-full">

	<div class="admin-actions">
		<div class="body">
			<div class="buttons">
				<a href="/media/browser?render=media-popup" class="admin-btn add media-gallery-add launcher">Add Images</a>
				<a href="/node/<?php echo $nid; ?>/gallery-preview" target="_blank" class="admin-btn">Preview Gallery</a>
				<a href="/node/<?php echo $nid; ?>/multiedit" class="admin-btn">Edit Images</a>
				<a href="/node/<?php echo $nid; ?>/edit" class="admin-btn">Gallery Settings</a>
				<a href="/node/<?php echo $nid; ?>/delete" class="admin-btn delete right">Delete Gallery</a>
			</div>
		</div>
	</div>
	<div class="images">
		<a href="#" class="save-order">SAVE ORDER!</a>
		<?php echo $images; ?>

	</div>
</div>