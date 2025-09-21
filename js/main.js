// Main JavaScript file for Digital & Tech Consultancy website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initAnimations();
    initDropdownMenu();
    initMobileOptimizations();
    
    // Test all links
    testAllLinks();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navMenu = document.querySelector('.nav-menu');

    console.log('Mobile menu elements:', { mobileToggle: !!mobileToggle, mainNav: !!mainNav, navMenu: !!navMenu });

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            mainNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            console.log('Mobile menu toggled:', mainNav.classList.contains('active'));
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // Close menu when clicking on a link
        if (navMenu) {
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    console.log('Nav link clicked:', link.getAttribute('href'));
                    mainNav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                });
            });
        }
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Smooth scrolling to:', targetId);
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            console.log('Form submitted:', { name, email, company, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .differentiator-card, .partnership-card, .mission-card, .vision-card, .insight-card');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Dropdown menu functionality
function initDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropdownContent) {
            // Handle hover events
            dropdown.addEventListener('mouseenter', function() {
                dropdownContent.style.opacity = '1';
                dropdownContent.style.visibility = 'visible';
                dropdownContent.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                dropdownContent.style.opacity = '0';
                dropdownContent.style.visibility = 'hidden';
                dropdownContent.style.transform = 'translateY(-10px)';
            });
        }
    });
}

// Mobile optimizations
function initMobileOptimizations() {
    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }
            }
        });
    });
    
    // Improve touch interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Optimize scroll performance on mobile
    let ticking = false;
    
    function updateScrollEffects() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // Use passive event listeners for better performance
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate layout after orientation change
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.height = window.innerHeight + 'px';
            }
        }, 100);
    });
    
    // Improve mobile menu close behavior
    document.addEventListener('click', function(e) {
        const mobileMenu = document.querySelector('.main-nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger animation
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });
}

// Test all internal links
function testAllLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        const targetElement = document.querySelector(href);
        
        if (!targetElement) {
            console.warn('Broken link found:', href);
        }
    });
}

// Header scroll effect with hide/show functionality
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
        // Add scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide header
            header.classList.add('hidden');
        } else {
            // Scrolling up - show header
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Show header after a delay when scrolling stops
        scrollTimeout = setTimeout(function() {
            header.classList.remove('hidden');
        }, 150);
    }
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load performance
    if ('performance' in window) {
        const navEntries = performance.getEntriesByType('navigation');
        if (navEntries && navEntries[0]) {
            const perfData = navEntries[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Console welcome message
console.log(`
%cTechwawes BETA
%cShaping the Future of Digital Partnerships
%c
%cWebsite loaded successfully!
`,
'color: #598BAF; font-size: 24px; font-weight: bold;',
'color: #2563eb; font-size: 16px; font-weight: bold;',
'color: transparent;',
'color: #06b6d4; font-size: 14px;'
); 