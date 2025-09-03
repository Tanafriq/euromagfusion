// ==================== MAIN FEATURES ====================

// Variables globales
let particleTimers = [];
const FORMSPREE_ID = 'xrbagaao';

// ==================== DOM CONTENT LOADED ====================
window.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initParticles();
    initScrollAnimations();
    initEventTabs();
    initContactForm();
    initNewsletterForm();
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
    console.log('%cSite développé par SL avec ❤️ pour promouvoir la culture algérienne', 'color: #ec4899; font-size: 14px;');
});

// ==================== HERO ANIMATIONS ====================
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Choisissez l'animation que vous préférez en décommentant une des lignes ci-dessous :

        // Option 1: Animation lettre par lettre avec effet 3D (recommandée)
        animateTitle3DLetters(heroTitle);

        // Option 2: Animation de révélation par masque moderne
        // animateTitleReveal(heroTitle);

        // Option 3: Animation de typing moderne
        // animateModernTyping(heroTitle);

        // Option 4: Animation de morphing géométrique
        // animateTitleMorph(heroTitle);
    }
}

// Option 1: Animation 3D lettre par lettre sophistiquée
function animateTitle3DLetters(heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';

    const words = text.split(' ');

    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.style.display = 'inline-block';
        wordSpan.style.marginRight = wordIndex < words.length - 1 ? '0.3em' : '0';

        word.split('').forEach((letter, letterIndex) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'letter';
            letterSpan.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(100px) rotateX(-90deg) scale(0.5);
                transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transition-delay: ${(wordIndex * 0.1) + (letterIndex * 0.05)}s;
                transform-origin: center bottom;
            `;
            wordSpan.appendChild(letterSpan);
        });

        heroTitle.appendChild(wordSpan);
    });

    setTimeout(() => {
        const letters = heroTitle.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
        });

        // Effet de brillance après l'animation
        setTimeout(() => {
            heroTitle.classList.add('shimmer-effect');
        }, 1500);
    }, 300);
}

// Option 2: Animation de révélation par masque
function animateTitleReveal(heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = `<span class="title-reveal">${text}</span>`;
    heroTitle.style.opacity = '1';

    const titleReveal = heroTitle.querySelector('.title-reveal');
    titleReveal.style.cssText = `
        display: inline-block;
        background: linear-gradient(45deg, #ffffff, #e0e7ff, #c7d2fe, #ffffff);
        background-size: 400% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
        animation: textReveal 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                   gradientFlow 4s ease-in-out infinite 2s;
    `;
}

// Option 3: Animation de typing moderne
function animateModernTyping(heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    heroTitle.classList.add('modern-typing');

    let index = 0;
    const typingSpeed = 100;

    function typeCharacter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            heroTitle.classList.add('completed');
            setTimeout(() => {
                heroTitle.classList.add('glow-effect');
            }, 500);
        }
    }

    setTimeout(typeCharacter, 500);
}

// Option 4: Animation de morphing géométrique
function animateTitleMorph(heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';

    // Créer un conteneur pour l'effet de morphing
    const morphContainer = document.createElement('div');
    morphContainer.className = 'morph-container';
    morphContainer.style.cssText = `
        position: relative;
        display: inline-block;
        overflow: hidden;
    `;

    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.style.cssText = `
        display: inline-block;
        opacity: 0;
        transform: scale(0) rotate(-180deg);
        animation: morphIn 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        transform-origin: center center;
    `;

    morphContainer.appendChild(textSpan);
    heroTitle.appendChild(morphContainer);

    // Ajouter l'effet de particules autour du texte
    setTimeout(() => {
        createTitleParticles(morphContainer);
        textSpan.style.animation += ', shimmer 3s ease-in-out infinite 2s';
    }, 2000);
}

// Fonction pour créer des particules autour du titre
function createTitleParticles(container) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: titleParticleFloat 3s ease-out infinite;
            animation-delay: ${i * 0.1}s;
            top: 50%;
            left: 50%;
        `;
        container.appendChild(particle);
    }
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

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activer le bouton cliqué
            button.classList.add('active');

            // Trouver et activer le contenu correspondant
            const targetContent = document.getElementById(button.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');

                // Réinitialiser et animer les cartes d'événements
                const eventCards = targetContent.querySelectorAll('.event-card');
                eventCards.forEach((card, index) => {
                    // Retirer toutes les animations précédentes
                    card.style.animation = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';

                    // Force reflow pour s'assurer que les styles sont appliqués
                    card.offsetHeight;

                    // Appliquer la nouvelle animation avec un délai
                    setTimeout(() => {
                        card.style.animation = `slideUp 0.6s ease ${index * 0.15}s forwards`;
                    }, 50);
                });
            }
        });
    });
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
        formData.append('subject', 'Contact formulaire');

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
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
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

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');

    // Regex email simple mais efficace
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Vérification email
        if (!email) {
            showNotification('Veuillez entrer votre adresse email.', 'error');
            return;
        }

        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Sauvegarde de l'état original du bouton
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            // Création du FormData avec email et mention "concert"
            const formData = new FormData();

            // Vérifie honeypot (anti-bot)
            if (formData.get('_gotcha')) {
                console.warn("Bot détecté, soumission ignorée 🚫");
                return;
            }
            
            formData.append('subject', 'Inscription concerts');
            formData.append('Intérêt', 'Concerts');
            formData.append('Email', email);

            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (res.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.style.background = 'var(--success, #28a745)';
                showNotification('Inscription réussie ! Merci pour votre intérêt pour nos concerts 🎵', 'success');
                newsletterForm.reset();

                // Analytics optionnel (si vous utilisez Google Analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        event_category: 'engagement',
                        event_label: 'concert'
                    });
                }
            } else {
                throw new Error("Erreur lors de l'inscription");
            }
        } catch (err) {
            console.error('Erreur newsletter:', err);
            showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            // Réinitialisation après 3 secondes
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
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
    const cards = document.querySelectorAll('.contact-card, .stat-item'); //.event-card
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