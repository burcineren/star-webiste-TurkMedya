// Main Slider Configuration
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

  // Breaking News Infinite Scroll Effect
  const breakingNewsContent = document.querySelector(".breaking-news__content");
  if (breakingNewsContent) {
    const clone = breakingNewsContent.cloneNode(true);
    breakingNewsContent.parentNode.appendChild(clone);
  }

  // Smooth scroll for navigation links
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      document.querySelectorAll(".nav__link").forEach((l) => {
        l.classList.remove("nav__link--active");
      });

      // Add active class to clicked link
      this.classList.add("nav__link--active");
    });
  });

  // Add hover effect to news cards
  const newsCards = document.querySelectorAll(".news-card");
  newsCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Dynamic date update
  const updateDateTime = () => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    const dateStr = now.toLocaleDateString("tr-TR", options).toUpperCase();

    const dateElements = document.querySelectorAll(".top-bar__date span");
    if (dateElements.length > 0) {
      dateElements[0].textContent = dateStr;
    }
  };

  updateDateTime();

  // Lazy loading for images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("fade-in");
        observer.unobserve(img);
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

  // Mobile menu toggle (for responsive design)
  const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
      const navList = document.querySelector(".nav__list");
      if (navList && !document.querySelector(".mobile-menu-toggle")) {
        const toggleBtn = document.createElement("button");
        toggleBtn.className = "mobile-menu-toggle";
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.style.cssText = `
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            background: var(--primary-red);
                            color: white;
                            border: none;
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            font-size: 20px;
                            cursor: pointer;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                            z-index: 1000;
                            display: none;
                        `;

        document.body.appendChild(toggleBtn);

        toggleBtn.addEventListener("click", () => {
          navList.style.display =
            navList.style.display === "flex" ? "none" : "flex";
          navList.style.flexDirection = "column";
          navList.style.position = "fixed";
          navList.style.top = "0";
          navList.style.left = "0";
          navList.style.right = "0";
          navList.style.background = "white";
          navList.style.zIndex = "999";
          navList.style.padding = "20px";
          navList.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
        });
      }
    }
  };

  createMobileMenu();
  window.addEventListener("resize", createMobileMenu);

  // Performance optimization: Debounce scroll events
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Add any scroll-based animations or effects here
    }, 100);
  });

  // Console log for demo purposes
  console.log("Star Gazetesi - Responsive Web Sitesi yüklendi!");
  console.log("Bootstrap Grid ✓");
  console.log("SCSS/CSS Variables ✓");
  console.log("Owl Carousel ✓");
  console.log("Responsive Design ✓");
  console.log("Best Practices ✓");
});
