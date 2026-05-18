const slides = Array.from(document.querySelectorAll(".hero-bg"));
const heroIndicatorDots = Array.from(document.querySelectorAll("[data-hero-indicator]"));
const sectionIndicatorDots = Array.from(document.querySelectorAll("[data-section-indicator]"));
const sectionNextButtons = Array.from(document.querySelectorAll("[data-section-next]"));
const heroSection = document.querySelector(".hero-section");
let currentSlide = 0;
let slideTimer;
let lastManualSlideAt = 0;
let touchStartX = 0;
let touchStartY = 0;

function normalizeIndex(index) {
  return (index + slides.length) % slides.length;
}

function updateIndicator(nextIndex) {
  heroIndicatorDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === nextIndex);
    dot.setAttribute("aria-pressed", dotIndex === nextIndex ? "true" : "false");
  });
}

function showSlide(nextIndex) {
  if (!slides.length) return;

  const normalizedIndex = normalizeIndex(nextIndex);
  slides[currentSlide].classList.remove("is-active");
  slides[normalizedIndex].classList.add("is-active");
  currentSlide = normalizedIndex;
  updateIndicator(normalizedIndex);
}

function restartAutoSlide() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => {
    showSlide(currentSlide + 1);
  }, 10000);
}

function showManualSlide(direction) {
  const now = Date.now();
  if (now - lastManualSlideAt < 650) return;

  lastManualSlideAt = now;
  showSlide(currentSlide + direction);
  restartAutoSlide();
}

if (slides.length > 1) {
  restartAutoSlide();

  heroSection.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 24) return;

      event.preventDefault();
      showManualSlide(event.deltaX > 0 ? 1 : -1);
    },
    { passive: false }
  );

  heroSection.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  });

  heroSection.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 48) return;
    showManualSlide(deltaX < 0 ? 1 : -1);
  });

  heroIndicatorDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      lastManualSlideAt = Date.now();
      showSlide(index);
      restartAutoSlide();
    });
  });
}

document.querySelectorAll("[data-market-carousel]").forEach((carousel) => {
  const cards = Array.from(carousel.querySelectorAll("[data-market-card]"));
  const prevButton = carousel.querySelector("[data-market-prev]");
  const nextButton = carousel.querySelector("[data-market-next]");
  const status = document.createElement("div");
  let activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));
  let marketTouchStartX = 0;
  let marketTouchStartY = 0;

  if (activeIndex < 0) activeIndex = 0;
  status.className = "carousel-status";
  carousel.appendChild(status);

  function renderMarketCards() {
    cards.forEach((card, index) => {
      const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
      const nextIndex = (activeIndex + 1) % cards.length;

      card.classList.toggle("is-active", index === activeIndex);
      card.classList.toggle("is-prev", index === prevIndex);
      card.classList.toggle("is-next", index === nextIndex);
    });

    status.textContent = `${activeIndex + 1} / ${cards.length}`;
  }

  prevButton.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    renderMarketCards();
  });

  nextButton.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % cards.length;
    renderMarketCards();
  });

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (index === activeIndex) return;
      activeIndex = index;
      renderMarketCards();
    });
  });

  carousel.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    marketTouchStartX = touch.clientX;
    marketTouchStartY = touch.clientY;
  });

  carousel.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - marketTouchStartX;
    const deltaY = touch.clientY - marketTouchStartY;

    if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 44) return;
    activeIndex = deltaX < 0 ? (activeIndex + 1) % cards.length : (activeIndex - 1 + cards.length) % cards.length;
    renderMarketCards();
  });

  renderMarketCards();
});

const snapSections = Array.from(document.querySelectorAll(".snap-page > section"));
const sharedHeader = document.querySelector(".site-header");
const sharedHeaderLogo = sharedHeader?.querySelector(".brand img");
const enableSectionSnap = true;
let snapIndex = 0;
let lastSnapAt = 0;

function setHeaderTheme(theme = "light") {
  if (!sharedHeader) return;

  const isDark = theme === "dark";
  sharedHeader.classList.toggle("is-header-dark", isDark);
  sharedHeader.classList.toggle("is-header-light", !isDark);

  if (!sharedHeaderLogo) return;
  sharedHeaderLogo.src = isDark ? sharedHeaderLogo.dataset.logoDark : sharedHeaderLogo.dataset.logoLight;
}

function updateSnapIndex() {
  const viewportMid = window.scrollY + window.innerHeight / 2;
  const closestIndex = snapSections.reduce((bestIndex, section, index) => {
    const bestDistance = Math.abs(snapSections[bestIndex].offsetTop - viewportMid);
    const distance = Math.abs(section.offsetTop - viewportMid);
    return distance < bestDistance ? index : bestIndex;
  }, 0);

  snapIndex = closestIndex;
  setHeaderTheme(snapSections[snapIndex]?.dataset.headerTheme || "light");
  updateSectionIndicators();
}

function updateSectionIndicators() {
  sectionIndicatorDots.forEach((dot) => {
    const targetIndex = Number(dot.dataset.sectionIndicator);
    const isActive = targetIndex === snapIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function scrollToSection(index) {
  if (!snapSections.length) return;
  const nextIndex = (index + snapSections.length) % snapSections.length;
  snapIndex = nextIndex;
  lastSnapAt = Date.now();
  setHeaderTheme(snapSections[snapIndex]?.dataset.headerTheme || "light");
  updateSectionIndicators();
  snapSections[snapIndex].scrollIntoView({ behavior: "smooth", block: "start" });
}

function getCurrentScrollSection() {
  const scrollTop = window.scrollY;
  const tolerance = 2;

  return snapSections.find((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    return scrollTop >= sectionTop - tolerance && scrollTop < sectionBottom - tolerance;
  });
}

function canScrollWithinCurrentSection(deltaY) {
  const section = getCurrentScrollSection();
  if (!section || section.offsetHeight <= window.innerHeight + 2) return false;

  const sectionTop = section.offsetTop;
  const sectionBottom = sectionTop + section.offsetHeight;
  const scrollTop = window.scrollY;
  const viewportBottom = scrollTop + window.innerHeight;
  const tolerance = 2;

  if (deltaY > 0) return viewportBottom < sectionBottom - tolerance;
  return scrollTop > sectionTop + tolerance;
}

setHeaderTheme(snapSections[0]?.dataset.headerTheme || "dark");
updateSectionIndicators();
window.addEventListener("scroll", updateSnapIndex, { passive: true });

sectionIndicatorDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    scrollToSection(Number(dot.dataset.sectionIndicator));
  });
});

sectionNextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateSnapIndex();
    scrollToSection(snapIndex + 1);
  });
});

if (enableSectionSnap && snapSections.length > 1) {
  window.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 28) return;

    updateSnapIndex();
    if (canScrollWithinCurrentSection(event.deltaY)) return;

    const now = Date.now();
    if (now - lastSnapAt < 780) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    scrollToSection(Math.max(0, Math.min(snapSections.length - 1, snapIndex + (event.deltaY > 0 ? 1 : -1))));
  }, { passive: false });
}

const themeDemo = document.querySelector("[data-theme-demo]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeOptions = Array.from(document.querySelectorAll("[data-theme-option]"));
const themeNames = themeOptions.map((option) => option.dataset.themeOption);
const themeOpacityInput = document.querySelector("[data-theme-opacity]");
const themeOpacityOutput = document.querySelector("[data-theme-opacity-output]");
const themeBgOpacityInput = document.querySelector("[data-theme-bg-opacity]");
const themeBgOpacityOutput = document.querySelector("[data-theme-bg-opacity-output]");

function applyThemeDemo(themeName) {
  if (!themeNames.includes(themeName)) return;

  document.body.classList.remove(...themeNames.map((name) => `theme-${name}`));
  document.body.classList.add(`theme-${themeName}`);
  themeOptions.forEach((option) => {
    const isActive = option.dataset.themeOption === themeName;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

if (themeDemo && themeToggle && themeOptions.length) {
  applyThemeDemo("carbon-navy");

  if (themeOpacityInput) {
    const updateThemeOpacity = () => {
      const opacity = Number(themeOpacityInput.value) / 100;
      document.body.style.setProperty("--theme-bg-user-opacity", opacity.toFixed(2));
      if (themeOpacityOutput) themeOpacityOutput.textContent = `${themeOpacityInput.value}%`;
    };

    updateThemeOpacity();
    themeOpacityInput.addEventListener("input", updateThemeOpacity);
  }

  if (themeBgOpacityInput) {
    const updateThemeBgOpacity = () => {
      const opacity = Number(themeBgOpacityInput.value) / 100;
      document.body.style.setProperty("--theme-section-bg-opacity", opacity.toFixed(2));
      if (themeBgOpacityOutput) themeBgOpacityOutput.textContent = `${themeBgOpacityInput.value}%`;
    };

    updateThemeBgOpacity();
    themeBgOpacityInput.addEventListener("input", updateThemeBgOpacity);
  }

  themeToggle.addEventListener("click", () => {
    const isOpen = themeDemo.classList.toggle("is-open");
    themeToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      applyThemeDemo(option.dataset.themeOption);
    });
  });

  document.addEventListener("click", (event) => {
    if (themeDemo.contains(event.target)) return;
    themeDemo.classList.remove("is-open");
    themeToggle.setAttribute("aria-expanded", "false");
  });
}
