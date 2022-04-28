jQuery(document).ready(function($) {
	$("body").addClass("blog-archive");

	// blog filter
	$(".filter-toggle").click(function() {
		$(this).toggleClass("is-active");
		$(".blog-filter").toggleClass("is-active");
	});

	// blog scrolling
	var lastScrollTop = 0;
	$(window).scroll(function(event) {
		var st = $(this).scrollTop();
		var amount = 2;
		if (st > lastScrollTop) {
			$(".standard-posts .bgtext").animate({ top: "+=" + amount }, amount);
		} else {
			$(".standard-posts .bgtext").animate({ top: "-=" + amount }, amount);
		}
		lastScrollTop = st;
	});
});
