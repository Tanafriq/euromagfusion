// ===== CONFIGURATION =====
const CONFIG = {
    COUNTDOWN_TARGET_DATE: new Date('2026-04-03T10:00:00'),
    SCROLL_THRESHOLD: 300,
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
    floatingExhibitorBtn: document.getElementById('floatingExhibitorBtn'),
    exhibitorBtn: document.getElementById('exhibitorBtn'),
    contactModal: document.getElementById('contactModal'),
    contactForm: document.getElementById('contactForm'),
    closeContactModal: document.getElementById('closeContactModal'),
    mobileMenu: document.getElementById('mobileMenu'),
    navLinks: document.querySelector('.nav-links')
};

// ===== COUNTDOWN =====
function updateCountdown() {
    const now = new Date().getTime();
    const distance = CONFIG.COUNTDOWN_TARGET_DATE - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (elements.countdown.days) elements.countdown.days.textContent = String(days).padStart(2, '0');
        if (elements.countdown.hours) elements.countdown.hours.textContent = String(hours).padStart(2, '0');
        if (elements.countdown.minutes) elements.countdown.minutes.textContent = String(minutes).padStart(2, '0');
        if (elements.countdown.seconds) elements.countdown.seconds.textContent = String(seconds).padStart(2, '0');
    }
}

// ===== SCROLL FUNCTIONS =====
function handleScroll() {
    const scrollY = window.pageYOffset;
    
    // Scroll to top button
    if (elements.scrollTop) {
        if (scrollY > CONFIG.SCROLL_THRESHOLD) {
            elements.scrollTop.classList.add('visible');
        } else {
            elements.scrollTop.classList.remove('visible');
        }
    }
    
    // Hide scroll indicator
    if (elements.scrollIndicator && scrollY > 100) {
        elements.scrollIndicator.style.opacity = '0';
    }
}

// ===== MODAL FUNCTIONS =====
function openContactModal() {
    if (elements.contactModal) {
        elements.contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    if (elements.contactModal) {
        elements.contactModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    if (elements.mobileMenu && elements.navLinks) {
        elements.mobileMenu.addEventListener('click', () => {
            elements.navLinks.classList.toggle('active');
            elements.mobileMenu.classList.toggle('active');
        });
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (elements.navLinks) {
                    elements.navLinks.classList.remove('active');
                }
            }
        });
    });
}

// ===== NOTIFICATION BUTTON =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: '3000',
        animation: 'slideInRight 0.3s ease',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        fontWeight: '600',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Scroll to top
    if (elements.scrollTop) {
        elements.scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Notify button
    if (elements.notifyBtn) {
        elements.notifyBtn.addEventListener('click', () => {
            const newsletterSection = document.getElementById('newsletter-section');
            if (newsletterSection) {
                newsletterSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Exhibitor button
    if (elements.exhibitorBtn) {
        elements.exhibitorBtn.addEventListener('click', openContactModal);
    }
    
    // Close modal
    if (elements.closeContactModal) {
        elements.closeContactModal.addEventListener('click', closeContactModal);
    }
    
    // Click outside modal
    if (elements.contactModal) {
        elements.contactModal.addEventListener('click', (e) => {
            if (e.target === elements.contactModal) {
                closeContactModal();
            }
        });
    }
    
    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeContactModal();
        }
    });
    
    // Newsletter form
    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(elements.newsletterForm);
            
            try {
                const response = await fetch(elements.newsletterForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    showNotification('Inscription réussie ! Vous recevrez nos actualités.', 'success');
                    elements.newsletterForm.reset();
                } else {
                    throw new Error('Erreur');
                }
            } catch (err) {
                showNotification('Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
            }
        });
    }
    
    // Contact form
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(elements.contactForm);
            const submitBtn = elements.contactForm.querySelector('.submit-btn');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            }
            
            try {
                const response = await fetch(elements.contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    showNotification('Votre demande a été envoyée avec succès !', 'success');
                    elements.contactForm.reset();
                    setTimeout(closeContactModal, 2000);
                } else {
                    throw new Error('Erreur');
                }
            } catch (err) {
                showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Envoyer ma demande</span><i class="fas fa-paper-plane"></i>';
                }
            }
        });
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initAnimations() {
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
    
    document.querySelectorAll('.stat-card, .audience-card, .space-card, .comm-card, .benefit-card, .participant-card, .service-item, .organizer-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Add CSS for animation
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
document.head.appendChild(animationStyles);

// ===== CURRENT YEAR =====
function setCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    initMobileMenu();
    initSmoothScroll();
    initEventListeners();
    initAnimations();
    setCurrentYear();
    handleScroll();
});
