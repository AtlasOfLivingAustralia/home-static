"use strict";

// to compile (and watch): npx babel -w scripts/scripts.js  --out-dir public/scripts/ --presets=@babel/preset-env --source-maps --out-file-extension .compiled.js

jQuery(document).ready(function ($) {
  /* ALA scripts 
  ========================================================================== */

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  /**
   * Display login/logout buttons (ES6)
   */
  var alaJSAuthCookieName = 'ALA-Auth-Test';
  var alaJSAuthCookieValue = readCookie(alaJSAuthCookieName);
  // console.log('Cookie '+alaJSAuthCookieName+' cookie has value '+alaJSAuthCookieValue);
  if (alaJSAuthCookieValue != null) {
    $('.ala-auth-buttons-logged-in').removeClass("d-none");
    $('.ala-auth-buttons-logged-out').addClass("d-none");
  } else {
    $('.ala-auth-buttons-logged-in').addClass("d-none");
    $('.ala-auth-buttons-logged-out').removeClass("d-none");
  }

  /**
   * Mobile (off-canvas) menu
   */
  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.site').toggleClass('offcanvas-open');
  });

  /**
   * Tooltips
   */
  $('[data-toggle="tooltip"]').tooltip();
  if ($('#anchorList').length) {
    $('body').scrollspy({
      target: '#anchorList'
    });
  }

  // filter handling for a /dir/ OR /indexordefault.page
  function filterPath(string) {
    return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
  }
  var locationPath = filterPath(location.pathname);
  $('a[href*="#"]').not('[data-toggle]').each(function () {
    var thisPath = filterPath(this.pathname) || locationPath;
    var hash = this.hash;
    if ($("#" + hash.replace(/#/, '')).length) {
      if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
        var $target = $(hash),
          target = this.hash;
        if (target) {
          $(this).click(function (event) {
            event.preventDefault();
            $('html, body').animate({
              scrollTop: $target.offset().top
            }, 1000, function () {
              location.hash = target;
              $target.focus();
              if ($target.is(":focus")) {
                //checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); //Adding tabindex for elements not focusable
                $target.focus(); //Setting focus
              }
            });
          });
        }
      }
    }
  });

  //Collapse tabs if opened on mobile
  var collapseTabs = function collapseTabs() {
    if ($(window).outerWidth() < 768) {
      $('.tab-box').find('[aria-expanded=true]').click();
    }
  };
  collapseTabs();

  /* Transit-supplied scripts:
  ========================================================================== */

  /* Set VW VH without horizontal scrollbar
  ========================================================================== */

  function setVwVh() {
    var vw = document.documentElement.clientWidth / 100;
    document.documentElement.style.setProperty("--vw", "".concat(vw, "px"));
    var vh = document.documentElement.clientHeight / 100;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
  }
  window.addEventListener("resize", function () {
    setVwVh();
  });
  setVwVh();

  /* Invasive species slides
  ========================================================================== */

  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  $(".hub-invasive__species-container").on("init", function () {
    $(window).on("resize scroll", function () {
      if ($(".hub-invasive").isInViewport() && !$(".hub-invasive__species-container .slick-list").is(":focus")) {
        $(".hub-invasive__species-container .slick-list").attr("tabindex", 0).get(0).focus({
          preventScroll: true
        });
      } else if (!$(".hub-invasive").isInViewport() && $(".hub-invasive__species-container .slick-list").is(":focus")) {
        $(".hub-invasive__species-container .slick-list").blur();
      }
    });
  });
  $(".hub-invasive__species-container").slick({
    dots: false,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
      breakpoint: 769,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 601,
      settings: {
        arrows: false,
        slidesToShow: 1
      }
    }]
  });

  /* ALA tools tab
  ========================================================================== */

  $(document).on("click", ".hub-tools__tab:not(.hub-tools__tab--active)", function (e) {
    var currentTab = e.currentTarget;
    //console.log('currentTab:' + currentTab);
    var tool = $(currentTab).data("tool");
    //console.log('tool (currentTab data):' + tool);
    //console.log('About to deactivate previous tab.');
    $(".hub-tools__tab--active").removeClass("hub-tools__tab--active");
    //console.log('About to deactivate previous content pane');
    $(".hub-tools__content--active").removeClass("hub-tools__content--active").fadeOut(200, function () {
      //console.log('About to activate tab: '+ tool);
      $(".hub-tools__tab[data-tool='".concat(tool, "']")).addClass("hub-tools__tab--active");
      //console.log('About to activate content pane: ' + tool);
      //console.log('Click on tab: '+ tool);
      $(".hub-tools__content[data-tool='".concat(tool, "']")).addClass("hub-tools__content--active").fadeIn(200);
    });
  });

  /* Sponsors
  ========================================================================== */

  $(document).on("mouseover", ".hub-sponsors__logo:not(.hub-sponsors__logo--disabled)", function (e) {
    var newSponsor = $(e.currentTarget).data("sponsor");
    //console.log('newSponsor:' + newSponsor);
    var currentSponsor = $(".hub-sponsors__content-text-container--active").data("sponsor");
    //console.log('currentSponsor:' + currentSponsor);

    if (newSponsor !== currentSponsor) {
      //console.log('newSponsor !== currentSponsor');
      $(".hub-sponsors__content-text-container--active").removeClass("hub-sponsors__content-text-container--active").fadeOut(200, function () {
        $(".hub-sponsors__content-text-container[data-sponsor='".concat(newSponsor, "']")).addClass("hub-sponsors__content-text-container--active").fadeIn(200);
        //console.log('activating newSponsor content');
      });
    }
  });
});
//# sourceMappingURL=scripts.compiled.js.map