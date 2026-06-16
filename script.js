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


/* TrueFocus: motion 의존성 없이 정적 GitHub Pages용으로 구현 */
const trueFocusContainers = document.querySelectorAll("[data-true-focus]");

trueFocusContainers.forEach((container) => {
  const words = Array.from(container.querySelectorAll(".focus-word"));
  const frame = container.querySelector(".focus-frame");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!words.length || !frame) return;

  const blurAmount = Number(container.dataset.blur || 2.2);
  const animationDuration = Number(container.dataset.duration || 520);
  const pauseDuration = Number(container.dataset.pause || 1500);
  let currentIndex = 0;
  let timer = null;
  let isPointerPaused = false;

  container.style.setProperty("--focus-duration", `${animationDuration}ms`);

  const updateFrame = (index) => {
    const activeWord = words[index];
    if (!activeWord) return;

    words.forEach((word, wordIndex) => {
      const isActive = wordIndex === index;
      word.classList.toggle("is-active", isActive);
      word.style.filter = isActive ? "blur(0px)" : `blur(${blurAmount}px)`;
      word.style.opacity = isActive ? "1" : "0.54";
    });

    const parentRect = container.getBoundingClientRect();
    const activeRect = activeWord.getBoundingClientRect();

    frame.style.width = `${activeRect.width}px`;
    frame.style.height = `${activeRect.height}px`;
    frame.style.transform = `translate3d(${activeRect.left - parentRect.left}px, ${activeRect.top - parentRect.top}px, 0)`;
    frame.classList.add("is-visible");
  };

  const scheduleNext = () => {
    window.clearTimeout(timer);
    if (reduceMotion || isPointerPaused) return;

    timer = window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % words.length;
      updateFrame(currentIndex);
      scheduleNext();
    }, animationDuration + pauseDuration);
  };

  if (reduceMotion) {
    words.forEach((word) => {
      word.style.filter = "none";
      word.style.opacity = "1";
    });
  } else {
    requestAnimationFrame(() => {
      updateFrame(currentIndex);
      scheduleNext();
    });

    words.forEach((word, index) => {
      word.addEventListener("pointerenter", () => {
        isPointerPaused = true;
        window.clearTimeout(timer);
        currentIndex = index;
        updateFrame(currentIndex);
      });
    });

    container.addEventListener("pointerleave", () => {
      isPointerPaused = false;
      scheduleNext();
    });

    window.addEventListener("resize", () => updateFrame(currentIndex));
  }
});

/* TextType: GSAP 의존성 없이 정적 GitHub Pages용으로 구현 */
const textTypeElements = document.querySelectorAll("[data-text-type]");

textTypeElements.forEach((element) => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let texts = [];

  try {
    texts = JSON.parse(element.dataset.texts || "[]");
  } catch {
    texts = [];
  }

  if (!Array.isArray(texts) || texts.length === 0) return;

  const typingSpeed = Number(element.dataset.typingSpeed || 62);
  const deletingSpeed = Number(element.dataset.deletingSpeed || 28);
  const pauseDuration = Number(element.dataset.pause || 1450);
  const initialDelay = Number(element.dataset.initialDelay || 500);

  if (reduceMotion) {
    element.textContent = texts[0];
    return;
  }

  let textIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timeoutId = null;

  const tick = () => {
    const currentText = texts[textIndex];

    if (!deleting) {
      charIndex += 1;
      element.textContent = currentText.slice(0, charIndex);

      if (charIndex >= currentText.length) {
        deleting = true;
        timeoutId = window.setTimeout(tick, pauseDuration);
      } else {
        timeoutId = window.setTimeout(tick, typingSpeed);
      }
      return;
    }

    charIndex -= 1;
    element.textContent = currentText.slice(0, Math.max(0, charIndex));

    if (charIndex <= 0) {
      deleting = false;
      textIndex = (textIndex + 1) % texts.length;
      timeoutId = window.setTimeout(tick, Math.max(300, typingSpeed * 4));
    } else {
      timeoutId = window.setTimeout(tick, deletingSpeed);
    }
  };

  timeoutId = window.setTimeout(tick, initialDelay);

  window.addEventListener("pagehide", () => {
    window.clearTimeout(timeoutId);
  }, { once: true });
});
