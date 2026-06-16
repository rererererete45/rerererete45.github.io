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
    if (window.innerWidth > 780) {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});

const tiltCard = document.querySelector("[data-profile-tilt]");

if (tiltCard && window.innerWidth > 780) {
  const rootStyle = document.documentElement.style;

  const resetTilt = () => {
    rootStyle.setProperty("--profile-rotate-x", "0deg");
    rootStyle.setProperty("--profile-rotate-y", "0deg");
    rootStyle.setProperty("--profile-glow-x", "50%");
    rootStyle.setProperty("--profile-glow-y", "20%");
  };

  tiltCard.addEventListener("pointermove", (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;

    rootStyle.setProperty("--profile-rotate-x", `${rotateY.toFixed(2)}deg`);
    rootStyle.setProperty("--profile-rotate-y", `${rotateX.toFixed(2)}deg`);
    rootStyle.setProperty("--profile-glow-x", `${(px * 100).toFixed(1)}%`);
    rootStyle.setProperty("--profile-glow-y", `${(py * 100).toFixed(1)}%`);
  });

  tiltCard.addEventListener("pointerleave", resetTilt);
  resetTilt();
}
