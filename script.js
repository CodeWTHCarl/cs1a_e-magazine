document.addEventListener('DOMContentLoaded', function() {
    // Get the button and the menu
    const navToggle = document.getElementById('nav-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Add a click event listener to the button
    navToggle.addEventListener('click', function() {
        // Toggle the 'show' class on the menu
        dropdownMenu.classList.toggle('show');
    });

    // Optional: Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function(event) {
        // Check if the click was outside the nav dropdown area
        if (!event.target.closest('.nav-dropdown')) {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    });
});
