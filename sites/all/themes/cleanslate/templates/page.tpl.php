
<header id="header-main">
	<div id="inner">
		<div id="logo"><a href="/">LOGO HERE</a></div>
		
		<nav id="nav-main">
			<div id="inner">
				<?php print render($page['nav_main']); ?>
				<div class="social-icons">
					<a href="http://twitter.com/" class="icon-twitter" target="_blank"></a>
					<a href="http://instagram.com/" class="icon-instagram" target="_blank"></a>
					<a href="http://pinterest" class="icon-pinterest" target="_blank"></a>
				</div> <!-- END .social-icons -->
			</div>
		</nav> <!-- END #nav -->

		<div class="menu-toggle icon-list"></div>
	</div>
</header>  <!-- END header -->

<div id="content-main">
	<div class="inner">
		<?php if(isset($messages)): ?>
			<div id="messages"><?php echo $messages; ?></div>
		<?php endif; ?>

		<?php if(isset($tabs)): ?>
			<div id="tabs"><?php echo render($tabs); ?></div>
		<?php endif; ?>

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
