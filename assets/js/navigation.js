// navigation.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    function setActiveNav() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath || 
                (currentPath === '/' && link.getAttribute('href') === '#')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNav();

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation for external links
    document.querySelectorAll('a[href^="pages/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const loadingSpinner = document.createElement('div');
            loadingSpinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            loadingSpinner.style.position = 'fixed';
            loadingSpinner.style.top = '50%';
            loadingSpinner.style.left = '50%';
            loadingSpinner.style.transform = 'translate(-50%, -50%)';
            loadingSpinner.style.fontSize = '2rem';
            loadingSpinner.style.color = '#4a90e2';
            loadingSpinner.style.zIndex = '9999';
            
            document.body.appendChild(loadingSpinner);
            
            setTimeout(() => {
                document.body.removeChild(loadingSpinner);
            }, 1000);
        });
    });
});