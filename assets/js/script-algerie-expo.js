// ===== CONFIGURATION ET VARIABLES GLOBALES =====
const CONFIG = {
    COUNTDOWN_TARGET_DATE: new Date('2026-04-18T23:59:59').getTime(),
    SCROLL_THRESHOLD: 300,
    PARTICLES_COUNT: 50,
    ANIMATION_DURATION: 300,
    FORMSPREE_ID: 'xrbagaao'
};

// ===== DOM ELEMENTS =====
const elements = {
    countdown: {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    },
    scrollTop: document.getElementById('scrollTop'),
    scrollIndicator: document.getElementById('scrollIndicator'),
    notifyBtn: document.getElementById('notifyBtn'),
    newsletterForm: document.getElementById('newsletterForm'),
    particles: document.getElementById('particles')
};

// ===== COUNTDOWN FUNCTIONALITY =====
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = CONFIG.COUNTDOWN_TARGET_DATE - now;

    if (timeLeft < 0) {
        // Si la date est dépassée, afficher des zéros
        Object.values(elements.countdown).forEach(el => {
            if (el) el.textContent = '00';
        });
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Mise à jour des éléments avec animation
    updateCountdownElement(elements.countdown.days, days.toString().padStart(2, '0'));
    updateCountdownElement(elements.countdown.hours, hours.toString().padStart(2, '0'));
    updateCountdownElement(elements.countdown.minutes, minutes.toString().padStart(2, '0'));
    updateCountdownElement(elements.countdown.seconds, seconds.toString().padStart(2, '0'));
}

function updateCountdownElement(element, newValue) {
    if (!element || element.textContent === newValue) return;

    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0.7';

    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 150);
}

// ===== SCROLL FUNCTIONALITY =====
function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Gestion du bouton scroll-to-top
    if (elements.scrollTop) {
        if (scrollY > CONFIG.SCROLL_THRESHOLD) {
            elements.scrollTop.classList.add('show');
        } else {
            elements.scrollTop.classList.remove('show');
        }
    }

    // Gestion du scroll indicator
    if (elements.scrollIndicator) {
        if (scrollY > 200) {
            elements.scrollIndicator.style.opacity = '0';
        } else {
            elements.scrollIndicator.style.opacity = '0.7';
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== PARTICLES ANIMATION =====
function createParticles() {
    if (!elements.particles) return;

    elements.particles.innerHTML = '';

    for (let i = 0; i < CONFIG.PARTICLES_COUNT; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Propriétés aléatoirement générées
        const size = Math.random() * 4 + 2;
        const animationDuration = Math.random() * 20 + 10;
        const opacity = Math.random() * 0.5 + 0.1;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${animationDuration}s ease-in-out infinite;
            animation-delay: ${Math.random() * -20}s;
            pointer-events: none;
        `;

        elements.particles.appendChild(particle);
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
        color: white; padding: 1rem 2rem; border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl); z-index: 3000; animation: slideInRight 0.3s ease;
        max-width: 300px; font-weight: 600;`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Scroll events
    window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });

    // Scroll to top button
    if (elements.scrollTop) {
        elements.scrollTop.addEventListener('click', scrollToTop);
    }

    // Notification button - scroll to newsletter section
    if (elements.notifyBtn) {
        elements.notifyBtn.addEventListener('click', function () {
            const newsletterSection = document.getElementById('newsletter-section');
            if (newsletterSection) {
                const offsetTop = newsletterSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Close modals with Escape key
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    // Initialize navigation and legal functionalities from common.js
    if (window.NavigationFooter) {
        NavigationFooter.initNavigation();
        NavigationFooter.initMobileMenu();
        NavigationFooter.initScrollToTop();
        NavigationFooter.initLegalAndServices();

        // Global scroll handler - combine both scroll handlers
        window.addEventListener('scroll', NavigationFooter.debounce(() => {
            requestAnimationFrame(() => {
                NavigationFooter.handleScroll(); // Common.js scroll handler
                handleScroll(); // This page's scroll handler
            });
        }, 10));
    }

    // Initialiser les fonctionnalités spécifiques à cette page
    initEventListeners();
    initSmoothScrolling();
    initNewsletterForm(); // Nouvelle fonction newsletter intégrée
    createParticles();

    // Démarrer le countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Gestion initiale du scroll
    handleScroll();

    // Animation d'entrée pour les éléments
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.preview-card, .partner-item, .newsletter-section');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
});

// ===== NEWSLETTER FUNCTIONALITY =====
function initNewsletterForm() {
    if (!elements.newsletterForm) return;
    
    const emailInput = elements.newsletterForm.querySelector('#newsletter-email');
    const submitBtn = elements.newsletterForm.querySelector('.newsletter-btn');
    const submitSpan = submitBtn?.querySelector('span');
    const submitIcon = submitBtn?.querySelector('i');
    
    // Regex email simple mais efficace
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    elements.newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(elements.newsletterForm);
        
        // Vérification honeypot (anti-bot)
        if (formData.get('_gotcha')) {
            console.warn("Bot détecté, soumission ignorée 🚫");
            return;
        }
        
        const email = formData.get('email')?.trim();
        
        // Vérification email obligatoire
        if (!email) {
            showNotification('Veuillez entrer votre adresse email.', 'error');
            emailInput?.focus();
            return;
        }
        
        // Vérification format email
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            emailInput?.focus();
            return;
        }
        
        // Sauvegarde de l'état original du bouton
        const originalSpanText = submitSpan?.textContent || 'S\'inscrire';
        const originalIconClass = submitIcon?.className || 'fas fa-paper-plane';
        
        // État de chargement
        if (submitSpan) submitSpan.textContent = 'Inscription...';
        if (submitIcon) submitIcon.className = 'fas fa-spinner fa-spin';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        }
        
        try {
            // Création d'un nouveau FormData propre avec uniquement les champs souhaités
            const cleanFormData = new FormData();
            cleanFormData.append('subject', 'Inscription Algérie Expo');
            cleanFormData.append('Intérêt', 'Algérie Expo');
            cleanFormData.append('Email', email);
            
            const res = await fetch(`https://formspree.io/f/${CONFIG.FORMSPREE_ID}`, {
                method: "POST",
                body: cleanFormData,
                headers: { "Accept": "application/json" }
            });
            
            if (res.ok) {
                // État de succès
                if (submitSpan) submitSpan.textContent = 'Inscrit !';
                if (submitIcon) submitIcon.className = 'fas fa-check';
                if (submitBtn) {
                    submitBtn.style.background = 'var(--success, #28a745)';
                    submitBtn.style.opacity = '1';
                }
                
                showNotification('Inscription réussie ! Vous recevrez toutes les actualités d\'Algérie Expo', 'success');
                elements.newsletterForm.reset();
                
                // Analytics optionnel
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        event_category: 'engagement',
                        event_label: 'Inscription Algérie Expo',
                        custom_map: {'custom_parameter_1': 'algerie_expo'}
                    });
                }
                
                // Tracking Facebook Pixel optionnel
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                        content_name: 'Newsletter Algérie Expo'
                    });
                }
                
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error('Erreur Formspree:', errorData);
                throw new Error(`Erreur ${res.status}: ${errorData.error || 'Inscription échouée'}`);
            }
        } catch (err) {
            console.error('Erreur newsletter:', err);
            
            // État d'erreur
            if (submitSpan) submitSpan.textContent = 'Erreur';
            if (submitIcon) submitIcon.className = 'fas fa-exclamation-triangle';
            if (submitBtn) submitBtn.style.background = 'var(--danger, #dc3545)';
            
            showNotification('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.', 'error');
        } finally {
            // Réinitialisation après 3 secondes
            setTimeout(() => {
                if (submitSpan) submitSpan.textContent = originalSpanText;
                if (submitIcon) submitIcon.className = originalIconClass;
                if (submitBtn) {
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '';
                    submitBtn.disabled = false;
                }
            }, 3000);
        }
    });
    
    // Validation en temps réel (optionnel)
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const email = emailInput.value.trim();
            if (email && !emailRegex.test(email)) {
                emailInput.style.borderColor = 'var(--danger, #dc3545)';
            } else {
                emailInput.style.borderColor = '';
            }
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
        color: white; padding: 1rem 2rem; border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl); z-index: 3000; animation: slideInRight 0.3s ease;
        max-width: 300px; font-weight: 600;`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATION =====
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}