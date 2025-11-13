$(document).ready(function () {
  $("#mainSlider").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    nav: true,
    dots: true,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 800,
    responsive: {
      0: {
        nav: false,
      },
      768: {
        nav: true,
      },
    },
  });

  // Breaking News Ticker Carousel (Auto-scrolling)
  $(".breaking-news-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    nav: false,
    dots: false,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 600,
  });

  // Bottom News Carousel Configuration
  $("#bottomNewsCarousel").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    nav: true,
    dots: false,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });

  // Real-time Clock Update
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    $("#currentTime").text(`${hours}:${minutes}:${seconds}`);
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Navigation Active State
  $(".nav-list__link").on("click", function (e) {
    e.preventDefault();
    $(".nav-list__link").removeClass("nav-list__link--active");
    $(this).addClass("nav-list__link--active");
  });

  // Night Mode Toggle
  $(".night-mode-btn").on("click", function () {
    $("body").toggleClass("night-mode");
    const icon = $(this).find("i");
    const text = $(this)
      .contents()
      .filter(function () {
        return this.nodeType === 3;
      })
      .first();

    if ($("body").hasClass("night-mode")) {
      icon.removeClass("fa-moon").addClass("fa-sun");
      text.replaceWith(" Gündüz modu");
      $("body").css("filter", "invert(1) hue-rotate(180deg)");
      $(
        ".news-card__image, .slider-item__image, .bottom-news-item__image, .site-logo"
      ).css("filter", "invert(1) hue-rotate(180deg)");
    } else {
      icon.removeClass("fa-sun").addClass("fa-moon");
      text.replaceWith(" Gece modu");
      $("body").css("filter", "none");
      $(
        ".news-card__image, .slider-item__image, .bottom-news-item__image, .site-logo"
      ).css("filter", "none");
    }
  });

  // Smooth Scroll for News Cards
  $(".news-card")
    .on("mouseenter", function () {
      $(this).css("transform", "translateY(-8px)");
    })
    .on("mouseleave", function () {
      $(this).css("transform", "translateY(0)");
    });

  // Lazy Loading for Images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = "0";
          img.style.transition = "opacity 0.5s";
          setTimeout(() => {
            img.style.opacity = "1";
          }, 100);
          imageObserver.unobserve(img);
        }
      });
    });

    document
      .querySelectorAll(
        ".news-card__image, .slider-item__image, .bottom-news-item__image"
      )
      .forEach((img) => {
        imageObserver.observe(img);
      });
  }
});
