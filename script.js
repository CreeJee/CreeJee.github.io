// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== Scroll Navigation =====
const sections = document.querySelectorAll('section[id]');
const navDots = document.querySelectorAll('.scroll-nav-dot');

// Update active dot on scroll
function updateActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50;

    // If at bottom of page, activate the last section (contact)
    if (isAtBottom) {
        navDots.forEach((dot) => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === 'contact') {
                dot.classList.add('active');
            }
        });
        return;
    }

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navDots.forEach((dot) => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === sectionId) {
                    dot.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll to section on click
navDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Listen to scroll events
window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// ===== Toggle All Details =====
const toggleAllBtn = document.getElementById('toggle-all-details');
const allDetails = document.querySelectorAll('.timeline-details');

if (toggleAllBtn && allDetails.length > 0) {
    let allOpen = false;

    toggleAllBtn.addEventListener('click', () => {
        allOpen = !allOpen;

        allDetails.forEach((detail) => {
            detail.open = allOpen;
        });

        toggleAllBtn.textContent = allOpen ? '모두 접기' : '모두 펼치기';
    });
}
