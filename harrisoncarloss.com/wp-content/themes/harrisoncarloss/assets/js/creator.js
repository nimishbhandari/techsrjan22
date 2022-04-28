jQuery(document).ready(function ($) {
    if (window.location.hash == "#enquiry") {
        openCreator();
    }

    $('a[href="#enquiry"]').on("click", function (e) {
        e.preventDefault();
        openCreator();
    });

    function openCreator() {
        $(".creator").addClass("active");
        $(".menu-toggle").addClass("is-active");
        $("html").css("overflow", "hidden");

        // Close menu
        $("body").addClass("creator-is-active");
        $(".sliding-menu").removeClass("is-active");
    }

    function closeCreator() {
        $(".creator").removeClass("active");
        $(".menu-toggle").removeClass("is-active");
        $("html").removeAttr("style");

        // Close menu
        $("body").removeClass("creator-is-active");
        $(".sliding-menu").removeClass("is-active");
    }

    $(".creator__close").click(function (e) {
        closeCreator();
    });

    let application = {
        debug: false,
        fileCount: 0,

        // * Section Listener //
        // We listen for changes to application.section and run the logic in the listener to change the current section
        // This allows us to simply change the value of `application.section` and the code within set section() will run
        sectionInternal: 0,
        sectionListener: function (val) {},
        set section(val) {
            let isValid;
            if (val < this.sectionInternal) {
                isValid = true;
            } else {
                isValid = validateSection(application.section);
            }

            if (!$(`[data-section="${val}"]`).hasClass("disabled")) {
                if (isValid && !(val < 0)) {
                    changeStep(this.sectionInternal, val);
                    this.sectionInternal = val;
                    this.sectionListener(val);
                }
            } else {
                if (this.sectionInternal < val) {
                    this.section = val + 1;
                } else {
                    this.section = val - 1;
                }
            }
        },
        get section() {
            return this.sectionInternal;
        },
        sectionListener: function (listener) {
            this.sectionListener = listener;
        },
    };

    const validator = $("#creator-form").validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            phone: "phoneValidation",
        },
        errorPlacement: function (error, element) {
            if (
                $(element).attr("type") != "radio" ||
                $(element).attr("type") != "checkbox"
            ) {
                error.insertAfter(element);
            }
        },
    });

    $.validator.addMethod(
        "phoneValidation",
        function (value, element) {
            return (
                this.optional(element) ||
                /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(
                    value
                )
            );
        },
        "Please enter a valid phone number"
    );

    application.sectionListener(function (val) {});

    // Validate section
    function validateSection(section = application.section) {
        if (!section) {
            section = application.section;
        }
        let isValid = true;
        let firstInvalid;
        $(
            `[data-section=${section}] input, [data-section=${section}] select`
        ).each(function () {
            if (!validator.element($(this))) {
                isValid = false;
                if (!firstInvalid) {
                    firstInvalid = $(this);
                }
            }
        });

        if (firstInvalid) {
            if ($(window).scrollTop() >= firstInvalid.offset().top - 200) {
                $("html, body").animate(
                    { scrollTop: firstInvalid.offset().top - 200 },
                    500
                );
            }
        }

        if (!isValid) {
            $(`[data-section=${section}]`).addClass("invalid");
        } else {
            $(`[data-section=${section}]`).removeClass("invalid");
        }

        return isValid;
    }

    let totalSteps = $(".creator__steps a").length;

    let progress = (1 / totalSteps) * 100;
    $("#progress-bar-fill").height(progress + "%");

    // This function should not be called manually as it will let you access disabled sections, it's only triggered when the value of application.section is changed
    function changeStep(fadeOut, fadeIn) {
        $(`section[data-section="${fadeOut}"]`).fadeOut(400, function () {
            $(`section[data-section="${fadeIn}"]`).fadeIn();
        });

        $(".creator__steps a").removeClass("active");
        $(`.creator__steps a[data-section="${fadeIn}"]`).addClass("active");

        setTimeout(() => {
            $("#creator-form").scrollTop(0);
        }, 400);

        let totalSteps = $(".creator__steps a").length;

        let progress = ((fadeIn + 1) / totalSteps) * 100;
        $("#progress-bar-fill").height(progress + "%");
    }

    function addFile() {
        if ($(".creator .file-upload").length < 5) {
            application.fileCount++;

            $("#file-list").append(
                `
            <div class="file-upload" data-file="${application.fileCount}">
                <div class="remove" id="remove-file" data-file="${application.fileCount}"></div>
                <label>
                    <input type="file" name="file[${application.fileCount}]" required>
                </label>
            </div>
            `
            );

            if ($(".creator .file-upload").length >= 5) {
                $("#add-file").attr("disabled", true);
            }
        }
    }

    $(document).on("click", "#add-file", addFile);

    $(document).on("click", "#remove-file", function () {
        let file = $(this).data("file");
        $(`.creator .file-upload[data-file="${file}"]`).remove();
        if ($(".creator .file-upload").length < 5) {
            $("#add-file").attr("disabled", false);
        }
    });

    $(".next-step").click(function () {
        application.section++;
    });
    $(".prev-step").click(function () {
        application.section--;
    });

    $(".service__bar a").first().addClass("active");

    $(document).on("mousemove", function (e) {
        if ($(window).width() < 600) {
            $(".tooltip").offset({ left: 25, top: e.pageY });
        } else {
            $(".tooltip").offset({ left: e.pageX + 10, top: e.pageY + 10 });
        }
    });

    $("#creator-form").on("keyup keypress", function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

    $("#creator-form").on("submit", function (e) {
        e.preventDefault();

        isValid = validateSection();

        if (isValid) {
            $(".creator__loader").addClass("active");

            // Serialize all form data into array

            // const form_data = new FormData(this);
            const form_data = new FormData(this);

            form_data.append("action", "creator");

            $.ajax({
                type: "POST",
                url: ajaxSettings.url,
                processData: false,
                contentType: false,
                data: form_data,
                success: function (res) {
                    application.section++;
                    $(".creator__loader").removeClass("active");
                    $(".creator__progress, .creator__steps").fadeOut(300);
                    fireConfetti();
                },
                error: function (err) {
                    console.log(err);
                    $(".creator__loader").removeClass("active");
                },
            });
        }
    });

    function fireConfetti() {
        var count = 200;
        var defaults = {
            origin: { y: 0.7 },
        };

        function fire(particleRatio, opts) {
            confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
            colors: ["#ffffff", "#c3a368"],
        });
        fire(0.2, {
            spread: 60,
            colors: ["#ffffff", "#c3a368"],
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
            colors: ["#ffffff", "#c3a368"],
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
            colors: ["#ffffff", "#c3a368"],
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
            colors: ["#ffffff", "#c3a368"],
        });
    }

    // Used to test validation on all fields
    if (application.debug) {
        $("input, select, textarea").valid();
    } else {
        $(`#application-form section[data-section!="0"]`).css(
            "display",
            "none"
        );
    }
});
