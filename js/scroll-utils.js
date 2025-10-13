/**
 * Scroll Utilities
 * Performanslı scroll yönetimi için requestAnimationFrame tabanlı utilities
 */

/**
 * requestAnimationFrame ile optimize edilmiş scroll handler
 * @param {Function} onFrame - Her frame'de çağrılacak callback (scrollY değeri ile)
 * @returns {Function} Cleanup fonksiyonu
 */
export function createRAFScroll(onFrame) {
    let ticking = false;
    
    const handler = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                const scrollY = window.scrollY || window.pageYOffset;
                onFrame(scrollY);
            });
        }
    };
    
    // Passive event listener - scroll performansını artırır
    window.addEventListener('scroll', handler, { passive: true });
    
    // Cleanup fonksiyonu
    return () => window.removeEventListener('scroll', handler);
}

/**
 * IntersectionObserver ile element görünürlük yönetimi
 * Scroll'da sürekli class toggle yapmak yerine bir kez tetikler
 * @param {string} selector - CSS selector (ör: '.fade-in')
 * @param {IntersectionObserverInit} options - Observer seçenekleri
 * @returns {Function} Cleanup fonksiyonu
 */
export function inViewObserver(
    selector = '.fade-in',
    options = { root: null, threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
) {
    const elements = Array.from(document.querySelectorAll(selector));
    
    if (elements.length === 0) {
        console.warn(`inViewObserver: "${selector}" selector ile eşleşen element bulunamadı`);
        return () => {}; // No-op cleanup
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Element görünür oldu - animasyon class'ını ekle
                entry.target.classList.add('--visible');
                
                // Bir kez görünür olduktan sonra observe'ı durdur
                // (scroll her pikselde animasyonu yeniden başlatmaz)
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Tüm elementleri observe et
    elements.forEach((el) => observer.observe(el));
    
    console.log(`inViewObserver: ${elements.length} element için gözlem başlatıldı`);
    
    // Cleanup fonksiyonu
    return () => observer.disconnect();
}

/**
 * Throttle fonksiyonu - scroll event'lerini sınırla
 * @param {Function} func - Throttle edilecek fonksiyon
 * @param {number} limit - Minimum bekleme süresi (ms)
 * @returns {Function} Throttle edilmiş fonksiyon
 */
export function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Debounce fonksiyonu - scroll bitene kadar bekle
 * @param {Function} func - Debounce edilecek fonksiyon
 * @param {number} delay - Bekleme süresi (ms)
 * @returns {Function} Debounce edilmiş fonksiyon
 */
export function debounce(func, delay = 150) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Scroll yönünü algılama (yukarı/aşağı)
 * @param {Function} onScrollDown - Aşağı scroll callback
 * @param {Function} onScrollUp - Yukarı scroll callback
 * @param {number} threshold - Minimum scroll mesafesi
 * @returns {Function} Cleanup fonksiyonu
 */
export function scrollDirection(onScrollDown, onScrollUp, threshold = 10) {
    let lastScrollY = window.scrollY || window.pageYOffset;
    let ticking = false;
    
    const handler = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                const currentScrollY = window.scrollY || window.pageYOffset;
                const delta = currentScrollY - lastScrollY;
                
                if (Math.abs(delta) > threshold) {
                    if (delta > 0 && currentScrollY > 50) {
                        // Aşağı scroll - header'ı gizle
                        onScrollDown(currentScrollY);
                    } else if (delta < 0) {
                        // Yukarı scroll - header'ı göster
                        onScrollUp(currentScrollY);
                    }
                    lastScrollY = currentScrollY;
                }
            });
        }
    };
    
    window.addEventListener('scroll', handler, { passive: true });
    
    return () => window.removeEventListener('scroll', handler);
}

