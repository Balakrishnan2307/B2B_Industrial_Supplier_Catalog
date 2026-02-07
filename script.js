// --- 1. Navigation / Routing Logic ---
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    // Show selected page
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active-page');
    }

    // Close mobile navbar if open
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: true });
        bsCollapse.hide();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// --- 2. Dark/Light Mode Logic ---
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-btn');

    if (html.getAttribute('data-bs-theme') === 'light') {
        html.setAttribute('data-bs-theme', 'dark');
        btn.innerHTML = '<i class="fas fa-sun text-warning"></i>';
    } else {
        html.setAttribute('data-bs-theme', 'light');
        btn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// --- 3. Counter Animation ---
// Simple IntersectionObserver to trigger counter animation when scrolled into view
const counters = document.querySelectorAll('.counter-number');
const speed = 200; // The lower the slower

const startCounters = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
            observer.unobserve(counter); // Run once
        }
    });
};

const observer = new IntersectionObserver(startCounters, {
    root: null,
    threshold: 0.5
});

counters.forEach(counter => {
    observer.observe(counter);
});

// Initialize default active state in navbar
document.addEventListener('DOMContentLoaded', () => {
    // Highlight "Home 1" by default
});
