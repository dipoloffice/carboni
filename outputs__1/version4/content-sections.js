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

document.querySelectorAll("[data-copy-slider]").forEach((card) => {
  const track = card.querySelector(".service-copy-track");
  const dots = Array.from(card.querySelectorAll(".service-dots button"));
  let index = 0;
  let timer;

  function showCopy(nextIndex) {
    index = (nextIndex + dots.length) % dots.length;
    if (track) track.style.transform = `translateX(-${index * 33.3333}%)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === index));
  }

  function restart() {
    window.clearInterval(timer);
    timer = window.setInterval(() => showCopy(index + 1), 4800);
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      showCopy(dotIndex);
      restart();
    });
  });

  card.addEventListener("mouseenter", () => window.clearInterval(timer));
  card.addEventListener("mouseleave", restart);
  showCopy(0);
  restart();
});
