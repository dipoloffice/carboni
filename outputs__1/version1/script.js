const slides = Array.from(document.querySelectorAll(".hero-bg"));
let currentSlide = 0;

function showSlide(nextIndex) {
  slides[currentSlide].classList.remove("is-active");
  slides[nextIndex].classList.add("is-active");
  currentSlide = nextIndex;
}

if (slides.length > 1) {
  window.setInterval(() => {
    showSlide((currentSlide + 1) % slides.length);
  }, 10000);
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
