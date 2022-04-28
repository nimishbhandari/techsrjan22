jQuery(document).ready(function ($) {
    $(window).scroll(function () {
        window.requestAnimationFrame(function () {
            // var windowHeight = $(window).height();
            var scrolled = $(window).scrollTop();
            var scrollMultiplier = 0.4;
            var rotateMultiplier = 5;
            // windowHeight *= scrollMultiplier;
            $("li.fragment").each(function () {
                var speed = $(this).data("speed");
                if (speed > 0) {
                    scrollMultiplier = scrollMultiplier - speed;
                } else {
                    scrollMultiplier = scrollMultiplier - 0.03;
                }
                rotateMultiplier = rotateMultiplier + 1;
                $(this).css({
                    transform:
                        "translateY(" +
                        ((scrolled * scrollMultiplier) / 2 - 120) +
                        "px)",
                });
            });
            $("li.fragment:first-child").css({
                opacity: "0." + scrolled * 2 + " ",
            });
        });
    });

    // tabs
    var lastPos = 0;

    $(".services-tab-content .text-section").fadeOut();
    changeTab($(".services-tab-title").first().data("slug"), true);

    $(".services-tab-title").on("click touchend", function () {
        changeTab($(this).data("slug"));
    });

    $(".services-tab-title").on("click touchend", function (e) {
        e.preventDefault();
        return false;
    });

    function changeTab(tab, isFirst = false) {
        let pageURL = window.location.href;

        pageURL = pageURL.substring(
            0,
            pageURL.substring(0, pageURL.lastIndexOf("../../index.html")).lastIndexOf("../../index.html") + 1
        );

        let parts = window.location.href.split("../../index.html");

        // If on a child page, parts will be equal to 7, so we only want to add to the modified URL on this.
        if (parts.length == 7) {
            // If coming from page load, we want to change the tab to the currently selected in the URL
            if (isFirst) {
                tab = parts[5];
                setTimeout(() => {
                    $("html, body").animate({
                        scrollTop: $("#services-tabs").offset().top - 150,
                    });
                }, 500);
            }
            window.history.replaceState(
                { path: `${pageURL}${tab}` },
                "",
                `${pageURL}${tab}/`
            );
        } else if (parts.length == 6) {
            if (!isFirst) {
                window.history.replaceState(
                    { path: `${window.location.href}${tab}` },
                    "",
                    `${window.location.href}${tab}/`
                );
            }
        }

        $(`.services-tab-title`).removeClass("is-active");

        $(`.services-tab-title[data-slug="${tab}"]`).addClass("is-active");
        $(`.text-section[data-slug="${tab}"]`).fadeIn();

        $(`.services-tab-content .text-section[data-slug!="${tab}"]`)
            .fadeOut("fast")
            .promise()
            .done(function () {
                $(`.text-section[data-slug="${tab}"]`).fadeIn("fast");
            });
    }

    let percentAnimated = false;

    $(window).scroll(function () {
        if ($(".stats").length) {
            distFromBottom =
                $(".stats").offset().top -
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
                            $(this).html(
                                startValue.start
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            );
                        },
                    });
                });
            }
        }
    });

    $("#scroll-services").click(function () {
        $("html, body").animate({
            scrollTop: $(".services-overview").offset().top,
        });
    });
});
