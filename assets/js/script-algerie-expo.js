// ===== CONFIGURATION ET VARIABLES GLOBALES =====
const CONFIG = {
    COUNTDOWN_TARGET_DATE: new Date('2025-12-12T23:59:59').getTime(),
    SCROLL_THRESHOLD: 300,
    PARTICLES_COUNT: 50,
    ANIMATION_DURATION: 300
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

// ===== NEWSLETTER FUNCTIONALITY =====
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(elements.newsletterForm);
    const email = formData.get('email');
    
    if (!email || !isValidEmail(email)) {
        showMessage('Veuillez entrer une adresse email valide.', 'error');
        return;
    }
    
    // Simulation d'envoi (remplacer par votre logique d'API)
    const submitBtn = elements.newsletterForm.querySelector('.newsletter-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Inscription...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Inscrit !</span>';
        showMessage('Inscription réussie ! Vous serez notifié dès que l\'exposition sera disponible.', 'success');
        elements.newsletterForm.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type = 'info') {
    // Créer le message toast
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style du toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-size: 0.9rem;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    // Animer l'entrée
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
        elements.notifyBtn.addEventListener('click', function() {
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
    
    // Newsletter form
    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Close modals with Escape key
    window.addEventListener('keydown', function(e) {
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
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation and legal functionalities from common.js
    if (window.NavigationFooter) {
        NavigationFooter.initNavigation();
        NavigationFooter.initMobileMenu();
        NavigationFooter.initScrollToTop();
        NavigationFooter.initLegalAndServices(); // ← Ligne cruciale ajoutée !
        
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

// ===== PERFORMANCE OPTIMIZATION =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}