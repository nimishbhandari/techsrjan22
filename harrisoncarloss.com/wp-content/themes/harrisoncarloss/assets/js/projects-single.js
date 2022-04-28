$(document).ready(function () {
    // Animated Percentage page
    var percentAnimated = false;

    $(window).on("scroll load", function () {
        distFromTop = $(".landing-banner").height() - 100;
        if ($(window).scrollTop() > distFromTop) {
            $("body").addClass("inverted");
        } else {
            $("body").removeClass("inverted");
        }

        if ($(".percent-columns").length) {
            distFromBottom =
                $(".percent-columns").offset().top -
                $(window).scrollTop() -
                $(window).height() +
                200;

            if (distFromBottom <= 0 && !percentAnimated) {
                percentAnimated = true;
                $("[data-variable]").each(function () {
                    var endValue = $(this).data("variable");

                    var startValue = {
                        start: 0,
                    };

                    anime({
                        targets: startValue,
                        start: endValue,
                        round: 1,
                        easing: "linear",
                        duration: "2000",
                        update: () => {
                            $(this).html(startValue.start);
                        },
                    });
                });
            }
        }
    });
});
