// ==================== MAIN FEATURES ====================

// Variables globales
let particleTimers = [];

// ==================== DOM CONTENT LOADED ====================
window.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initParticles();
    initScrollAnimations();
    initEventTabs();
    initContactForm();
    initAdvancedEffects();

    // Init modals via a modal manager
    ModalManager.register('videoModal', {
        onOpen: (modal, trigger) => {
            const videoFrame = modal.querySelector('#videoFrame');
            const videoUrl = trigger?.dataset.video;
            if (videoUrl && videoFrame) {
                let videoId = '';
                if (videoUrl.includes('youtube.com/watch?v=')) {
                    videoId = videoUrl.split('watch?v=')[1].split('&')[0];
                } else if (videoUrl.includes('youtu.be/')) {
                    videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                } else videoId = videoUrl;
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            }
        },
        onClose: (modal) => {
            const videoFrame = modal.querySelector('#videoFrame');
            if (videoFrame) videoFrame.src = '';
        }
    });

    // Init navigation, footer and legal content handlers
    if (window.NavigationFooter) {
        NavigationFooter.initNavigation();
        NavigationFooter.initMobileMenu();
        NavigationFooter.initScrollToTop();
        NavigationFooter.initLegalAndServices();
        
        // Global scroll handler
        window.addEventListener('scroll', NavigationFooter.debounce(() => requestAnimationFrame(NavigationFooter.handleScroll), 10));
    }

    // Console message
    console.log('%c🎭 Bienvenue sur Euromag Fusion!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%cSite développé avec ❤️ pour promouvoir la culture algérienne', 'color: #ec4899; font-size: 14px;');
});

// ==================== HERO ANIMATIONS ====================
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        setTimeout(() => typeWriter(heroTitle, text), 1000);
    }
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    function step() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(step, speed);
        }
    }
    step();
}

// ==================== PARTICLES ====================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = delay + 's';

        const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
        setTimeout(() => particle.remove(), (animationDuration + delay) * 1000);
    }

    particleTimers.push(setInterval(createParticle, 800));
    for (let i = 0; i < 10; i++) setTimeout(createParticle, i * 200);
}

function cleanupParticles() {
    particleTimers.forEach(clearInterval);
    particleTimers = [];
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                if (entry.target.classList.contains('event-card')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in, .stat-number, .event-card').forEach(el => {
        observer.observe(el);
        el.classList.add('fade-in');
    });
}

function animateCounter(element, duration = 2000) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/[\d,]/g, '');
    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        element.textContent = Math.floor(progress * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// ==================== EVENT TABS ====================
function initEventTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        const targetContent = document.getElementById(button.dataset.tab);
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.querySelectorAll('.event-card').forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = `slideUp 0.6s ease ${index * 0.2}s forwards`;
            });
        }
    }));
}

// ==================== MODAL MANAGER ====================
const ModalManager = (() => {
    const modals = {};
    function register(id, { onOpen, onClose } = {}) {
        const modal = document.getElementById(id);
        if (!modal) return;

        const closeButtons = modal.querySelectorAll('.close-btn');
        const triggers = document.querySelectorAll(`[data-modal="${id}"]`);

        function open(trigger) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            onOpen?.(modal, trigger);
        }
        function close() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            onClose?.(modal);
        }

        triggers.forEach(btn => btn.addEventListener('click', () => open(btn)));
        closeButtons.forEach(btn => btn.addEventListener('click', close));
        modal.addEventListener('click', e => { if (e.target === modal) close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display === 'block') close(); });

        modals[id] = { open, close, modal };
    }
    function open(id, trigger) { modals[id]?.open(trigger); }
    function close(id) { modals[id]?.close(); }
    return { register, open, close };
})();

// ==================== CONTACT FORM ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('.submit-btn');

    // Regex email (simple mais efficace)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        // Vérifie honeypot (anti-bot)
        if (formData.get('_gotcha')) {
            console.warn("Bot détecté, soumission ignorée 🚫");
            return;
        }

        const nom = formData.get('nom');
        const email = formData.get('email');
        const message = formData.get('message');

        // Vérification des champs obligatoires
        if (!nom || !email || !message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Vérification email
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Envoi en cours...</span> <div class="loading-spinner"></div>';
        submitBtn.disabled = true;

        try {
            const res = await fetch("https://formspree.io/f/xrbagaao", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (res.ok) {
                submitBtn.innerHTML = '<span>Message envoyé !</span> <span>✓</span>';
                submitBtn.style.background = 'var(--success)';
                showNotification('Votre message a été envoyé avec succès ✅', 'success');
                contactForm.reset();
            } else {
                throw new Error("Erreur Formspree");
            }
        } catch (err) {
            console.error(err);
            showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// ==================== NOTIFICATIONS ====================
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

// ==================== ADVANCED EFFECTS ====================
function initAdvancedEffects() {
    const cards = document.querySelectorAll('.event-card, .contact-card, .stat-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });
}

// Exposition du ModalManager pour utilisation globale
window.ModalManager = ModalManager;