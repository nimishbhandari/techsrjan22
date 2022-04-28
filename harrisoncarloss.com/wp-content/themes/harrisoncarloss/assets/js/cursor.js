class HoverButton {
    constructor(el) {
        this.el = el;
        this.hover = false;
        this.calculatePosition();
        this.attachEventsListener();
    }

    attachEventsListener() {
        window.addEventListener("mousemove", (e) => this.onMouseMove(e));
        window.addEventListener("resize", (e) => this.calculatePosition(e));
        window.addEventListener("mousewheel", (e) => this.calculatePosition(e));
        window.addEventListener("scroll", (e) => this.calculatePosition(e));
    }

    calculatePosition() {
        const box = this.el.getBoundingClientRect();
        this.x = box.left + box.width * 0.5;
        this.y = box.top + box.height * 0.5;
        this.width = box.width;
        this.height = box.height;
    }

    onMouseMove(e) {
        let hover = false;
        let hoverArea = this.hover ? 0.7 : 0.5;
        let x = e.clientX - this.x;
        let y = e.clientY - this.y;
        let distance = Math.sqrt(x * x + y * y);
        if (distance < this.width * hoverArea) {
            hover = true;
            if (!this.hover) {
                this.hover = true;
            }
            this.onHover(e.clientX, e.clientY);
        }

        if (!hover && this.hover) {
            this.onLeave();
            this.hover = false;
        }
    }

    onHover(x, y) {
        anime({
            targets: this.el,
            translateX: (x - this.x) * 0.4,
            translateY: (y - this.y) * 0.4,
            scale: 1.15,
            duration: 150,
            easing: "easeOutCubic",
        });
        this.el.style.zIndex = 10;
    }
    onLeave() {
        anime({
            targets: this.el,
            translateX: 0,
            translateY: 0,
            easing: "easeOutElastic",
            scale: 1,
        });
        this.el.style.zIndex = 1;
    }
}

jQuery(document).ready(function ($) {
    $("#gravity-cursor, #gravity-cursor .cursor").unbind(
        "mouseenter mouseleave"
    );
    // On hover, assign required classes
    $(".expand-cursor").hover(function () {
        $("body").toggleClass("expanded-cursor");
    });
    $(".video-cursor").hover(function () {
        $("body").toggleClass("video-cursor");
    });
    $(".shrink-cursor").hover(function () {
        $("body").toggleClass("shrunken-cursor");
    });

    $(".to-be-pulled").each(function () {
        new HoverButton($(this).get()[0]);
    });

    $(document).on("pointermove", function (e) {
        anime({
            targets: "#gravity-cursor",
            left: e.clientX,
            top: e.clientY,
            duration: 150,
            easing: "easeOutCubic",
        });
    });
});
