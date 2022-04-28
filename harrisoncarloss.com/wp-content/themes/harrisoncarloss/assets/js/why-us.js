jQuery(document).ready(function ($) {
    class LineDrawing {
        constructor(section) {
            this.section = section;

            this.paths = $(this.section).find(".draw");
            this.path = this.paths.get()[0];
            this.pathLength = this.path.getTotalLength();
            this.percentage = 0;

            this.animatables = $(this.section).find("[data-animate]");

            this.init();
        }

        init() {
            $(window).scroll(() => {
                if ($(window).width() > 992) {
                    this.draw();
                } else {
                    this.drawMobile();
                }
                this.animate();
            });

            this.animatables.each((index, element) => {
                if (
                    $(element).data("animate-type") == "stroke" ||
                    $(element).data("animate-type") == null
                ) {
                    let length = element.getTotalLength();

                    $(element).css("strokeDasharray", `${length} ${length}`);
                    $(element).css("strokeDashoffset", length);
                }
            });

            this.paths.each((index, element) => {
                // Add a dasharray the total length of the path
                $(element).css(
                    "strokeDasharray",
                    `${this.pathLength} ${this.pathLength}`
                );

                // Offset the dashes by the path length (so they're hidden initially)
                $(element).css("strokeDashoffset", this.pathLength);
            });
        }

        draw() {
            let windowBottom = $(window).scrollTop() + $(window).height();

            let elementTop = $(this.section).offset().top;

            this.percentage =
                (windowBottom - elementTop - $(this.section).height() * 0.4) /
                $(this.section).height();

            // avoid negative values and values greater than 1
            this.percentage = Math.min(Math.max(0, this.percentage), 1);

            // offset dash by percentage scrolled in the section
            let drawLength = this.pathLength * this.percentage;

            this.paths.each((index, element) => {
                $(element).css(
                    "strokeDashoffset",
                    this.pathLength - drawLength
                );
                $(element).css(
                    "strokeDasharray",
                    `${this.pathLength} ${this.pathLength}`
                );
            });
        }

        drawMobile() {
            let windowBottom = $(window).scrollTop() + $(window).height();

            if (!$(this.section).find(".svg-mobile").length) return;
            let elementTop = $(this.section).find(".svg-mobile").offset().top;

            this.percentage =
                (windowBottom - elementTop - $(window).height() * 0.5) /
                $(this.section).find(".svg-mobile").height();

            // avoid negative values and values greater than 1
            this.percentage = Math.min(Math.max(0, this.percentage), 1);

            // offset dash by percentage scrolled in the section
            let drawLength = this.pathLength * this.percentage;

            this.paths.each((index, element) => {
                $(element).css(
                    "strokeDashoffset",
                    this.pathLength - drawLength
                );
                $(element).css(
                    "strokeDasharray",
                    `${this.pathLength} ${this.pathLength}`
                );
            });
        }

        animate() {
            this.animatables.each((index, element) => {
                let triggerDist = $(element).data("animate") / 100;
                let animationSpeed = $(element).data("speed")
                    ? $(element).data("speed")
                    : 1500;

                let animationType = $(element).data("animate-type")
                    ? $(element).data("animate-type")
                    : "stroke";

                if (
                    this.percentage > triggerDist &&
                    !$(element).hasClass("animated")
                ) {
                    $(element).addClass("animated");
                    if (animationType == "stroke") {
                        anime({
                            targets: element,
                            strokeDashoffset: [
                                $(element).css("stroke-dashoffset"),
                                0,
                            ],
                            easing: "linear",
                            duration: animationSpeed,
                        });
                    } else if (animationType == "fill") {
                        anime({
                            targets: element,
                            fill: [
                                "rgba(195, 163, 104, 0)",
                                "rgba(195, 163, 104, 1)",
                            ],
                            easing: "linear",
                            duration: animationSpeed,
                        });
                    }
                } else if (
                    this.percentage < triggerDist &&
                    $(element).hasClass("animated")
                ) {
                    $(element).removeClass("animated");
                    if (animationType == "stroke") {
                        anime({
                            targets: element,
                            strokeDashoffset: [
                                $(element).css("stroke-dashoffset"),
                                anime.setDashoffset,
                            ],
                            easing: "linear",
                            duration: animationSpeed,
                        });
                    } else if (animationType == "fill") {
                        anime({
                            targets: element,
                            fill: [
                                "rgba(195, 163, 104, 1)",
                                "rgba(195, 163, 104, 0)",
                            ],
                            easing: "linear",
                            duration: animationSpeed,
                        });
                    }
                }
            });
        }
    }

    class yearUpdate {
        constructor(section) {
            this.section = section;

            this.holder = $(this.section).find(".logo-holder");
            this.year = $(this.holder).find(".year");

            this.yearObj = {
                year: $(this.year).first().text(),
            };

            this.currentYear = new Date().getFullYear();

            var self = this;

            this.animation = anime({
                targets: self.yearObj,
                year: self.currentYear,
                easing: "linear",
                round: 1,
                autoplay: false,
                update: function () {
                    $(self.year).html(self.yearObj.year);
                },
            });

            this.init();
        }

        init() {
            $(window).scroll(() => {
                this.update();
                this.animate();
            });
        }

        update() {
            let windowBottom = $(window).scrollTop() + $(window).height();

            let elementTop = $(this.section).offset().top;

            this.percentage =
                (windowBottom - elementTop - $(window).height() * 0.5) /
                ($(this.section).height() - 200);

            // avoid negative values and values greater than 1
            this.percentage = Math.min(Math.max(0, this.percentage), 1);
        }

        animate() {
            this.animation.seek(this.percentage * this.animation.duration);
        }
    }

    $(".story-section, .values, .scroll-svg").each(function () {
        new LineDrawing($(this).get()[0]);
    });

    $(".timeline").each(function () {
        new yearUpdate($(this).get()[0]);
    });

    const targetYear = 1972;
    let yearAnimate = {
        year: new Date().getFullYear(),
    };
    tl = anime
        .timeline()
        .add({
            targets: yearAnimate,
            year: targetYear,
            easing: "easeInOutCubic",
            duration: 5000,
            round: 1,
            update: function () {
                $(".year-content").html(yearAnimate.year);
            },
        })
        .add(
            {
                targets: ".why-us .why-landing .content *",
                easing: "easeInOutCubic",
                opacity: [0, 1],
                delay: anime.stagger(500),
            },
            "-=4000"
        )
        .add(
            {
                targets: ".why-landing .discover-more--new",
                easing: "easeInOutCubic",
                opacity: [0, 1],
                complete: function () {
                    $("body").removeClass("hide-overflow");
                },
            },
            "-=3200"
        )
        .add(
            {
                targets: ".why-us .why-landing .landing__arrow",
                easing: "easeInOutCubic",
                opacity: [0, 1],
            },
            "-=2700"
        );
});
