const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/euromag.fusion@gmail.com';
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REQUEST_TIMEOUT = 30000;
const BUTTON_RESET_DELAY = 3000;

// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', () => {
    initHeroTitle();
    initParticles();
    initEventTabs(initEventCardsReveal());
    initContactForm();
    initNewsletterForm();
    initCardTilt();

    ModalManager.register('videoModal', {
        onOpen: (modal, trigger) => {
            const videoFrame = modal.querySelector('#videoFrame');
            const videoId = getYouTubeId(trigger?.dataset.video);
            if (videoId && videoFrame) {
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            }
        },
        onClose: (modal) => {
            const videoFrame = modal.querySelector('#videoFrame');
            if (videoFrame) videoFrame.src = '';
        }
    });

    console.log('%c🎭 Bienvenue sur Euromag Fusion!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%cSite développé par SL avec ❤️ pour promouvoir la culture algérienne', 'color: #ec4899; font-size: 14px;');
});

function getYouTubeId(url) {
    if (!url) return '';
    if (url.includes('watch?v=')) return url.split('watch?v=')[1].split('&')[0];
    if (url.includes('shorts/')) return url.split('shorts/')[1].split('?')[0];
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
    return url;
}

// ==================== HERO ====================
function initHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const words = heroTitle.textContent.trim().split(' ');
    heroTitle.innerHTML = '';

    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.style.marginRight = wordIndex < words.length - 1 ? '0.3em' : '0';

        [...word].forEach((letter, letterIndex) => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'letter';
            letterSpan.textContent = letter;
            letterSpan.style.transitionDelay = `${wordIndex * 0.1 + letterIndex * 0.05}s`;
            wordSpan.appendChild(letterSpan);
        });

        heroTitle.appendChild(wordSpan);
    });

    setTimeout(() => heroTitle.classList.add('is-revealed'), 300);
}

// ==================== PARTICLES ====================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
        setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }

    setInterval(createParticle, 800);
    for (let i = 0; i < 10; i++) setTimeout(createParticle, i * 200);
}

// ==================== EVENT CARDS ====================
function initEventCardsReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.events-grid').forEach(grid => {
        grid.querySelectorAll('.event-card').forEach((card, index) => {
            card.style.setProperty('--reveal-delay', `${(index % 3) * 0.1}s`);
            card.classList.add('reveal');
            observer.observe(card);
        });
    });

    return observer;
}

function initEventTabs(revealObserver) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) return;

            const targetContent = document.getElementById(button.dataset.tab);
            if (!targetContent) return;

            tabButtons.forEach(btn => btn.classList.toggle('active', btn === button));

            // Les cartes sont encore masquées : on réinitialise leur apparition avant d'afficher l'onglet.
            targetContent.querySelectorAll('.event-card').forEach(card => {
                card.classList.remove('visible');
                revealObserver.observe(card);
            });

            tabContents.forEach(content => content.classList.toggle('active', content === targetContent));
        });
    });
}

function initCardTilt() {
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const rotateX = (e.clientY - rect.top - rect.height / 2) / 10;
                const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });
}

// ==================== FORMULAIRES ====================
async function fetchWithRetry(url, options, retries = 2) {
    for (let attempt = 0; ; attempt++) {
        try {
            return await fetch(url, { ...options, signal: AbortSignal.timeout(REQUEST_TIMEOUT) });
        } catch (err) {
            if (attempt >= retries || err.name === 'TimeoutError') throw err;
            await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 1000));
        }
    }
}

async function sendToFormSubmit(fields) {
    const body = new FormData();
    Object.entries({ _captcha: 'true', _next: window.location.href, _template: 'table', ...fields })
        .forEach(([key, value]) => body.append(key, value));

    const response = await fetchWithRetry(FORMSUBMIT_URL, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);

    const data = await response.json();
    if (!data.success) throw new Error(`Erreur FormSubmit: ${data.message || 'Envoi échoué'}`);
}

function getNetworkErrorMessage(err, fallback) {
    if (err.name === 'TimeoutError') return 'Le délai d\'attente a été dépassé. Vérifiez votre connexion et réessayez.';
    if (err.message.includes('Failed to fetch')) return 'Problème de connexion. Vérifiez votre réseau et réessayez.';
    return fallback;
}

function addFieldValidation(input, isValid, message) {
    if (!input) return;

    const update = () => {
        const value = input.value.trim();
        const invalid = value !== '' && !isValid(value);
        input.classList.toggle('is-invalid', invalid);
        if (invalid) {
            input.setAttribute('aria-invalid', 'true');
            input.title = message;
        } else {
            input.removeAttribute('aria-invalid');
            input.removeAttribute('title');
        }
    };

    input.addEventListener('blur', update);
    input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) update();
    });
}

function bindFormSubmission(form, { validate, getFields, messages }) {
    const button = form.querySelector('button[type="submit"]');
    const label = button.querySelector('span');
    const icon = button.querySelector('i');
    const original = { label: label?.textContent, icon: icon?.className };

    const setButton = (text, iconClass, background = '') => {
        if (label) label.textContent = text;
        if (icon) icon.className = iconClass;
        button.style.background = background;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        if (formData.get('_gotcha')) return;

        const value = (key) => formData.get(key)?.trim() || '';
        const error = validate(value);
        if (error) {
            showNotification(error, 'error');
            return;
        }

        button.disabled = true;
        button.style.opacity = '0.7';
        setButton(messages.loading, 'fas fa-spinner fa-spin');

        try {
            await sendToFormSubmit(getFields(value));
            setButton(messages.done, 'fas fa-check', 'linear-gradient(135deg, #059669, #10b981)');
            showNotification(messages.success, 'success');
            form.reset();
        } catch (err) {
            console.error('Erreur formulaire :', err);
            setButton('Erreur', 'fas fa-exclamation-triangle', 'linear-gradient(135deg, #dc2626, #ef4444)');
            showNotification(getNetworkErrorMessage(err, messages.error), 'error');
        } finally {
            button.style.opacity = '';
            setTimeout(() => {
                setButton(original.label, original.icon);
                button.disabled = false;
            }, BUTTON_RESET_DELAY);
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    addFieldValidation(form.querySelector('#nom'), v => v.length >= 2, 'Le nom doit contenir au moins 2 caractères');
    addFieldValidation(form.querySelector('#prenom'), v => v.length >= 2, 'Le prénom doit contenir au moins 2 caractères');
    addFieldValidation(form.querySelector('#email'), v => EMAIL_REGEX.test(v), 'Format d\'email invalide');
    addFieldValidation(form.querySelector('#message'), v => v.length >= 10, 'Le message doit contenir au moins 10 caractères');

    bindFormSubmission(form, {
        validate: (value) => {
            if (['nom', 'prenom', 'email', 'sujet', 'message'].some(key => !value(key))) {
                return 'Veuillez remplir tous les champs obligatoires.';
            }
            if (value('nom').length < 2 || value('prenom').length < 2) {
                return 'Le nom et prénom doivent contenir au moins 2 caractères.';
            }
            if (value('message').length < 10) return 'Le message doit contenir au moins 10 caractères.';
            if (!EMAIL_REGEX.test(value('email'))) return 'Veuillez entrer une adresse email valide.';
            return null;
        },
        getFields: (value) => ({
            _subject: `Contact Euromag Fusion - ${value('sujet')}`,
            nom: value('nom'),
            prenom: value('prenom'),
            email: value('email'),
            sujet: value('sujet'),
            message: value('message'),
            ...(value('telephone') && { telephone: `${value('country-code')} ${value('telephone')}` }),
            type_formulaire: 'contact_general',
            date_envoi: new Date().toLocaleString('fr-FR')
        }),
        messages: {
            loading: 'Envoi en cours...',
            done: 'Envoyé !',
            success: 'Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.',
            error: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
        }
    });
}

function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    const emailInput = form.querySelector('input[type="email"]');
    addFieldValidation(emailInput, v => EMAIL_REGEX.test(v), 'Format d\'email invalide');

    bindFormSubmission(form, {
        validate: (value) => {
            if (!EMAIL_REGEX.test(value('email'))) {
                emailInput.focus();
                return value('email') ? 'Veuillez entrer une adresse email valide.' : 'Veuillez entrer votre adresse email.';
            }
            return null;
        },
        getFields: (value) => ({
            _subject: 'Newsletter - Concerts Euromag Fusion',
            email: value('email'),
            type_formulaire: 'newsletter_concerts',
            type_inscription: 'newsletter_concerts',
            interet: 'Concerts et spectacles',
            date_inscription: new Date().toLocaleString('fr-FR')
        }),
        messages: {
            loading: 'Inscription...',
            done: 'Inscrit !',
            success: 'Inscription réussie ! Vous recevrez toutes les actualités de nos concerts.',
            error: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
        }
    });
}
