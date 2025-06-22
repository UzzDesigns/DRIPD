// DRIPD Website JavaScript
// Handles navigation, animations, and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initProductCards();
    initLazyLoading();
});

/**
 * Navigation functionality
 * Handles mobile menu toggle and active link highlighting
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--open');
            navToggle.classList.toggle('nav__toggle--open');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav__menu--open');
                navToggle.classList.remove('nav__toggle--open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('nav__menu--open')) {
                navMenu.classList.remove('nav__menu--open');
                navToggle.classList.remove('nav__toggle--open');
            }
        });
    }
    
    // Highlight active navigation link based on current page
    highlightActiveNavLink();
}

/**
 * Highlight the active navigation link based on current page
 */
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('nav__link--active');
        }
    });
}

/**
 * Scroll effects for header and animations
 */
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to header when scrolling
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Product cards interactive functionality
 */
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effect with mouse tracking
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click handler for potential future functionality
        card.addEventListener('click', function() {
            const flavor = this.dataset.flavor;
            console.log(`Product card clicked: ${flavor}`);
            
            // Add a subtle animation to show interaction
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Utility function to add animation delays to elements
 */
function staggerAnimations(elements, baseDelay = 100) {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * baseDelay}ms`;
    });
}

/**
 * Initialize animations when elements come into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

/**
 * Handle form submissions (if any forms are added in the future)
 */
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form submitted successfully');
                // Add success message or redirect logic here
            }
        });
    });
}

/**
 * Performance monitoring and optimization
 */
function initPerformanceOptimizations() {
    // Preload critical resources
    const preloadLinks = [
        'css/style.css',
        'assets/bottle-hero.svg'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = href.endsWith('.css') ? 'style' : 'image';
        document.head.appendChild(link);
    });
    
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }
    });
}

/**
 * Error handling for missing elements
 */
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Could implement error reporting here
    });
    
    // Handle image loading errors
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Image failed to load:', e.target.src);
            // Could implement fallback image logic here
        }
    }, true);
}

/**
 * Reviews slider functionality
 */
function initReviewsSlider() {
    const slider = document.getElementById('reviewsSlider');
    const track = slider?.querySelector('.reviews__track');
    const prevBtn = document.getElementById('reviewsPrev');
    const nextBtn = document.getElementById('reviewsNext');
    const cards = track?.querySelectorAll('.review-card');
    
    if (!slider || !track || !cards.length) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 24; // card width + gap
    const maxIndex = Math.max(0, cards.length - Math.floor(slider.offsetWidth / cardWidth));
    
    function updateSlider() {
        const translateX = -(currentIndex * cardWidth);
        track.style.transform = `translateX(${translateX}px)`;
        
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }
    
    prevBtn?.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn?.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Auto-slide every 5 seconds
    setInterval(() => {
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlider();
    }, 5000);
    
    updateSlider();
}

/**
 * Ingredients popup functionality
 */
function initIngredientsPopup() {
    const popup = document.getElementById('ingredientsPopup');
    const btn = document.getElementById('ingredientsBtn');
    const overlay = document.getElementById('ingredientsOverlay');
    const closeBtn = document.getElementById('ingredientsClose');
    
    if (!popup || !btn) return;
    
    function openPopup() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate ingredients with staggered delays
        const ingredients = popup.querySelectorAll('.ingredient-item');
        ingredients.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    btn.addEventListener('click', openPopup);
    overlay?.addEventListener('click', closePopup);
    closeBtn?.addEventListener('click', closePopup);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initProductCards();
    initLazyLoading();
    initScrollAnimations();
    initForms();
    initPerformanceOptimizations();
    initReviewsSlider();
    initIngredientsPopup();
    handleErrors();
    
    console.log('DRIPD website initialized successfully');
});

// Initialize error handling
handleErrors();

// Initialize performance optimizations
initPerformanceOptimizations();

// Export functions for potential external use
window.DripdWebsite = {
    initNavigation,
    initScrollEffects,
    initProductCards,
    initLazyLoading,
    staggerAnimations,
    initReviewsSlider,
    initIngredientsPopup
};
