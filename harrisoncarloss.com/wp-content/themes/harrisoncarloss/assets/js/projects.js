jQuery(document).ready(function ($) {
  // projects filter
  $("body").removeClass("blog");
  $("body").removeClass("inverted");
  $(".filter-toggle").click(function () {
    $(this).toggleClass("is-active");
    $(".projects-filter").toggleClass("is-active");
  });

  let pull_page = 1;
  $("#project-loader").on("click", function () {
    let jsonFlag = true;
    if (jsonFlag) {
      jsonFlag = false;
      pull_page++;
      $.getJSON(
        "/wp-json/projects/all-posts?page=" + pull_page,
        function (data) {
          if (data.length) {
            var items = [];
            $.each(data, function (index, project) {
              if (!project.acf.featured_image_opacity) {
                project.acf.featured_image_opacity = {
                  value: 0.8,
                };
              }
              let item_string = `<li class="project" data-slug="${project.link}" onclick="location.href='${project.link}'">
                <div class="inner">
                    <div class="text">
                        <h3>${project.acf.project_type.value}</h3>
                        <h1>${project.title}</h1>
                        <a class="discover" href="${project.link}">Discover More</a>
                    </div>
                    <div class="image-wrap">
                        <figure style="background-image: url('${project.acf.featured_image.value.sizes.medium_large}');opacity:${project.acf.featured_image_opacity.value}">
                        </figure>
                    </div>
          
                </div>
            </li>`;
              items.push(item_string);
            });
            if (data.length >= 9) {
              $("li.loader").fadeOut();
              $("#projects-tiles").append(items);
            } else {
              $("#projects-tiles").append(items);
              $("#ajax-no-posts").fadeIn();
              setTimeout(() => {
                $("#project-loader").hide();
              }, 400);
            }
          } else {
            $("#project-loader").hide();
            $("#ajax-no-posts").fadeIn();
          }
        }
      ).done(function (data) {
        if (data.length) {
          jsonFlag = true;
        }
        var to = $(window).scrollTop() + $(window).height() / 2 + 50;
        $("html, body").animate({ scrollTop: to }, 1000);
      });
    }
  });

  $(window).scroll(function () {
    offset = 45;
    if ($(window).width() < 1367) {
      offset += 115;
    }

    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - offset
    ) {
      $(".loading-banner").addClass("active");
    } else {
      $(".loading-banner").removeClass("active");
    }
  });
});
function checkIE() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) {
    return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
  }

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) {
    return true;
  } else {
    return false;
  }
}
