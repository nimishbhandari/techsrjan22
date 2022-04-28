jQuery(document).ready(function ($) {
    var rellax = new Rellax(".rellax");

    var rellaxTimeline = new Rellax(".rellax-timeline", {
        center: true,
        round: true,
        vertical: true,
    });

    //pop up open
    // to open pop up just add popup-toggle class to any button
    $(".popup-toggle").on("click", function () {
        openPopup();
    });

    $(".close-btn").on("click", function () {
        closePopup();
    });

    $(".popup-holder .background").on("click", function () {
        closePopup();
    });

    $(".loading-overlay").addClass("hide");

    if (window.location.hash == "#popup") {
        openPopup();
    }

    function openPopup() {
        $(".popup-holder").addClass("popup-open");
        anime({
            easing: "spring(1, 60, 10, 0)",
            targets: ".popup",
            translateY: ["-40%", "-50%"],
        });
    }

    function closePopup() {
        $(".popup-holder").removeClass("popup-open");
        window.location.hash = "";
        history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search
        );
    }

    // checkboxes
    $("input:not(.creator-radio)").iCheck({
        checkboxClass: "icheckbox_square",
        radioClass: "iradio_square",
        increaseArea: "20%", // optional
    });

    function checkOrientation() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            if (window.orientation !== 0) {
                $("body").addClass("is-mobile");
            } else {
                $("body").removeClass("is-mobile");
            }
        }
    }

    window.setInterval(checkOrientation, 100);

    // hide elements in IE
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11) {
        $(".before-load").hide();
        $(".gravity-cursor").hide();
    }

    // Set when the body is loaded
    $("body").addClass("is-loaded");

    // Scrolling hints
    $(".scroll-hint").mouseenter(function () {
        anime({
            duration: 350,
            targets: ".to-scroll-in li",
            translateY: -1,
            delay: anime.stagger(50), // increase delay by 100ms for each elements.
        });
    });
    $(".scroll-hint").mouseleave(function () {
        anime({
            duration: 300,
            targets: ".to-scroll-in li",
            translateY: 100,
            delay: anime.stagger(100), // increase delay by 100ms for each elements.
        });
    });

    // checks if user is at the bottom and hides scroll hint
    $(window).on("scroll", function () {
        if (
            $(this).scrollTop() + $(this).innerHeight() >=
            $(this)[0].scrollHeight
        ) {
            $(".scroll-hint").addClass("hidden");
        } else {
            $(".scroll-hint").removeClass("hidden");
        }
    });

    // If hovers over a video column, start / pause video
    $(".has-video").mouseenter(function () {
        $(this).children("video")[0].play();
    });
    $(".has-video").mouseleave(function () {
        $(this).children("video")[0].pause();
    });

    headerScroll();

    $(window).on("scroll", function () {
        headerScroll();
    });

    function headerScroll() {
        if ($(window).width() < 1024) {
            if ($(this).scrollTop() >= $("header").height()) {
                $("header.has-bg").addClass("active");
            } else {
                $("header.has-bg").removeClass("active");
            }
        }
    }

    $(window).scroll(function () {
        if (
            $(window).scrollTop() + $(window).height() >
            $(document).height() - 100
        ) {
            $(".scroll-hint").stop(true, false).fadeOut();
        } else {
            $(".scroll-hint").stop(true, false).fadeIn();
        }
    });

    ///////////////////////////////
    //*         Modals           //
    ///////////////////////////////
    $(".modal-toggle").click(function () {
        let modal = $(this).data("modal");

        $(`.modal-toggle[data-modal="${modal}"] video`)[0].pause();

        $(`.modal[data-modal="${modal}"]`).addClass("active");
        $(`.modal[data-modal="${modal}"] video`)[0].play();
    });

    $(".modal__background, .modal__close").click(function (e) {
        let modal = $(this).closest(".modal").data("modal");

        $(this).closest(".modal").removeClass("active");
        $(`.modal[data-modal="${modal}"] video`)[0].pause();

        $(`.modal-toggle[data-modal="${modal}"] video`)[0].play();
    });

    if (window.location.hash) {
        $(`.modal[data-modal="${window.location.hash.substr(1)}"]`).addClass(
            "active"
        );
    }

    ///////////////////////////////
    //*           Tabs           //
    ///////////////////////////////

    $(".tabgroup").each(function () {
        let tab = $(this).find(".tab[data-tab]").first().data("tab");
        let tabGroup = $(this).data("tab-group");

        changeTab(tab, tabGroup);
    });

    $(".tab-trigger").click(function () {
        let tab = $(this).data("tab");
        let tabGroup = $(this).closest("[data-tab-group]").data("tab-group");

        if ($(this).hasClass("smooth-tab")) {
            changeTabSmooth(tab, tabGroup);
        } else {
            changeTab(tab, tabGroup);
        }
    });

    function changeTab(tab, tabGroup) {
        $(`[data-tab-group="${tabGroup}"] .tab`).removeClass("active");
        $(`[data-tab-group="${tabGroup}"] .tab[data-tab="${tab}"]`).addClass(
            "active"
        );
    }

    function changeTabSmooth(tab, tabGroup) {
        $(`[data-tab-group="${tabGroup}"] .tab-trigger`).removeClass("active");
        $(
            `[data-tab-group="${tabGroup}"] .tab-trigger[data-tab="${tab}"]`
        ).addClass("active");
        $(
            `[data-tab-group="${tabGroup}"] .tab:not(.tab-trigger):not([data-tab="${tab}"])`
        ).slideUp();
        $(
            `[data-tab-group="${tabGroup}"] .tab:not(.tab-trigger)[data-tab="${tab}"]`
        ).slideDown();
    }

    function animateIn() {
        anime({
            easing: "easeOutBack",
            duration: 350,
            targets: ".navbox nav ul li",
            translateX: [-280, 0],
            opacity: [0, 1],
            delay: anime.stagger(100), // increase delay by 100ms for each elements.
        });
        anime({
            easing: "easeOutBack",
            duration: 350,
            targets: ".sliding-menu .social ul li",
            opacity: [0, 1],
            translateY: [-50, 0],
            delay: anime.stagger(100), // increase delay by 100ms for each elements.
        });
        anime({
            easing: "easeOutBack",
            duration: 350,
            opacity: [0, 1],
            targets: ".navbox .sign-in-link",
            translateX: [-280, 0],
            delay: 800, // increase delay by 100ms for each elements.
            complete: function () {
                window.dispatchEvent(new Event("resize"));
            },
        });
    }

    $(".menu-toggle").on("click", function () {
        if ($("body").hasClass("creator-is-active")) {
            $(".creator").removeClass("active");
            $(".menu-toggle").removeClass("is-active");

            // Close menu
            $("body").removeClass("creator-is-active");
            $(".sliding-menu").removeClass("is-active");
            $("html").removeAttr("style");
        } else {
            $(this).toggleClass("is-active");
            $("body").toggleClass("menu-is-active");
            $(".sliding-menu").toggleClass("is-active");
            if ($("body").hasClass("menu-is-active")) {
                animateIn();
            }
        }
    });
});

$(window).on("load", function () {
    $(".projects-tiles li figure").ripples({
        perturbance: 0.02,
        resolution: 200,
    });
});
