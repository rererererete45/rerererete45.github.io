const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1120) {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});

const timelineItems = document.querySelectorAll(".timeline-item");

if (timelineItems.length) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    timelineItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const timelineObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
    );

    timelineItems.forEach((item) => timelineObserver.observe(item));
  }
}
