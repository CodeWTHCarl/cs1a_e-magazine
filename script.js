document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const dropdownMenu = document.getElementById("dropdown-menu");
  if (navToggle && dropdownMenu) {
    navToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdownMenu.classList.toggle("show");
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".nav-dropdown")) dropdownMenu.classList.remove("show");
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const getCollapsedHeight = () =>
    parseInt(getComputedStyle(document.documentElement).getPropertyValue("--collapsed-height"), 10) || 360;

  document.querySelectorAll(".collapsible-content").forEach((block) => {
    const articleText = block.querySelector(".article-text");
    const button = block.parentElement.querySelector(".read-more-btn");
    if (!articleText || !button) return;
    const fullHeight = articleText.scrollHeight;
    if (fullHeight <= getCollapsedHeight() + 40) {
      block.style.maxHeight = "none";
      button.classList.add("hidden");
      return;
    }
    block.style.maxHeight = `${getCollapsedHeight()}px`;
    block.classList.add("is-collapsed");
    button.addEventListener("click", function () {
      const isCollapsed = block.classList.contains("is-collapsed");
      const label = button.querySelector(".btn-text");
      if (isCollapsed) {
        block.style.maxHeight = `${articleText.scrollHeight}px`;
        block.classList.remove("is-collapsed");
        button.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        if (label) label.textContent = "Show less";
      } else {
        block.style.maxHeight = `${getCollapsedHeight()}px`;
        block.classList.add("is-collapsed");
        button.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        if (label) label.textContent = "Read full article";
        button.closest(".entry")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  const select = document.getElementById("article-select");
  const jumpGo = document.getElementById("jump-go");
  const anchors = Array.from(document.querySelectorAll(".article-anchor"));
  if (select && anchors.length) {
    const existing = new Set(Array.from(select.options).map((option) => option.value));
    anchors.forEach((article, index) => {
      const id = article.id;
      const title = article.querySelector(".entry-title")?.textContent?.trim();
      if (!id || !title || existing.has(id)) return;
      const option = document.createElement("option");
      option.value = id;
      option.textContent = `${index + 1}. ${title}`;
      select.appendChild(option);
    });
    const jumpTo = () => {
      const value = select.value;
      if (value) document.getElementById(value)?.scrollIntoView({ behavior: "smooth" });
    };
    select.addEventListener("change", jumpTo);
    jumpGo?.addEventListener("click", jumpTo);
  }

  document.querySelectorAll("[data-count-for]").forEach((badge) => {
    const target = document.getElementById(badge.getAttribute("data-count-for"));
    if (!target) return;
    const count = target.querySelectorAll(".preview-card").length;
    const singular = badge.getAttribute("data-label-singular") || "entry";
    const plural = badge.getAttribute("data-label-plural") || "entries";
    badge.textContent = `${count} ${count === 1 ? singular : plural}`;
  });

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.querySelectorAll(".collapsible-content").forEach((block) => {
        const articleText = block.querySelector(".article-text");
        const button = block.parentElement.querySelector(".read-more-btn");
        if (!articleText || !button || button.classList.contains("hidden")) return;
        block.style.maxHeight = block.classList.contains("is-collapsed")
          ? `${getCollapsedHeight()}px`
          : `${articleText.scrollHeight}px`;
      });
    }, 180);
  });
});
