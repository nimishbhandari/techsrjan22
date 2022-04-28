jQuery(document).ready(function ($) {
  if ($(".video-background").length) {
    setTimeout(function () {
      $(".video-background").get(0).play();
    }, 1000);
  }
  if ($(".people-info-section").length) {
    var aboutTeam = $(".people-info-section").offset().top,
      $window = $(window);
    $window.scroll(function () {
      if ($window.scrollTop() >= aboutTeam / 2) {
        $(".people-info-section p, .people-info-section h2").addClass(
          "fade-in"
        );
      }
    });
  }

  $(".tabno1").addClass("is-active");
  $(".bio-tabs .tab-titles li").on("click touchend", function (e) {
    var thisClass = $(this).data("slug");
    $(".bio-tabs .tab-titles li").removeClass("is-active");
    $(".bio-tabs .tab-content li").removeClass("is-active");
    $(this).addClass("is-active");
    $("." + thisClass).addClass("is-active");
  });

  if ($("body").hasClass("john-debell")) {
    $(".tabno2").click(function () {
      playDoorbell();
    });
  }
});
