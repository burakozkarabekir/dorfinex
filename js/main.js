// Main JavaScript file for Digital & Tech Consultancy website
import { createRAFScroll, inViewObserver, scrollDirection } from './scroll-utils.js';

// Global cleanup functions
const cleanupFunctions = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initOptimizedAnimations();
    initMobileOptimizations();
    initOptimizedScrollEffects();
    initReadMoreButton();
    
    // Test all links
    testAllLinks();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    cleanupFunctions.forEach(cleanup => cleanup());
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

// Contact form functionality with Formspree
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let Formspree handle the form submission
            // No need to prevent default or add custom handling
            console.log('Form submitted to Formspree');
        });
    }
}

// Show professional form message
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message form-message-' + type;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    const style = document.createElement('style');
    if (!document.getElementById('form-message-styles')) {
        style.id = 'form-message-styles';
        style.textContent = `
            .form-message {
                padding: 1rem 1.5rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-weight: 500;
                animation: slideIn 0.3s ease-out;
            }
            .form-message-success {
                background: #10b981;
                color: white;
            }
            .form-message-error {
                background: #ef4444;
                color: white;
            }
            .form-message i {
                font-size: 1.25rem;
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Insert before form
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animasyonları kaldırıldı - kullanıcı isteği üzerine
function initOptimizedAnimations() {
    // Tüm fade-in elementlerini hemen görünür yap (animasyon yok)
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('--visible');
    });
    
    console.log('Scroll animations have been disabled as requested');
}


// Optimize edilmiş scroll effects
function initOptimizedScrollEffects() {
    const header = document.querySelector('.header');
    
    if (!header) {
        console.warn('Header element not found for scroll effects');
        return;
    }
    
    // requestAnimationFrame ile scroll direction yönetimi
    const cleanup = scrollDirection(
        // Aşağı scroll - header'ı gizle
        (scrollY) => {
            console.log('Scrolling DOWN, hiding header at:', scrollY);
            header.classList.add('hidden');
            if (scrollY > 50) {
                header.classList.add('scrolled');
            }
        },
        // Yukarı scroll - header'ı göster
        (scrollY) => {
            console.log('Scrolling UP, showing header at:', scrollY);
            header.classList.remove('hidden');
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        },
        5 // threshold - daha hassas yanıt için düşürüldü
    );
    
    cleanupFunctions.push(cleanup);
    
    console.log('✅ Header scroll effects initialized - scroll down to hide, scroll up to show');
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
%cDorfinex
%cShaping the Future of Digital Partnerships
%c
%cWebsite loaded successfully!
`,
'color: #598BAF; font-size: 24px; font-weight: bold;',
'color: #2563eb; font-size: 16px; font-weight: bold;',
'color: transparent;',
'color: #06b6d4; font-size: 14px;'
);

// Read more button functionality for Data Strategy & Modernization service
function initReadMoreButton() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const servicePreview = document.querySelector('.service-preview');
    const serviceDetails = document.querySelector('.service-details');
    
    if (readMoreBtn && servicePreview && serviceDetails) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle classes
            const isExpanded = serviceDetails.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse - hide details, show preview
                serviceDetails.classList.remove('expanded');
                servicePreview.classList.remove('hidden');
                readMoreBtn.textContent = 'Read more';
            } else {
                // Expand - show details, hide preview
                serviceDetails.classList.add('expanded');
                servicePreview.classList.add('hidden');
                readMoreBtn.textContent = 'Read less';
                
                // Smooth scroll to keep button in view
                setTimeout(() => {
                    readMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    } else {
        console.warn('Read more button elements not found:', {
            readMoreBtn: !!readMoreBtn,
            servicePreview: !!servicePreview,
            serviceDetails: !!serviceDetails
        });
    }
} 