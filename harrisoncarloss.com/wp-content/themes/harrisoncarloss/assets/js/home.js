jQuery(document).ready(function ($) {
    renderCustom = function (swiper, current, total) {
        current = current < 10 ? "0" + current : current;
        total = total < 10 ? "0" + total : total;

        return `<span class="swiper-pagination-current">${current}</span> / <span class="swiper-pagination-total">${total}</span>`;
    };

    renderCustomHome = function (swiper, current, total) {
        current = current < 10 ? "0" + current : current;
        total = total < 10 ? "0" + total : total;

        return `<span class="swiper-pagination-current">${current}</span> <span class="fraction-line"></span> <span class="swiper-pagination-total">${total}</span>`;
    };
    
    class LogoSlider {
        constructor(el) {
            this.DOM = {
                el: el,
            };
            this.slideshow = new Swiper(this.DOM.el, {
                slidesPerView: 3,
                nested: true,
                grid: {
                    rows: 4,
                    fill: "row",
                },
                spaceBetween: 10,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    0: {
                        spaceBetween: 30,
                    },
                    480: {
                        spaceBetween: 10,
                    },
                },
            });
        }
    }

    class TestimonialSlider {
        constructor(el) {
            this.DOM = {
                el: el,
            };
            this.slideshow = new Swiper(this.DOM.el, {
                autoHeight: false,
                spaceBetween: 30,
                nested: true,
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction",
                    renderCustom: renderCustom,
                },
                autoplay: {
                    delay: 7500,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                effect: "creative",
                creativeEffect: {
                    prev: {
                        opacity: 0,
                    },
                    next: {
                        opacity: 0,
                    },
                },
            });
        }
    }

    class BlogSlider {
        constructor(el) {
            this.DOM = {
                el: el,
            };
            this.slideshow = new Swiper(this.DOM.el, {
                slidesPerView: "auto",
                freeMode: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });

            this.text = $(this.DOM.el).find(".bg-text").first();

            this.init();
        }

        init() {
            this.calculateText();
        }

        calculateText() {
            this.text.css(
                "transform",
                "translateX(" + this.slideshow.getTranslate() / 1.4 + "px)"
            );
            requestAnimationFrame(() => {
                this.calculateText();
            });
        }
    }


    class Circle {
        constructor(el) {
            this.DOM = {
                el: el,
            };

            this.canvas = this.DOM.el;
            this.context = this.canvas.getContext("2d");
            this.x = this.canvas.width / 2;
            this.y = this.canvas.height / 2;
            this.radius = 23;
            this.endPercent = 100;
            this.curPerc = 0;
            this.circ = Math.PI * 2;
            this.quart = Math.PI / 2;

            this.context.lineWidth = 1;
            this.context.strokeStyle = "#c3a368";

            this.dir = "forwards";

            this.initEvents();
        }

        initEvents() {
            this.DOM.el.addEventListener("mouseenter", () => {
                this.dir = "forwards";
                this.animate(this.curPerc);
            });
            this.DOM.el.addEventListener("mouseleave", () => {
                this.dir = "reverse";
                this.animate(this.curPerc);
            });
        }

        animate(current) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.beginPath();
            this.context.arc(
                this.x,
                this.y,
                this.radius,
                -this.quart,
                this.circ * current - this.quart,
                false
            );
            this.context.stroke();

            if (this.dir == "forwards") {
                if (this.curPerc < this.endPercent) {
                    this.curPerc += 5;
                    requestAnimationFrame(() => {
                        this.animate(this.curPerc / 100, this.dir);
                    });
                }
            } else if (this.dir == "reverse") {
                if (this.curPerc > 0) {
                    this.curPerc -= 5;
                    requestAnimationFrame(() => {
                        this.animate(this.curPerc / 100, this.dir);
                    });
                }
            }
        }
    }

    
    $: blogSliderDesktop = new BlogSlider(
        document.querySelector(".blog-slide__slider--desktop")
    );
    $: blogSliderMobile = new BlogSlider(
        document.querySelector(".blog-slide__slider--mobile")
    );
    $: logoSlider = new LogoSlider(
        document.querySelector(".clients__logos")
    );
    $: testimonialSlider = new TestimonialSlider(
        document.querySelector(".clients__testimonials")
    );

    class HomeSlider {
        constructor(el) {
            this.DOM = {
                el: el,
            };

            this.sliderOptions = {
                loop: false,
                speed: 500,
                mousewheel: {
                    sensitivity: 0.1,
                    thresholdDelta: 20,
                },
                keyboard: true,
                direction: "vertical",
                preloadImages: true,
                updateOnImagesReady: true,
                parallax: true,
                lazy: true,
                simulateTouch: false,

                pagination: {
                    el: ".homeswiper.swiper-pagination",
                    type: "custom",
                    renderCustom: renderCustomHome,
                },

                navigation: {
                    nextEl: ".homeswiper.swiper-button-next",
                    prevEl: ".homeswiper.swiper-button-prev",
                },

                effect: "creative",
                creativeEffect: {
                    prev: {
                        translate: [0, "-100%", 0],
                        scale: 0.8,
                        opacity: 0,
                    },
                    next: {
                        translate: [0, "100%", 0],
                        scale: 0.8,
                        opacity: 0,
                    },
                },
            };

            // Set the slideshow

            if ($(window).width() > 992) this.init();
            else this.animateLanding();
        }
        init() {
            this.slideshow = new Swiper(this.DOM.el, this.sliderOptions);

            this.animate();

            this.slideshow.on("slideChangeTransitionStart", (swiper) => {
                const slide = $(
                    `.homepage-slider [data-slide="${swiper.activeIndex}"]`
                );

                slide.css("opacity", 0);

                $("body").removeClass("inverted");
                $("body").removeClass("inverted-half");
                if (slide.hasClass("swiper-white")) {
                    $("body").addClass("inverted");
                    $(".homepage-slider").css("background-color", "#fff");
                } else if (slide.hasClass("swiper-secondary")) {
                    $(".homepage-slider").css(
                        "background-color",
                        "var(--secondary-color)"
                    );
                } else {
                    $(".homepage-slider").removeAttr("style");
                }

                if (slide.hasClass("swiper-white-half")) {
                    $("body").removeClass("inverted");
                    $("body").addClass("inverted-half");
                }
            });

            this.slideshow.on("slideChangeTransitionEnd", (swiper) => {
                $(".clients__background").addClass("clients__background--full");

                $(`.homepage-slider [data-slide="${swiper.realIndex}"]`).css(
                    "opacity",
                    "1"
                );
                $(window).trigger("resize");
                this.animate();
            });

            this.slideshow.on("slideNextTransitionStart", (swiper) => {
                $("#logo").removeClass("animate animate-reverse");
                $("#logo").addClass("animate");

                let timeout = setTimeout(() => {
                    $("#logo").removeClass("animate animate-reverse");
                }, 992);
            });

            this.slideshow.on("slidePrevTransitionStart", (swiper) => {
                $("#logo").removeClass("animate animate-reverse");
                $("#logo").addClass("animate-reverse");

                let timeout = setTimeout(() => {
                    $("#logo").removeClass("animate animate-reverse");
                }, 992);
            });
        }
        animate() {
            logoSlider.slideshow.autoplay.stop();

            switch (this.slideshow.activeIndex) {
                case 0:
                    this.animateLanding();
                    break;

                case 1:
                    var tl = anime.timeline({
                        easing: "easeOutExpo",
                        complete: function () {
                            $(window).trigger("resize");
                        },
                    });

                    tl.add(
                        {
                            targets: ".text-video__background",
                            opacity: [0, 1],
                            scale: [0.9, 1],
                        },
                        0
                    )
                        .add(
                            {
                                targets: ".text-video__text > *",
                                translateY: [100, 0],
                                opacity: [0, 1],
                                delay: anime.stagger(100),
                            },
                            400
                        )
                        .add(
                            {
                                targets: ".text-video__video > *",
                                scale: [0.8, 1],
                                opacity: [0, 1],
                                delay: anime.stagger(100),
                            },
                            200
                        );
                    break;

                case 2:
                    var tl = anime.timeline({
                        easing: "easeOutExpo",
                        complete: function () {
                            $(window).trigger("resize");
                        },
                    });

                    tl.add({
                        targets: ".services-columns",
                        opacity: [0, 1],
                    });
                    break;

                case 3:
                    testimonialSlider.slideshow.autoplay.start();
                    logoSlider.slideshow.autoplay.start();

                    var tl = anime.timeline({
                        easing: "easeOutExpo",
                        complete: function () {
                            $(window).trigger("resize");
                        },
                    });

                    $(".clients__background").removeClass(
                        "clients__background--full"
                    );

                    tl.add({
                        targets: ".clients__list > *",
                        translateY: [100, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                    })
                        .add(
                            {
                                targets: ".clients__logos > *",
                                scale: [0.8, 1],
                                opacity: [0, 1],
                                delay: anime.stagger(100),
                            },
                            200
                        )
                        .add(
                            {
                                targets: ".clients__testimonials",
                                scale: [0.8, 1],
                                opacity: [0, 1],
                                delay: anime.stagger(100),
                            },
                            "-=1000"
                        )
                        .add(
                            {
                                targets: ".clients__testimonials > *",
                                scale: [0.8, 1],
                                opacity: [0, 1],
                                delay: anime.stagger(100),
                            },
                            "-=500"
                        );
                    break;

                case 4:
                    var tl = anime.timeline({
                        easing: "easeOutExpo",
                    });

                    tl.add({
                        targets: ".projects-slide .item-holder",
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                    });
                    break;

                case 5:
                    var tl = anime.timeline({
                        easing: "easeOutExpo",
                    });

                    anime({
                        targets: ".blog-slide .bg-text",
                        opacity: [0, 0.05],
                    });

                    tl.add({
                        targets: ".blog-slide .text-holder",
                        translateX: ["100%", "0"],
                        opacity: [0, 1],
                    })
                        .add(
                            {
                                targets: ".blog-slide .text-holder > *",
                                translateY: ["20px", "0"],
                                opacity: [0, 1],
                                delay: anime.stagger(50),
                            },
                            "-=500"
                        )
                        .add(
                            {
                                targets: ".blog-slide .post-holder",
                                opacity: [0, 1],
                                delay: anime.stagger(100),
                            },
                            "-=1000"
                        );
                    break;

                case 6:
                    var tl = anime.timeline({
                        easing: "easeOutExpo",
                    });

                    tl.add({
                        targets: ".sbi_item",
                        translateY: ["50px", "0"],
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                    }).add(
                        {
                            targets: ".footer-slide .footer__section",
                            translateY: ["50px", "0"],
                            opacity: [0, 1],
                            delay: anime.stagger(300),
                        },
                        "-=1000"
                    );
                    break;

                default:
                    break;
            }
        }
        animateLanding() {
            var tl = anime.timeline({
                easing: "easeOutExpo",
                complete: function () {
                    $(window).trigger("resize");
                },
            });

            tl.add(
                {
                    targets:
                        ".landing__image, .landing__video, .landing__video--mobile",
                    opacity: [0, 1],
                    scale: [0.9, 1],
                },
                0
            )
                .add(
                    {
                        targets: ".landing__content > *",
                        translateY: [100, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                    },
                    400
                )
                .add(
                    {
                        targets: ".landing .particles-js-canvas-el",
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                    },
                    200
                );
        }
    }

    
    $: homeSlider = new HomeSlider(
        document.querySelector(".homepage-slider")
    );

    $(window).resize(function () {
        if ($(window).width() < 992) {
            if (homeSlider.slideshow) {
                homeSlider.slideshow.destroy(true, true);
            }
        } else if ($(window).width() >= 992) {
            if (typeof homeSlider.slideshow === "undefined") {
                homeSlider.init();
            } else if (homeSlider.slideshow?.destroyed) {
                homeSlider.init();
            }
        }
    });


    $(".clients__testimonials__footer .arrow canvas").each(function () {
        new Circle($(this).get()[0]);
    });

    class ProjectsSlider {
        constructor(el) {
            this.DOM = {
                el: el,
            };

            this.slideshow = new Swiper(this.DOM.el, {
                freeMode: true,
                slidesPerView: "auto",
                parallax: true,
                perspective: false,
                pagination: {
                    el: ".swiper-pagination",
                    type: "custom",
                    renderCustom,
                },
            });

            this.line = $(this.DOM.el).find(".bg-line").first();
            this.text = $(this.DOM.el).find(".bg-text").first();

            this.init();
        }

        init() {
            this.calculateLine();
        }

        calculateLine() {
            this.line.css(
                "transform",
                "translateX(" + this.slideshow.getTranslate() * -1 + "px)"
            );
            this.text.css(
                "transform",
                "translateX(" +
                    (this.slideshow.getTranslate() * -1) / 1.4 +
                    "px)"
            );
            requestAnimationFrame(() => {
                this.calculateLine();
            });
        }
    }

    const projectsSlider = new ProjectsSlider($(".projects-slide").get()[0]);

    $(".blog-slide .arrows .arrow canvas").each(function () {
        new Circle($(this).get()[0]);
    });

    $(".blog-slide .post-holder").hover(function () {
        $(".blog-slide .post-holder").removeClass("hover");

        $(this).addClass("hover");
    });
});
