document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");

    if (navToggle && dropdownMenu) {
        navToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle("show");
        });

        window.addEventListener("click", function (event) {
            if (!event.target.closest(".nav-dropdown")) {
                dropdownMenu.classList.remove("show");
            }
        });

        dropdownMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function () {
                dropdownMenu.classList.remove("show");
            });
        });
    }
});