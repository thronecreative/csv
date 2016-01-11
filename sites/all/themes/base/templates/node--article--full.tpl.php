<div class="article full">
	<div class="meta-data">
		<div class="post-date"><?php print $post_date; ?></div>
		<div class="comment-count"><?php echo $comment_count; ?></div>
	</div>

	<div class="body"><?php print $body; ?></div>

	<div class="tags">
		<div class="tags">
			<h2>Tags : </h2>
			<?php print $tags; ?>
		</div>
	</div>

	<div class="share-post">
		<h2>Share this post</h2>
		<?php print $service_links; ?>
	</div>
</div>
