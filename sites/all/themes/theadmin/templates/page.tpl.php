
<div id="wrap">
	<div id="admin">
		<?php echo render($page['admin']); ?>
	</div>

	<div id="main">
		<div class="inner">


			<?php if(isset($title)): ?>
				<h1 class="page-title"><?php print $title; ?></h1>
			<?php endif; ?>

			<?php if ($messages): ?>
	        <div class="messages-holder">
	          <?php echo render($messages); ?>
	        </div>
	      <?php endif; ?>
			
	     
	      <div id="content">
				<?php echo render($page['content']); ?>
			</div>
		</div>
	</div>

</div>
