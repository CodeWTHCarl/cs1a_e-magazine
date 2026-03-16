document.addEventListener("DOMContentLoaded", function () {
    // =========================
    // DROPDOWN NAVIGATION
    // =========================
    const navToggle = document.getElementById("nav-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");

    if (navToggle && dropdownMenu) {
        navToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".nav-dropdown")) {
                dropdownMenu.classList.remove("show");
            }
        });

        dropdownMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", function () {
                dropdownMenu.classList.remove("show");
            });
        });
    }

    // =========================
    // SCROLL REVEAL
    // =========================
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    // =========================
    // COLLAPSIBLE ARTICLES
    // =========================
    const COLLAPSED_HEIGHT = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--collapsed-height"),
        10
    ) || 360;

    const collapsibleBlocks = document.querySelectorAll(".collapsible-content");

    collapsibleBlocks.forEach((block) => {
        const articleText = block.querySelector(".article-text");
        const button = block.parentElement.querySelector(".read-more-btn");

        if (!articleText || !button) return;

        const fullHeight = articleText.scrollHeight;

        // If content is short enough, don't collapse it
        if (fullHeight <= COLLAPSED_HEIGHT + 40) {
            block.style.maxHeight = "none";
            block.classList.remove("is-collapsed");
            button.classList.add("hidden");
            return;
        }

        // Start collapsed
        block.style.maxHeight = `${COLLAPSED_HEIGHT}px`;
        block.classList.add("is-collapsed");
        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", function () {
            const isCollapsed = block.classList.contains("is-collapsed");

            if (isCollapsed) {
                block.style.maxHeight = `${articleText.scrollHeight}px`;
                block.classList.remove("is-collapsed");
                button.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
                button.querySelector(".btn-text").textContent = "Show less";
            } else {
                block.style.maxHeight = `${COLLAPSED_HEIGHT}px`;
                block.classList.add("is-collapsed");
                button.classList.remove("is-open");
                button.setAttribute("aria-expanded", "false");
                button.querySelector(".btn-text").textContent = "Read full article";

                const articleCard = button.closest(".entry");
                if (articleCard) {
                    articleCard.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }
            }
        });
    });

    // =========================
    // RECALCULATE ON RESIZE
    // =========================
    let resizeTimer;

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            const updatedCollapsedHeight = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue("--collapsed-height"),
                10
            ) || 360;

            document.querySelectorAll(".collapsible-content").forEach((block) => {
                const articleText = block.querySelector(".article-text");
                const button = block.parentElement.querySelector(".read-more-btn");

                if (!articleText || !button || button.classList.contains("hidden")) return;

                if (block.classList.contains("is-collapsed")) {
                    block.style.maxHeight = `${updatedCollapsedHeight}px`;
                } else {
                    block.style.maxHeight = `${articleText.scrollHeight}px`;
                }
            });
        }, 180);
    });
});