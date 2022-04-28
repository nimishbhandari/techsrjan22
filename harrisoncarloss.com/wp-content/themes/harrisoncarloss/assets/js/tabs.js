jQuery(document).ready(function($) {
	setTimeout(function() {
		$(".tab0").addClass("is-active");
	}, 800);
	$(".tab-title").on("click touchend", function() {
		let tab = $(this).data("slug");
		$(".is-active").removeClass("is-active");
		$("." + tab).addClass("is-active");
	});
});
