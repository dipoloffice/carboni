const slides = Array.from(document.querySelectorAll(".hero-bg"));
const indicatorDots = Array.from(document.querySelectorAll(".indicator-dot"));
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
  indicatorDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === nextIndex);
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

  indicatorDots.forEach((dot, index) => {
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
  let activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));

  if (activeIndex < 0) activeIndex = 0;

  function renderMarketCards() {
    cards.forEach((card, index) => {
      const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
      const nextIndex = (activeIndex + 1) % cards.length;

      card.classList.toggle("is-active", index === activeIndex);
      card.classList.toggle("is-prev", index === prevIndex);
      card.classList.toggle("is-next", index === nextIndex);
    });
  }

  prevButton.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    renderMarketCards();
  });

  nextButton.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % cards.length;
    renderMarketCards();
  });

  renderMarketCards();
});

const snapSections = Array.from(document.querySelectorAll(".snap-page > section"));
const sharedHeader = document.querySelector(".site-header");
const sharedHeaderLogo = sharedHeader?.querySelector(".brand img");
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
}

setHeaderTheme(snapSections[0]?.dataset.headerTheme || "dark");
window.addEventListener("scroll", updateSnapIndex, { passive: true });

if (snapSections.length > 1) {
  window.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 28) return;

    const now = Date.now();
    if (now - lastSnapAt < 780) {
      event.preventDefault();
      return;
    }

    updateSnapIndex();
    snapIndex = Math.max(0, Math.min(snapSections.length - 1, snapIndex + (event.deltaY > 0 ? 1 : -1)));
    lastSnapAt = now;
    event.preventDefault();
    snapSections[snapIndex].scrollIntoView({ behavior: "smooth", block: "start" });
  }, { passive: false });
}
