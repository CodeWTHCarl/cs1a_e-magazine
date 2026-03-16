document.addEventListener('DOMContentLoaded', function () {
    // --- Navigation Dropdown Logic ---
    const navToggle = document.getElementById('nav-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (navToggle && dropdownMenu) {
        navToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        window.addEventListener('click', function (event) {
            if (!event.target.closest('.nav-dropdown') && dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // --- Upload Feature Logic ---
    const modal = document.getElementById('upload-modal');
    const closeBtn = document.querySelector('.close-modal');
    const uploadForm = document.getElementById('upload-form');
    const targetSectionInput = document.getElementById('target-section-id');

    if (!modal || !closeBtn || !uploadForm || !targetSectionInput) return;

    // Open Modal when "Add Entry" is clicked
    document.querySelectorAll('.add-entry-btn').forEach(button => {
        button.addEventListener('click', function () {
            const targetSection = this.getAttribute('data-target');
            targetSectionInput.value = targetSection;
            modal.style.display = 'flex';
        });
    });

    // Close Modal
    function closeModal() {
        modal.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle Form Submission
    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('entry-title').value.trim();
        const textContent = document.getElementById('entry-text').value.trim();
        const imageInput = document.getElementById('entry-image');
        const imageFile = imageInput.files[0];
        const targetId = targetSectionInput.value;

        if (!title || !textContent || !imageFile || !targetId) {
            alert('Please complete all fields.');
            return;
        }

        const container = document.querySelector(`#${targetId} .entries-container`);
        if (!container) {
            alert('Target section not found.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            const imageSrc = event.target.result;

            const article = document.createElement('article');
            article.className = 'entry';
            article.style.animation = 'fadeUp 0.5s ease';

            const h3 = document.createElement('h3');
            h3.className = 'entry-title';
            h3.textContent = title;

            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'entry-media';

            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = title;

            mediaDiv.appendChild(img);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'entry-content';

            const paragraph = document.createElement('p');
            paragraph.innerHTML = textContent.replace(/\n/g, '<br>');

            contentDiv.appendChild(paragraph);

            article.appendChild(h3);
            article.appendChild(mediaDiv);
            article.appendChild(contentDiv);

            container.prepend(article);

            uploadForm.reset();
            closeModal();

            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };

        reader.readAsDataURL(imageFile);
    });
});