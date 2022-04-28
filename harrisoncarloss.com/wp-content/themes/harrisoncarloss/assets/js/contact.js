jQuery(document).ready(function ($) {
    $("input").iCheck({
        checkboxClass: "icheckbox_square",
        radioClass: "iradio_square",
        increaseArea: "20%", // optional
    });

    $(".getintouch").click(function () {
        $("html, body").animate(
            { scrollTop: $(".contactform").offset().top },
            500
        );
    });

    $(".goback").click(function () {
        $("body").removeClass("inverted");
        $(".contactform").removeClass("is-active");
        $(".map").removeClass("is-active");
        $("header").removeClass("has-bg");
    });

    $(".location").fadeIn("slow");
});
