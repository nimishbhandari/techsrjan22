jQuery(document).ready(function ($) {
  $(".landing-slider-ul").slick({
    dots: true,
    arrows: false,
    scroll: true,
    infinite: false,
    vertical: true,
    cssEase: "ease-in-out",
    autoplaySpeed: 4500,
  });

  function getSlideNumber(currentSlide) {
    let NumberToShow;
    NumberToShow = parseInt(currentSlide + 1);
    if (NumberToShow === 1) {
      return "One";
    } else if (NumberToShow === 2) {
      return "Two";
    } else if (NumberToShow === 3) {
      return "Three";
    } else if (NumberToShow === 4) {
      return "Four";
    } else if (NumberToShow === 5) {
      return "Five";
    } else if (NumberToShow === 6) {
      return "Six";
    } else if (NumberToShow === 7) {
      return "Seven";
    }
  }

  $(".landing-slider-ul").on("init", function (event, slick) {
    $(".bg-slideno .number").text(getSlideNumber(slick.currentSlide));
    $(".bg-slideno").removeClass("hidden");
  });

  $(".slick-dots li").click(function () {
    $(".bg-slideno").addClass("hidden");
  });

  $(".landing-slider-ul").on(
    "afterChange",
    function (event, slick, currentSlide) {
      $(".bg-slideno .number").text(getSlideNumber(slick.currentSlide));
      setTimeout(function () {
        $(".bg-slideno").removeClass("hidden");
      }, 1000);
    }
  );

  $(".next-slide").click(function () {
    $(".studio-slider").slick("slickNext");
  });
  $(".steps-next-slide").click(function () {
    $(".landing-testimonial").slick("slickNext");
  });

  jQuery(document).ready(function ($) {
    $(".scroll-hint").css("display", "none");
  });
});
