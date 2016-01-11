<div id="nav-holder">
	<div id="menu-toggle">
		<div class="icon-menu"></div>
		<div class="icon-cross"></div>
	</div>

	<div id="nav">
		<ul>
			<li><a href="/#about">What we do</a></li>
			<li><a href="/#colonel">The &ldquo;Colonel&rdquo;</a></li>
			<li><a href="/#team">The Team</a></li>
			<li><a href="/#projects">Projects</a></li>
			<li><a href="/#contact" class="special">Contact Us</a></li>
		</ul>

		<div class="divider"></div>

		<div class="social-icons">
			<a href="http://twitter.com/" target="_blank" class="icon-twitter"></a>
			<a href="http://facebook.com/" target="_blank" class="icon-facebook"></a>
			<a href="http://instagram.com/" target="_blank" class="icon-instagram"></a>
		</div>
		<div class="bg"></div>
	</div>

</div>

<div id="content-main">
	<div class="inner">
		

		<?php if(isset($title)): ?>
			<h1 id="page-title"><?php echo $title; ?></h1>
		<?php endif; ?>

		<div id="content">
			<?php print render($page['content']); ?>
		</div>
	</div>
</div>

<footer id="footer-main">
	<div class="inner">
		<div class="footer-left"><?php print render($page['footer_left']); ?></div>
		<div class="footer-main"><?php print render($page['footer_main']); ?></div>
		<div class="footer-right"><?php print render($page['footer_right']); ?></div>		
	</div>

	<div class="copy">
		&copy; <?php echo date('Y') . ' ' . $site_name; ?>
	</div>
</footer>
