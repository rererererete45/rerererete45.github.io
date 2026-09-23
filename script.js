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
