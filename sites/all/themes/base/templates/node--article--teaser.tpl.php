<div class="article teaser">
	
	<div class="cover"><?php print $cover_image; ?></div>
	<h2><?php print $title; ?></h2>

	<div class="body">
		<div class="meta-data">
			<div class="post-date"><?php print $created; ?></div>
			<div class="comment-count"><?php echo $comment_count; ?></div>
		</div>
		<div class="summary">
			<?php print $summary; ?>
		</div>
	</div>

	<div class="share-post">
		<?php print $service_links; ?>
	</div>
</div>