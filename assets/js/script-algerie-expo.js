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
    particles: document.getElementById('particles'),
    floatingExhibitorBtn: document.getElementById('floatingExhibitorBtn'),
    exhibitorBtn: document.getElementById('exhibitorBtn'),
    contactModal: document.getElementById('contactModal'),
    contactForm: document.getElementById('contactForm'),
    closeContactModal: document.getElementById('closeContactModal')
};

// ===== GESTION DU CLEANUP GLOBAL =====
let globalCleanupFunctions = [];

function addCleanupFunction(fn) {
    if (typeof fn === 'function') {
        globalCleanupFunctions.push(fn);
    }
}

function executeAllCleanup() {
    globalCleanupFunctions.forEach((cleanup, index) => {
        try {
            cleanup();
        } catch (error) {
            console.error(`Erreur lors du cleanup ${index + 1}:`, error);
        }
    });
    globalCleanupFunctions = [];
}

// ===== GESTION DU BOUTON FLOTTANT DYNAMIQUE =====
function initDynamicFloatingButton() {
    const floatingBtn = document.getElementById('floatingExhibitorBtn');
    const btnContainer = document.getElementById('floating-btn-container');
    const exhibitorSection = document.getElementById('become-exhibitor-section');

    if (!floatingBtn || !btnContainer || !exhibitorSection) {
        console.warn('Éléments requis non trouvés pour le bouton flottant');
        return null;
    }

    let isInSection = false;
    let originalParent = floatingBtn.parentElement;
    let ticking = false;

    // Configuration des options pour l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Active quand 20% de la section est visible
        threshold: 0
    };

    // Fonction pour déplacer le bouton vers la section
    function moveBtnToSection() {
        if (isInSection) return;

        isInSection = true;

        // Créer une transition fluide
        floatingBtn.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        floatingBtn.style.transform = 'scale(0.8)';
        floatingBtn.style.opacity = '0.7';

        setTimeout(() => {
            // Déplacer dans le conteneur de la section
            btnContainer.appendChild(floatingBtn);

            // Réinitialiser les styles
            floatingBtn.style.position = 'static';
            floatingBtn.style.right = 'auto';
            floatingBtn.style.bottom = 'auto';
            floatingBtn.style.transform = 'scale(1)';
            floatingBtn.style.opacity = '1';
            floatingBtn.style.width = '100%';
            floatingBtn.style.zIndex = 'auto';
            floatingBtn.style.borderRadius = '50px';

            // Ajouter une classe pour les styles spécifiques
            floatingBtn.classList.add('btn-in-section');
        }, 300);
    }

    // Fonction pour remettre le bouton à sa position flottante
    function moveBtnToFloat() {
        if (!isInSection) return;

        isInSection = false;

        // Créer une transition fluide
        floatingBtn.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        floatingBtn.style.transform = 'scale(0.8)';
        floatingBtn.style.opacity = '0.7';

        setTimeout(() => {
            // Remettre dans le conteneur original
            originalParent.appendChild(floatingBtn);

            // Réinitialiser les styles flottants
            floatingBtn.style.position = 'fixed';
            floatingBtn.style.right = '30px';
            floatingBtn.style.bottom = '30%';
            floatingBtn.style.transform = 'scale(1)';
            floatingBtn.style.opacity = '1';
            floatingBtn.style.width = 'auto';
            floatingBtn.style.zIndex = '1500';
            floatingBtn.style.borderRadius = '50px';

            // Retirer la classe spécifique à la section
            floatingBtn.classList.remove('btn-in-section');
        }, 300);
    }

    // Callback pour l'Intersection Observer
    function handleIntersection(entries) {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(() => {
            entries.forEach(entry => {
                if (entry.target === exhibitorSection) {
                    if (entry.isIntersecting) {
                        // La section est visible
                        moveBtnToSection();
                    } else {
                        // La section n'est plus visible
                        moveBtnToFloat();
                    }
                }
            });
            ticking = false;
        });
    }

    // Créer l'observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Commencer à observer la section
    observer.observe(exhibitorSection);

    // Fonction de nettoyage pour éviter les fuites mémoire
    function cleanup() {
        observer.disconnect();
        if (isInSection) {
            moveBtnToFloat();
        }
    }

    // Gérer le redimensionnement de fenêtre
    let resizeTimeout;
    const resizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Réajuster la position si nécessaire
            if (!isInSection) {
                updateFloatingPosition();
            }
        }, 250);
    };

    window.addEventListener('resize', resizeHandler);

    // Fonction pour mettre à jour la position flottante selon la taille d'écran
    function updateFloatingPosition() {
        if (isInSection) return;

        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            floatingBtn.style.right = '20px';
            floatingBtn.style.bottom = '25%';
        } else {
            floatingBtn.style.right = '30px';
            floatingBtn.style.bottom = '30%';
        }
    }

    // Retourner la fonction de nettoyage améliorée
    return function cleanupDynamic() {
        window.removeEventListener('resize', resizeHandler);
        cleanup();
    };
}

// ===== FLOATING EXHIBITOR BUTTON FUNCTIONALITY =====
function initFloatingButton() {
    if (!elements.floatingExhibitorBtn || !elements.exhibitorBtn) {
        console.warn('Éléments du bouton flottant non trouvés');
        return null;
    }

    let lastScrollY = window.pageYOffset;
    let cleanupDynamic;
    let scrollListener;
    let clickHandler;
    let isDestroyed = false;

    // Vérifier la validité avant toute opération
    function checkValidity() {
        if (isDestroyed) {
            console.warn('Tentative d\'utilisation d\'un bouton flottant détruit');
            return false;
        }
        return elements.floatingExhibitorBtn && 
               elements.exhibitorBtn && 
               document.body.contains(elements.floatingExhibitorBtn);
    }

    // Initialiser le système de déplacement dynamique
    try {
        cleanupDynamic = initDynamicFloatingButton();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du bouton dynamique:', error);
        return null;
    }

    function updateButtonPosition() {
        if (!checkValidity()) return;

        // Ne mettre à jour la position que si le bouton est en mode flottant
        const isInSection = elements.floatingExhibitorBtn.classList.contains('btn-in-section');
        if (isInSection) return;

        const currentScrollY = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = currentScrollY / (documentHeight - viewportHeight);

        // Position du bouton entre 20% et 70% de la hauteur de l'écran
        const minPosition = 20;
        const maxPosition = 70;
        const newPosition = minPosition + (scrollPercentage * (maxPosition - minPosition));

        elements.floatingExhibitorBtn.style.bottom = `${100 - newPosition}%`;
        elements.floatingExhibitorBtn.style.transform = `translateY(-50%)`;

        lastScrollY = currentScrollY;
    }

    // Créer le listener avec vérification
    scrollListener = throttle(function() {
        if (checkValidity()) {
            updateButtonPosition();
        }
    }, 16);

    // Écouter le scroll
    window.addEventListener('scroll', scrollListener, { passive: true });

    // Click handler pour ouvrir le modal
    clickHandler = function() {
        if (checkValidity()) {
            openContactModal();
        }
    };
    elements.exhibitorBtn.addEventListener('click', clickHandler);

    // Position initiale
    updateButtonPosition();

    // Retourner la fonction de cleanup complète
    return function cleanup() {
        try {
            // Marquer comme détruit
            isDestroyed = true;
            
            // Nettoyer les event listeners
            if (scrollListener) {
                window.removeEventListener('scroll', scrollListener);
                scrollListener = null;
            }
            
            if (elements.exhibitorBtn && clickHandler) {
                elements.exhibitorBtn.removeEventListener('click', clickHandler);
                clickHandler = null;
            }
            
            // Nettoyer le système dynamique
            if (cleanupDynamic && typeof cleanupDynamic === 'function') {
                cleanupDynamic();
                cleanupDynamic = null;
            }
            
            // Remettre le bouton à sa position par défaut si nécessaire
            if (elements.floatingExhibitorBtn && 
                elements.floatingExhibitorBtn.classList.contains('btn-in-section')) {
                
                const originalParent = document.querySelector('.floating-exhibitor-btn')?.parentElement;
                if (originalParent && originalParent !== elements.floatingExhibitorBtn.parentElement) {
                    originalParent.appendChild(elements.floatingExhibitorBtn);
                    elements.floatingExhibitorBtn.classList.remove('btn-in-section');
                }
            }
            
        } catch (error) {
            console.error('Erreur lors du cleanup du bouton flottant:', error);
        }
    };
}

// ===== STYLES CSS DYNAMIQUES POUR LE BOUTON =====
function addDynamicButtonStyles() {
    // Vérifier si les styles ont déjà été ajoutés
    if (document.getElementById('dynamic-button-styles')) return;

    const style = document.createElement('style');
    style.id = 'dynamic-button-styles';
    style.textContent = `
        /* Transition fluide pour le bouton */
        .floating-exhibitor-btn {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* Styles spécifiques quand le bouton est dans la section */
        .floating-exhibitor-btn.btn-in-section {
            position: static !important;
            right: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: 100% !important;
            animation: none !important;
            box-shadow: 0 8px 32px rgba(225, 29, 72, 0.25) !important;
            border-radius = 50px;
        }
        
        .floating-exhibitor-btn.btn-in-section .exhibitor-btn {
            width: 100%;
            min-width: auto;
            justify-content: center;
        }
        
        .floating-exhibitor-btn.btn-in-section .exhibitor-btn:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 40px rgba(225, 29, 72, 0.4);
        }
        
        /* Animation d'entrée pour la section */
        .become-exhibitor-section {
            opacity: 0;
            transform: translateY(30px);
            animation: sectionFadeIn 0.8s ease 0.2s forwards;
        }
        
        @keyframes sectionFadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Responsive pour le bouton dans la section */
        @media (max-width: 768px) {
            .floating-exhibitor-btn.btn-in-section .exhibitor-btn {
                padding: 12px 18px;
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .floating-exhibitor-btn.btn-in-section .exhibitor-btn {
                padding: 10px 15px;
                font-size: 0.8rem;
            }
            
            .floating-exhibitor-btn.btn-in-section .exhibitor-btn span {
                display: inline !important;
            }
            
            .floating-exhibitor-btn.btn-in-section .exhibitor-btn::after {
                display: none !important;
            }
        }
    `;

    document.head.appendChild(style);
}

// ===== FONCTION D'ANIMATION D'ENTRÉE POUR LES CARTES =====
function initExhibitorSectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.benefit-card, .cta-card, .section-header'
    );

    elementsToAnimate.forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            observer.observe(el);
        }
    });

    // Retourner fonction de cleanup pour cet observer aussi
    return function cleanupAnimations() {
        observer.disconnect();
    };
}

// ===== FONCTION D'INITIALISATION GÉNÉRALE =====
function initExhibitorSection() {
    // Ajouter les styles dynamiques
    addDynamicButtonStyles();

    // Initialiser les animations et récupérer le cleanup
    const animationsCleanup = initExhibitorSectionAnimations();
    if (animationsCleanup) {
        addCleanupFunction(animationsCleanup);
    }

    // Écouter les changements de visibilité pour optimiser les performances
    const visibilityHandler = function() {
        if (document.hidden) {
            // Mettre en pause les animations non critiques
            const floatingBtn = document.getElementById('floatingExhibitorBtn');
            if (floatingBtn && !floatingBtn.classList.contains('btn-in-section')) {
                floatingBtn.style.animationPlayState = 'paused';
            }
        } else {
            // Reprendre les animations
            const floatingBtn = document.getElementById('floatingExhibitorBtn');
            if (floatingBtn && !floatingBtn.classList.contains('btn-in-section')) {
                floatingBtn.style.animationPlayState = 'running';
            }
        }
    };

    document.addEventListener('visibilitychange', visibilityHandler);

    // Retourner cleanup pour le visibility handler
    return function cleanupExhibitorSection() {
        document.removeEventListener('visibilitychange', visibilityHandler);
    };
}

// ===== CONTACT MODAL FUNCTIONALITY =====
function openContactModal() {
    if (elements.contactModal) {
        elements.contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Focus sur le premier champ
        const firstInput = elements.contactModal.querySelector('input[type="text"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
    }
}

function closeContactModal() {
    if (elements.contactModal) {
        elements.contactModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function initContactModal() {
    if (!elements.contactModal) return null;

    // Close button
    const closeHandler = () => closeContactModal();
    if (elements.closeContactModal) {
        elements.closeContactModal.addEventListener('click', closeHandler);
    }

    // Click outside to close
    const clickOutsideHandler = function(e) {
        if (e.target === elements.contactModal) {
            closeContactModal();
        }
    };
    elements.contactModal.addEventListener('click', clickOutsideHandler);

    // Type de client change handler
    const typeClientSelect = document.getElementById('typeClient');
    const entrepriseFields = document.getElementById('entrepriseFields');
    const nomEntreprise = document.getElementById('nomEntreprise');
    const secteurActivite = document.getElementById('secteurActivite');

    let typeChangeHandler = null;
    if (typeClientSelect && entrepriseFields) {
        typeChangeHandler = function() {
            if (this.value === 'entreprise') {
                entrepriseFields.style.display = 'block';
                if (nomEntreprise) nomEntreprise.required = true;
                if (secteurActivite) secteurActivite.required = true;
            } else {
                entrepriseFields.style.display = 'none';
                if (nomEntreprise) {
                    nomEntreprise.required = false;
                    nomEntreprise.value = '';
                }
                if (secteurActivite) {
                    secteurActivite.required = false;
                    secteurActivite.value = '';
                }
            }
        };
        typeClientSelect.addEventListener('change', typeChangeHandler);
    }

    // Retourner fonction de cleanup
    return function cleanupContactModal() {
        if (elements.closeContactModal && closeHandler) {
            elements.closeContactModal.removeEventListener('click', closeHandler);
        }
        if (elements.contactModal && clickOutsideHandler) {
            elements.contactModal.removeEventListener('click', clickOutsideHandler);
        }
        if (typeClientSelect && typeChangeHandler) {
            typeClientSelect.removeEventListener('change', typeChangeHandler);
        }
    };
}

function initContactForm() {
    if (!elements.contactForm) return null;

    const submitBtn = elements.contactForm.querySelector('.submit-btn');
    const submitSpan = submitBtn?.querySelector('span');
    const submitIcon = submitBtn?.querySelector('i');

    // Regex email plus stricte
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Configuration des timeouts
    const LOADING_TIMEOUT = 30000; // 30 secondes maximum
    const RESET_TIMEOUT = 3000; // 3 secondes pour reset visuel

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(elements.contactForm);

        // Vérification honeypot (anti-bot)
        if (formData.get('_gotcha')) {
            console.warn("Bot détecté, soumission ignorée");
            return;
        }

        // Validation des champs obligatoires avec trim
        const nom = formData.get('nom')?.trim();
        const prenom = formData.get('prenom')?.trim();
        const typeClient = formData.get('typeClient');
        const email = formData.get('email')?.trim();
        const codePostal = formData.get('codePostal')?.trim();

        // Vérifications de base
        if (!nom || !prenom || !typeClient || !email || !codePostal) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Validation longueur minimale
        if (nom.length < 2 || prenom.length < 2) {
            showNotification('Le nom et prénom doivent contenir au moins 2 caractères.', 'error');
            return;
        }

        // Vérification email
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Vérification code postal
        const codePostalRegex = /^[0-9]{5}$/;
        if (!codePostalRegex.test(codePostal)) {
            showNotification('Veuillez entrer un code postal valide (5 chiffres).', 'error');
            return;
        }

        // Vérifications spécifiques pour entreprise
        if (typeClient === 'entreprise') {
            const nomEntreprise = formData.get('nomEntreprise')?.trim();
            const secteurActivite = formData.get('secteurActivite')?.trim();

            if (!nomEntreprise || !secteurActivite) {
                showNotification('Veuillez remplir le nom de l\'entreprise et le secteur d\'activité.', 'error');
                return;
            }

            if (nomEntreprise.length < 2 || secteurActivite.length < 2) {
                showNotification('Le nom de l\'entreprise et le secteur d\'activité doivent contenir au moins 2 caractères.', 'error');
                return;
            }
        }

        // État de chargement
        const originalSpanText = submitSpan?.textContent || 'Envoyer ma demande';
        const originalIconClass = submitIcon?.className || 'fas fa-paper-plane';

        if (submitSpan) submitSpan.textContent = 'Envoi en cours...';
        if (submitIcon) submitIcon.className = 'fas fa-spinner fa-spin';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        }

        // Timeout de sécurité
        const timeoutId = setTimeout(() => {
            throw new Error('Délai d\'attente dépassé');
        }, LOADING_TIMEOUT);

        try {
            // Préparation des données pour FormSubmit
            const cleanFormData = new FormData();
            
            // Champs requis par FormSubmit
            cleanFormData.append('_subject', 'Demande Exposant - Algérie Expo');
            cleanFormData.append('_captcha', 'true');
            cleanFormData.append('_next', window.location.href);
            cleanFormData.append('_template', 'table');
            
            // Données du formulaire avec formatage
            cleanFormData.append('nom', nom);
            cleanFormData.append('prenom', prenom);
            cleanFormData.append('type_client', typeClient);
            cleanFormData.append('email', email);
            cleanFormData.append('code_postal', codePostal);

            if (typeClient === 'entreprise') {
                const nomEntreprise = formData.get('nomEntreprise')?.trim();
                const secteurActivite = formData.get('secteurActivite')?.trim();
                if (nomEntreprise) cleanFormData.append('nom_entreprise', nomEntreprise);
                if (secteurActivite) cleanFormData.append('secteur_activite', secteurActivite);
            }

            const fonction = formData.get('fonction')?.trim();
            if (fonction) cleanFormData.append('fonction', fonction);

            const adresse = formData.get('adresse')?.trim();
            if (adresse) cleanFormData.append('adresse', adresse);

            const ville = formData.get('ville')?.trim();
            if (ville) cleanFormData.append('ville', ville);

            const message = formData.get('message')?.trim();
            if (message) cleanFormData.append('message', message);

            cleanFormData.append('type_formulaire', 'exposant_algerie_expo');
            cleanFormData.append('date_envoi', new Date().toLocaleString('fr-FR'));

            // Envoi via FormSubmit avec retry logic
            const response = await fetchWithRetry('https://formsubmit.co/ajax/fusioneuromag@gmail.com', {
                method: "POST",
                body: cleanFormData,
                headers: { 
                    "Accept": "application/json"
                }
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const responseData = await response.json();
                
                if (responseData.success) {
                    // État de succès
                    if (submitSpan) submitSpan.textContent = 'Envoyé !';
                    if (submitIcon) submitIcon.className = 'fas fa-check';
                    if (submitBtn) {
                        submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                        submitBtn.style.opacity = '1';
                    }

                    showNotification('Votre demande a été envoyée avec succès ! Nous vous recontacterons bientôt.', 'success');

                    // Fermer le modal après succès
                    setTimeout(() => {
                        closeContactModal();
                        elements.contactForm.reset();

                        // Réinitialiser les champs entreprise
                        const entrepriseFields = document.getElementById('entrepriseFields');
                        if (entrepriseFields) {
                            entrepriseFields.style.display = 'none';
                        }
                    }, 2000);

                    // Analytics optionnel
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'exhibitor_request', {
                            event_category: 'engagement',
                            event_label: 'Demande Exposant Algérie Expo',
                            custom_map: { 'custom_parameter_1': 'algerie_expo_exhibitor' }
                        });
                    }
                } else {
                    throw new Error(`Erreur FormSubmit: ${responseData.message || 'Envoi échoué'}`);
                }
            } else {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }

        } catch (err) {
            clearTimeout(timeoutId);
            console.error('Erreur formulaire contact:', err);

            // État d'erreur
            if (submitSpan) submitSpan.textContent = 'Erreur';
            if (submitIcon) submitIcon.className = 'fas fa-exclamation-triangle';
            if (submitBtn) submitBtn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';

            // Message d'erreur plus spécifique
            let errorMessage = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
            if (err.message.includes('Délai')) {
                errorMessage = 'Le délai d\'attente a été dépassé. Vérifiez votre connexion et réessayez.';
            } else if (err.message.includes('Failed to fetch')) {
                errorMessage = 'Problème de connexion. Vérifiez votre réseau et réessayez.';
            }

            showNotification(errorMessage, 'error');
        } finally {
            // Réinitialisation après délai
            setTimeout(() => {
                if (submitSpan) submitSpan.textContent = originalSpanText;
                if (submitIcon) submitIcon.className = originalIconClass;
                if (submitBtn) {
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '';
                    submitBtn.disabled = false;
                }
            }, RESET_TIMEOUT);
        }
    };

    // Fonction de retry pour les requêtes
    async function fetchWithRetry(url, options, maxRetries = 2) {
        let lastError;
        
        for (let i = 0; i <= maxRetries; i++) {
            try {
                const response = await fetch(url, options);
                return response;
            } catch (error) {
                lastError = error;
                if (i < maxRetries) {
                    // Attendre avant de réessayer (exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                }
            }
        }
        
        throw lastError;
    }

    // Validation en temps réel améliorée
    function setupRealTimeValidation() {
        const nomInput = elements.contactForm.querySelector('#nom');
        const prenomInput = elements.contactForm.querySelector('#prenom');
        const emailInput = elements.contactForm.querySelector('#email');
        const codePostalInput = elements.contactForm.querySelector('#codePostal');
        const nomEntrepriseInput = elements.contactForm.querySelector('#nomEntreprise');
        const secteurActiviteInput = elements.contactForm.querySelector('#secteurActivite');

        const validators = {
            nom: {
                element: nomInput,
                validate: (value) => value.trim().length >= 2,
                message: 'Le nom doit contenir au moins 2 caractères'
            },
            prenom: {
                element: prenomInput,
                validate: (value) => value.trim().length >= 2,
                message: 'Le prénom doit contenir au moins 2 caractères'
            },
            email: {
                element: emailInput,
                validate: (value) => emailRegex.test(value),
                message: 'Format d\'email invalide'
            },
            codePostal: {
                element: codePostalInput,
                validate: (value) => /^[0-9]{5}$/.test(value),
                message: 'Code postal invalide (5 chiffres requis)'
            },
            nomEntreprise: {
                element: nomEntrepriseInput,
                validate: (value) => value.trim().length >= 2,
                message: 'Le nom de l\'entreprise doit contenir au moins 2 caractères'
            },
            secteurActivite: {
                element: secteurActiviteInput,
                validate: (value) => value.trim().length >= 2,
                message: 'Le secteur d\'activité doit contenir au moins 2 caractères'
            }
        };

        Object.values(validators).forEach(({ element, validate, message }) => {
            if (element) {
                element.addEventListener('blur', function() {
                    const value = this.value.trim();
                    if (value && !validate(value)) {
                        this.style.borderColor = '#dc2626';
                        this.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                        this.setAttribute('aria-invalid', 'true');
                        this.setAttribute('title', message);
                    } else {
                        this.style.borderColor = '';
                        this.style.boxShadow = '';
                        this.removeAttribute('aria-invalid');
                        this.removeAttribute('title');
                    }
                });
            }
        });

        return validators;
    }

    elements.contactForm.addEventListener('submit', submitHandler);
    const validators = setupRealTimeValidation();

    // Retourner fonction de cleanup améliorée
    return function cleanupContactForm() {
        if (elements.contactForm && submitHandler) {
            elements.contactForm.removeEventListener('submit', submitHandler);
        }
        
        // Nettoyer les validateurs
        Object.values(validators).forEach(({ element }) => {
            if (element) {
                element.removeEventListener('blur', element.validationHandler);
            }
        });
    };
}

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
            animation: floatElement ${animationDuration}s ease-in-out infinite;
            animation-delay: ${Math.random() * -20}s;
            pointer-events: none;
        `;

        elements.particles.appendChild(particle);
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Styles pour les différents types
    const styles = {
        success: 'linear-gradient(135deg, #059669, #10b981)',
        error: 'linear-gradient(135deg, #dc2626, #ef4444)',
        info: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    };

    notification.style.cssText = `
        position: fixed; 
        top: 100px; 
        right: 20px;
        background: ${styles[type] || styles.info};
        color: white; 
        padding: 1rem 2rem; 
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); 
        z-index: 3000; 
        animation: slideInRight 0.3s ease;
        max-width: 350px; 
        font-weight: 600;
        font-size: 0.95rem;
        line-height: 1.4;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    // Ajouter les styles d'animation dans le head si pas déjà présents
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    const linkHandlers = [];

    links.forEach(link => {
        const handler = function(e) {
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
        };

        link.addEventListener('click', handler);
        linkHandlers.push({ link, handler });
    });

    // Retourner fonction de cleanup
    return function cleanupSmoothScrolling() {
        linkHandlers.forEach(({ link, handler }) => {
            link.removeEventListener('click', handler);
        });
    };
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    let scrollHandler;
    let scrollTopHandler;
    let notifyHandler;
    let keydownHandler;

    // Scroll events
    scrollHandler = throttle(handleScroll, 16);
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Scroll to top button
    if (elements.scrollTop) {
        scrollTopHandler = scrollToTop;
        elements.scrollTop.addEventListener('click', scrollTopHandler);
    }

    // Notification button - scroll to newsletter section
    if (elements.notifyBtn) {
        notifyHandler = function() {
            const newsletterSection = document.getElementById('newsletter-section');
            if (newsletterSection) {
                const offsetTop = newsletterSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        };
        elements.notifyBtn.addEventListener('click', notifyHandler);
    }

    // Close modals with Escape key
    keydownHandler = function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                if (openModal.id === 'contactModal') {
                    closeContactModal();
                } else {
                    openModal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }
        }
    };
    window.addEventListener('keydown', keydownHandler);

    // Retourner fonction de cleanup
    return function cleanupEventListeners() {
        if (scrollHandler) {
            window.removeEventListener('scroll', scrollHandler);
        }
        if (elements.scrollTop && scrollTopHandler) {
            elements.scrollTop.removeEventListener('click', scrollTopHandler);
        }
        if (elements.notifyBtn && notifyHandler) {
            elements.notifyBtn.removeEventListener('click', notifyHandler);
        }
        if (keydownHandler) {
            window.removeEventListener('keydown', keydownHandler);
        }
    };
}

// ===== NEWSLETTER FUNCTIONALITY =====
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return null;

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const submitSpan = submitBtn?.querySelector('span');
    const submitIcon = submitBtn?.querySelector('i');

    // Regex email plus stricte
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Configuration des timeouts
    const LOADING_TIMEOUT = 30000; // 30 secondes maximum
    const RESET_TIMEOUT = 3000; // 3 secondes pour reset visuel

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(newsletterForm);

        // Vérification honeypot (anti-bot)
        if (formData.get('_gotcha')) {
            console.warn("Bot détecté, soumission ignorée");
            return;
        }

        // Validation de l'email avec trim
        const email = formData.get('email')?.trim() || emailInput?.value.trim();

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
        const originalSpanText = submitSpan?.textContent || "S'inscrire";
        const originalIconClass = submitIcon?.className || "fas fa-paper-plane";

        if (submitSpan) submitSpan.textContent = "Inscription...";
        if (submitIcon) submitIcon.className = "fas fa-spinner fa-spin";
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
        }

        // Timeout de sécurité
        const timeoutId = setTimeout(() => {
            throw new Error('Délai d\'attente dépassé');
        }, LOADING_TIMEOUT);

        try {
            // Préparation des données
            const cleanFormData = new FormData();

            // Champs pour le formulaire
            cleanFormData.append('_subject', 'Newsletter - Salon Algérie Expo');
            cleanFormData.append('_next', window.location.href);
            cleanFormData.append('_template', 'table');

            // Données du formulaire avec formatage
            cleanFormData.append('email', email);
            cleanFormData.append('type_formulaire', 'newsletter_algerie_expo');
            cleanFormData.append('date_inscription', new Date().toLocaleString('fr-FR'));

            // Envoi avec retry logic
            const response = await fetchWithRetry(newsletterForm.action, {
                method: "POST",
                body: cleanFormData,
                headers: {
                    "Accept": "application/json"
                }
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                // État de succès
                if (submitSpan) submitSpan.textContent = "Inscrit !";
                if (submitIcon) submitIcon.className = "fas fa-check";
                if (submitBtn) {
                    submitBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
                    submitBtn.style.opacity = "1";
                }

                showNotification("Inscription réussie ! Vous recevrez toutes les actualités d'Algérie Expo", "success");

                // Réinitialiser le formulaire
                newsletterForm.reset();

                // Analytics optionnel
                if (typeof gtag !== "undefined") {
                    gtag("event", "newsletter_signup", {
                        event_category: "engagement",
                        event_label: "Inscription Algérie Expo",
                        custom_map: { 'custom_parameter_1': 'algerie_expo_newsletter' }
                    });
                }

                // Facebook Pixel optionnel
                if (typeof fbq !== "undefined") {
                    fbq("track", "Lead", {
                        content_name: "Newsletter Algérie Expo",
                        content_category: "newsletter"
                    });
                }
            } else {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }

        } catch (err) {
            clearTimeout(timeoutId);
            console.error("Erreur formulaire newsletter:", err);

            // État d'erreur
            if (submitSpan) submitSpan.textContent = "Erreur";
            if (submitIcon) submitIcon.className = "fas fa-exclamation-triangle";
            if (submitBtn) submitBtn.style.background = "linear-gradient(135deg, #dc2626, #ef4444)";

            // Message d'erreur plus spécifique
            let errorMessage = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
            if (err.message.includes('Délai')) {
                errorMessage = 'Le délai d\'attente a été dépassé. Vérifiez votre connexion et réessayez.';
            } else if (err.message.includes('Failed to fetch')) {
                errorMessage = 'Problème de connexion. Vérifiez votre réseau et réessayez.';
            }

            showNotification(errorMessage, "error");
        } finally {
            // Réinitialisation après délai
            setTimeout(() => {
                if (submitSpan) submitSpan.textContent = originalSpanText;
                if (submitIcon) submitIcon.className = originalIconClass;
                if (submitBtn) {
                    submitBtn.style.background = "";
                    submitBtn.style.opacity = "";
                    submitBtn.disabled = false;
                }
            }, RESET_TIMEOUT);
        }
    };

    // Fonction de retry pour les requêtes
    async function fetchWithRetry(url, options, maxRetries = 2) {
        let lastError;
        
        for (let i = 0; i <= maxRetries; i++) {
            try {
                const response = await fetch(url, options);
                return response;
            } catch (error) {
                lastError = error;
                if (i < maxRetries) {
                    // Attendre avant de réessayer (exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                }
            }
        }
        
        throw lastError;
    }

    // Validation en temps réel améliorée
    function setupRealTimeValidation() {
        const validators = {
            email: {
                element: emailInput,
                validate: (value) => emailRegex.test(value),
                message: 'Format d\'email invalide'
            }
        };

        Object.values(validators).forEach(({ element, validate, message }) => {
            if (element) {
                element.addEventListener('blur', function() {
                    const value = this.value.trim();
                    if (value && !validate(value)) {
                        this.style.borderColor = '#dc2626';
                        this.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                        this.setAttribute('aria-invalid', 'true');
                        this.setAttribute('title', message);
                    } else {
                        this.style.borderColor = '';
                        this.style.boxShadow = '';
                        this.removeAttribute('aria-invalid');
                        this.removeAttribute('title');
                    }
                });

                // Validation en temps réel pendant la saisie
                element.addEventListener('input', function() {
                    const value = this.value.trim();
                    if (value && !validate(value)) {
                        this.style.borderColor = '#dc2626';
                        this.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                    } else {
                        this.style.borderColor = '';
                        this.style.boxShadow = '';
                    }
                });
            }
        });

        return validators;
    }

    newsletterForm.addEventListener('submit', submitHandler);
    const validators = setupRealTimeValidation();

    // Retourner fonction de cleanup améliorée
    return function cleanupNewsletterForm() {
        if (newsletterForm && submitHandler) {
            newsletterForm.removeEventListener('submit', submitHandler);
        }
        
        // Nettoyer les validateurs
        Object.values(validators).forEach(({ element }) => {
            if (element) {
                element.removeEventListener('blur', element.validationHandler);
                element.removeEventListener('input', element.inputHandler);
            }
        });
    };
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

// ===== ÉVÉNEMENTS DE CLEANUP AUTOMATIQUE =====
function initGlobalCleanup() {
    // 1. Avant fermeture/rechargement de page
    window.addEventListener('beforeunload', function() {
        executeAllCleanup();
    });

    // 2. Gestion des erreurs globales
    window.addEventListener('error', function(event) {
        console.error('Erreur JavaScript détectée:', event.error);
        
        // En cas d'erreur critique, nettoyer pour éviter les fuites
        if (event.error.message.includes('cleanup') || 
            event.error.message.includes('observer') ||
            event.error.message.includes('memory')) {
            executeAllCleanup();
        }
    });

    // 3. Gestion spécifique pour les erreurs non capturées
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Promise rejetée non gérée:', event.reason);
        
        // Nettoyer si l'erreur semble liée aux observers
        if (event.reason?.message?.includes('observer') || 
            event.reason?.message?.includes('intersection')) {
            executeAllCleanup();
        }
    });

    // 4. Détection de navigation SPA (si applicable)
    if (window.history && window.history.pushState) {
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = function() {
            executeAllCleanup();
            return originalPushState.apply(window.history, arguments);
        };

        window.history.replaceState = function() {
            executeAllCleanup();
            return originalReplaceState.apply(window.history, arguments);
        };

        window.addEventListener('popstate', function() {
            executeAllCleanup();
        });
    }
}

// ===== FONCTION DE CLEANUP MANUELLE (pour debug) =====
window.debugCleanup = function() {
    executeAllCleanup();
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    // Initialiser le système de cleanup global
    initGlobalCleanup();

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

    // Initialiser les fonctionnalités et collecter les fonctions de cleanup
    const eventListenersCleanup = initEventListeners();
    if (eventListenersCleanup) addCleanupFunction(eventListenersCleanup);

    const smoothScrollingCleanup = initSmoothScrolling();
    if (smoothScrollingCleanup) addCleanupFunction(smoothScrollingCleanup);

    const newsletterCleanup = initNewsletterForm();
    if (newsletterCleanup) addCleanupFunction(newsletterCleanup);

    const contactModalCleanup = initContactModal();
    if (contactModalCleanup) addCleanupFunction(contactModalCleanup);

    const contactFormCleanup = initContactForm();
    if (contactFormCleanup) addCleanupFunction(contactFormCleanup);

    // Initialiser la section exposant
    const exhibitorSectionCleanup = initExhibitorSection();
    if (exhibitorSectionCleanup) addCleanupFunction(exhibitorSectionCleanup);

    // Initialiser le bouton flottant en dernier
    const floatingCleanup = initFloatingButton();
    if (floatingCleanup) addCleanupFunction(floatingCleanup);

    // Créer les particules
    createParticles();

    // Démarrer le countdown
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Ajouter le cleanup pour le countdown
    addCleanupFunction(() => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });

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

    // Cleanup pour cet observer
    addCleanupFunction(() => {
        observer.disconnect();
    });

    // Console message
    console.log('%c🎭 Bienvenue sur Euromag Fusion!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%cSite développé par SL avec ❤️ pour promouvoir la culture algérienne', 'color: #ec4899; font-size: 14px;');
});