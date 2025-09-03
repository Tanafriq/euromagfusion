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
    if (!contactForm) return null;

    const submitBtn = contactForm.querySelector('.submit-btn');
    const submitSpan = submitBtn?.querySelector('span');
    const submitIcon = submitBtn?.querySelector('i');

    // Regex email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        // Vérification honeypot (anti-bot)
        if (formData.get('_gotcha')) {
            console.warn("Bot détecté, soumission ignorée");
            return;
        }

        // Validation des champs obligatoires
        const nom = formData.get('nom')?.trim();
        const email = formData.get('email')?.trim();
        const sujet = formData.get('sujet')?.trim();
        const message = formData.get('message')?.trim();

        // Vérifications de base
        if (!nom || !email || !sujet || !message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Vérification email
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // État de chargement
        const originalSpanText = submitSpan?.textContent || 'Envoyer';
        const originalIconClass = submitIcon?.className || 'arrow';

        if (submitSpan) submitSpan.textContent = 'Envoi en cours...';
        if (submitIcon) submitIcon.className = 'fas fa-spinner fa-spin';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        }

        try {
            // Préparation des données pour FormSubmit
            const cleanFormData = new FormData();

            // Champs requis par FormSubmit
            cleanFormData.append('_subject', `Contact Euromag Fusion - ${sujet}`);
            cleanFormData.append('_captcha', 'true');
            cleanFormData.append('_next', window.location.href);

            // Données du formulaire
            cleanFormData.append('nom', nom);
            cleanFormData.append('email', email);
            cleanFormData.append('sujet', sujet);
            cleanFormData.append('message', message);
            cleanFormData.append('type_formulaire', 'contact_general');

            // Envoi via FormSubmit
            const res = await fetch('https://formsubmit.co/ajax/fusioneuromag@gmail.com', {
                method: "POST",
                body: cleanFormData,
                headers: {
                    "Accept": "application/json"
                }
            });

            const responseData = await res.json();

            if (res.ok && responseData.success) {
                // État de succès
                if (submitSpan) submitSpan.textContent = 'Envoyé !';
                if (submitIcon) submitIcon.className = 'fas fa-check';
                if (submitBtn) {
                    submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                    submitBtn.style.opacity = '1';
                }

                showNotification('Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.', 'success');

                // Réinitialiser le formulaire
                contactForm.reset();

                // Analytics optionnel
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_form_submit', {
                        event_category: 'engagement',
                        event_label: 'Contact General',
                        custom_map: { 'custom_parameter_1': 'contact_general' }
                    });
                }

            } else {
                console.error('Erreur FormSubmit:', responseData);
                throw new Error(`Erreur FormSubmit: ${responseData.message || 'Envoi échoué'}`);
            }
        } catch (err) {
            console.error('Erreur formulaire contact:', err);

            // État d'erreur
            if (submitSpan) submitSpan.textContent = 'Erreur';
            if (submitIcon) submitIcon.className = 'fas fa-exclamation-triangle';
            if (submitBtn) submitBtn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';

            showNotification('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.', 'error');
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
    };

    contactForm.addEventListener('submit', submitHandler);

    // Validation en temps réel pour l'email
    const emailInput = contactForm.querySelector('#email');
    let emailInputHandler = null;
    if (emailInput) {
        emailInputHandler = function () {
            const email = emailInput.value.trim();
            if (email && !emailRegex.test(email)) {
                emailInput.style.borderColor = '#dc2626';
                emailInput.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
            } else {
                emailInput.style.borderColor = '';
                emailInput.style.boxShadow = '';
            }
        };
        emailInput.addEventListener('input', emailInputHandler);
    }

    // Retourner fonction de cleanup
    return function cleanupContactForm() {
        if (contactForm && submitHandler) {
            contactForm.removeEventListener('submit', submitHandler);
        }
        if (emailInput && emailInputHandler) {
            emailInput.removeEventListener('input', emailInputHandler);
        }
    };
}

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return null;

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const submitIcon = submitBtn?.querySelector('i');

    // Regex email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(newsletterForm);

        // Vérification honeypot (anti-bot)
        if (formData.get('_gotcha')) {
            console.warn("Bot détecté, soumission ignorée");
            return;
        }

        // Validation de l'email
        const email = emailInput?.value.trim();

        if (!email) {
            showNotification('Veuillez entrer votre adresse email.', 'error');
            if (emailInput) emailInput.focus();
            return;
        }

        // Vérification email
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            if (emailInput) emailInput.focus();
            return;
        }

        // État de chargement
        const originalIconClass = submitIcon?.className || 'fas fa-paper-plane';

        if (submitIcon) submitIcon.className = 'fas fa-spinner fa-spin';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        }

        try {
            // Préparation des données pour FormSubmit
            const cleanFormData = new FormData();

            // Champs requis par FormSubmit
            cleanFormData.append('_subject', 'Newsletter - Concerts Euromag Fusion');
            cleanFormData.append('_captcha', 'true');
            cleanFormData.append('_next', window.location.href);

            // Données du formulaire
            cleanFormData.append('email', email);
            cleanFormData.append('type_inscription', 'newsletter_concerts');
            cleanFormData.append('interet', 'Concerts et spectacles');

            // Envoi via FormSubmit
            const res = await fetch('https://formsubmit.co/ajax/fusioneuromag@gmail.com', {
                method: "POST",
                body: cleanFormData,
                headers: {
                    "Accept": "application/json"
                }
            });

            const responseData = await res.json();

            if (res.ok && responseData.success) {
                // État de succès
                if (submitIcon) submitIcon.className = 'fas fa-check';
                if (submitBtn) {
                    submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                    submitBtn.style.opacity = '1';
                }

                showNotification('Inscription réussie ! Vous recevrez toutes les actualités de nos concerts.', 'success');

                // Réinitialiser le formulaire
                newsletterForm.reset();

                // Analytics optionnel
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        event_category: 'engagement',
                        event_label: 'Newsletter Concerts',
                        custom_map: { 'custom_parameter_1': 'concerts_newsletter' }
                    });
                }

                // Facebook Pixel optionnel
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                        content_name: 'Newsletter Concerts',
                        content_category: 'newsletter'
                    });
                }

            } else {
                console.error('Erreur FormSubmit:', responseData);
                throw new Error(`Erreur FormSubmit: ${responseData.message || 'Envoi échoué'}`);
            }
        } catch (err) {
            console.error('Erreur formulaire newsletter:', err);

            // État d'erreur
            if (submitIcon) submitIcon.className = 'fas fa-exclamation-triangle';
            if (submitBtn) submitBtn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';

            showNotification('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.', 'error');
        } finally {
            // Réinitialisation après 3 secondes
            setTimeout(() => {
                if (submitIcon) submitIcon.className = originalIconClass;
                if (submitBtn) {
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '';
                    submitBtn.disabled = false;
                }
            }, 3000);
        }
    };

    newsletterForm.addEventListener('submit', submitHandler);

    // Validation en temps réel de l'email
    let inputHandler = null;
    if (emailInput) {
        inputHandler = function () {
            const email = emailInput.value.trim();
            if (email && !emailRegex.test(email)) {
                emailInput.style.borderColor = '#dc2626';
                emailInput.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
            } else {
                emailInput.style.borderColor = '';
                emailInput.style.boxShadow = '';
            }
        };
        emailInput.addEventListener('input', inputHandler);
    }

    // Retourner fonction de cleanup
    return function cleanupNewsletterForm() {
        if (newsletterForm && submitHandler) {
            newsletterForm.removeEventListener('submit', submitHandler);
        }
        if (emailInput && inputHandler) {
            emailInput.removeEventListener('input', inputHandler);
        }
    };
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