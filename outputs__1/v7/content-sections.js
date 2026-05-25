document.querySelectorAll("[data-news-tabs]").forEach((root) => {
  const tabs = Array.from(root.querySelectorAll("[data-news-tab]"));
  const panels = Array.from(root.querySelectorAll("[data-news-panel]"));

  function showPanel(nextIndex) {
    tabs.forEach((tab, index) => tab.classList.toggle("is-active", index === nextIndex));
    panels.forEach((panel, index) => panel.classList.toggle("is-active", index === nextIndex));
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showPanel(index));
  });
});

const copySliders = Array.from(document.querySelectorAll("[data-copy-slider]")).map((card) => ({
  card,
  track: card.querySelector(".service-copy-track"),
  dots: Array.from(card.querySelectorAll(".service-dots button")),
}));

if (copySliders.length) {
  let copyIndex = 0;
  let copyTimer;
  let copySnapTimer;
  const slideCount = Math.max(...copySliders.map((slider) => slider.dots.length));

  copySliders.forEach(({ track }) => {
    const firstSlide = track?.querySelector("p");
    if (!track || !firstSlide) return;
    const clone = firstSlide.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  function setTrackPosition(index, animate = true) {
    copySliders.forEach(({ track }) => {
      if (!track) return;
      if (!animate) track.style.transition = "none";
      track.style.transform = `translateX(calc(-${index * 100}% - ${index * 24}px))`;
      if (!animate) {
        track.offsetHeight;
        track.style.transition = "";
      }
    });
  }

  function showCopy(nextIndex) {
    window.clearTimeout(copySnapTimer);

    if (nextIndex >= slideCount) {
      copyIndex = 0;
      setTrackPosition(slideCount);
      copySliders.forEach(({ dots }) => {
        dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === copyIndex));
      });
      copySnapTimer = window.setTimeout(() => setTrackPosition(0, false), 380);
      return;
    }

    copyIndex = (nextIndex + slideCount) % slideCount;
    setTrackPosition(copyIndex);
    copySliders.forEach(({ dots }) => {
      dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === copyIndex));
    });
  }

  function restartCopySlider() {
    window.clearInterval(copyTimer);
    copyTimer = window.setInterval(() => showCopy(copyIndex + 1), 4800);
  }

  copySliders.forEach(({ card, dots }) => {
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        showCopy(dotIndex);
        restartCopySlider();
      });
    });

    card.addEventListener("mouseenter", () => window.clearInterval(copyTimer));
    card.addEventListener("mouseleave", restartCopySlider);
  });

  copySliders.forEach(({ track }) => {
    if (!track) return;
    track.style.transition = "none";
    track.style.transform = "translateX(100%)";
    track.offsetHeight;
    track.style.transition = "";
  });

  window.requestAnimationFrame(() => {
    showCopy(0);
    restartCopySlider();
  });
}
