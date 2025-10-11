/**
 * TechWawes Cookie Consent Banner
 * GDPR Compliant Cookie Management
 * Version: 1.0.0
 */

(function() {
    'use strict';
    
    const COOKIE_NAME = 'techwawes_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;
    
    // Check if consent has already been given
    function hasConsent() {
        return document.cookie.split('; ').some(cookie => cookie.startsWith(COOKIE_NAME + '='));
    }
    
    // Set cookie consent
    function setConsent(value) {
        const date = new Date();
        date.setTime(date.getTime() + (COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = COOKIE_NAME + '=' + value + ';' + expires + ';path=/;SameSite=Lax';
    }
    
    // Create and show cookie banner
    function showCookieBanner() {
        // Check if already consented
        if (hasConsent()) {
            return;
        }
        
        // Create banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h4><i class="fas fa-cookie-bite"></i> We Value Your Privacy</h4>
                    <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. <a href="cookies.html" target="_blank">Learn more</a></p>
                </div>
                <div class="cookie-consent-actions">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">
                        <i class="fas fa-check"></i> Accept All
                    </button>
                    <button id="cookie-essential-only" class="cookie-btn cookie-btn-secondary">
                        Essential Only
                    </button>
                    <button id="cookie-settings" class="cookie-btn cookie-btn-link">
                        <i class="fas fa-cog"></i> Settings
                    </button>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(51, 65, 85, 0.98) 100%);
                backdrop-filter: blur(10px);
                color: white;
                padding: 1.5rem;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideUp 0.4s ease-out;
                border-top: 2px solid rgba(255, 255, 255, 0.1);
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .cookie-consent-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
                flex-wrap: wrap;
            }
            
            .cookie-consent-text {
                flex: 1;
                min-width: 300px;
            }
            
            .cookie-consent-text h4 {
                margin: 0 0 0.5rem 0;
                font-size: 1.125rem;
                font-weight: 600;
                color: white;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .cookie-consent-text p {
                margin: 0;
                font-size: 0.95rem;
                line-height: 1.5;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .cookie-consent-text a {
                color: #60a5fa;
                text-decoration: underline;
                transition: color 0.2s;
            }
            
            .cookie-consent-text a:hover {
                color: #93c5fd;
            }
            
            .cookie-consent-actions {
                display: flex;
                gap: 0.75rem;
                flex-wrap: wrap;
                align-items: center;
            }
            
            .cookie-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                white-space: nowrap;
            }
            
            .cookie-btn-primary {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }
            
            .cookie-btn-primary:hover {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
            }
            
            .cookie-btn-secondary {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .cookie-btn-secondary:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .cookie-btn-link {
                background: transparent;
                color: rgba(255, 255, 255, 0.8);
                padding: 0.75rem 1rem;
            }
            
            .cookie-btn-link:hover {
                color: white;
                background: rgba(255, 255, 255, 0.1);
            }
            
            @media (max-width: 768px) {
                .cookie-consent-banner {
                    padding: 1rem;
                }
                
                .cookie-consent-content {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }
                
                .cookie-consent-text h4 {
                    justify-content: center;
                }
                
                .cookie-consent-actions {
                    width: 100%;
                    flex-direction: column;
                }
                
                .cookie-btn {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(banner);
        
        // Add event listeners
        document.getElementById('cookie-accept-all').addEventListener('click', function() {
            setConsent('all');
            removeBanner();
            // Enable all analytics/tracking scripts here if needed
            console.log('Cookie consent: All accepted');
        });
        
        document.getElementById('cookie-essential-only').addEventListener('click', function() {
            setConsent('essential');
            removeBanner();
            console.log('Cookie consent: Essential only');
        });
        
        document.getElementById('cookie-settings').addEventListener('click', function() {
            // Redirect to cookie policy page
            window.location.href = 'cookies.html';
        });
    }
    
    // Remove banner
    function removeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease-out forwards';
            setTimeout(() => banner.remove(), 300);
        }
    }
    
    // Add slide down animation
    const slideDownStyle = document.createElement('style');
    slideDownStyle.textContent = `
        @keyframes slideDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(slideDownStyle);
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showCookieBanner);
    } else {
        showCookieBanner();
    }
    
})();

