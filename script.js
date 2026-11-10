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

const langToggles = document.querySelectorAll(".lang-toggle");

function applyLang(lang) {
  const isEn = lang === "en";
  const root = document.documentElement;
  if (isEn) root.dataset.lang = "en";
  else delete root.dataset.lang;
  root.lang = isEn ? "en" : "ko";
  langToggles.forEach((button) => {
    button.setAttribute("aria-pressed", String(isEn));
    button.textContent = isEn ? "KO" : "EN";
    button.setAttribute("aria-label", isEn ? "한국어로 보기" : "Switch to English");
  });
  try {
    localStorage.setItem("portfolio-lang", isEn ? "en" : "ko");
  } catch {
    /* 저장 불가 환경에서는 무시 */
  }
}

if (langToggles.length) {
  let saved = null;
  try {
    saved = localStorage.getItem("portfolio-lang");
  } catch {
    saved = null;
  }
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  applyLang(fromQuery || saved || "ko");

  langToggles.forEach((button) => {
    button.addEventListener("click", () => {
      applyLang(document.documentElement.dataset.lang === "en" ? "ko" : "en");
    });
  });
}

let openedForPrint = [];
window.addEventListener("beforeprint", () => {
  openedForPrint = [...document.querySelectorAll("details:not([open])")];
  openedForPrint.forEach((d) => { d.open = true; });
});
window.addEventListener("afterprint", () => {
  openedForPrint.forEach((d) => { d.open = false; });
  openedForPrint = [];
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }

    button.classList.add("is-copied");
    window.clearTimeout(button._copyTimeout);
    button._copyTimeout = window.setTimeout(() => {
      button.classList.remove("is-copied");
    }, 1600);
  });
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
