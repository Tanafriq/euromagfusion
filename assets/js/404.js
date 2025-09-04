// ===== 404 PAGE JAVASCRIPT - VERSION AMÉLIORÉE =====

// DOM Elements
const elements = {
    glitchOverlay: document.getElementById('glitchOverlay'),
    randomFact: document.getElementById('randomFact'),
    currentYear: document.getElementById('currentYear'),
    homeBtn: document.getElementById('homeBtn'),
    contactBtn: document.getElementById('contactBtn')
};

// Configuration
const CONFIG = {
    glitchInterval: 6000,     // 6 secondes
    glitchDuration: 250,      // 0.25 secondes
    factChangeInterval: 8000, // 8 secondes
    particleCount: 25,        // Nombre de particules
    interactionRadius: 100    // Rayon d'interaction souris
};

// Fun facts array - Plus de faits intéressants
const funFacts = [
    "L'erreur 404 tire son nom du bureau 404 au CERN où était hébergé le premier serveur web !",
    "Le premier site web a été créé en 1990 par Tim Berners-Lee au CERN.",
    "Il existe plus de 1,8 milliard de sites web actifs dans le monde aujourd'hui.",
    "La première page 404 personnalisée a été créée en 1993 par le navigateur Mosaic.",
    "Google traite plus de 8,5 milliards de recherches par jour à travers le monde.",
    "Le World Wide Web compte plus de 60 trilliards de pages web indexées.",
    "La musique algérienne traditionnelle utilise des gammes modales uniques au monde.",
    "L'Algérie possède 7 sites classés au patrimoine mondial de l'UNESCO.",
    "Le couscous algérien est inscrit au patrimoine immatériel de l'humanité depuis 2020.",
    "Les pages 404 les plus créatives peuvent réduire le taux de rebond de 50%.",
    "Le code d'erreur 404 fait partie de la famille des erreurs 4xx (erreurs client).",
    "Tim Berners-Lee n'a jamais breveté le World Wide Web, le gardant libre pour tous.",
    "La culture berbère algérienne remonte à plus de 4000 ans d'histoire.",
    "L'algorithme PageRank de Google tire son nom de Larry Page, l'un des fondateurs."
];

// ===== CLASSE PRINCIPALE =====
class Enhanced404Page {
    constructor() {
        this.glitchTimeout = null;
        this.factInterval = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startGlitchEffect();
        this.startFactRotation();
        this.setCurrentYear();
        this.setupInteractiveElements();
        this.setupPerformanceMonitoring();
        this.createParticleSystem();
        this.handleURLParameters();
        this.setupIntersectionObserver();
    }

    // ===== ÉVÉNEMENTS =====
    setupEventListeners() {
        // Suivi de la souris pour les effets interactifs
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Gestion des touches clavier
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Effets de clic sur les boutons
        this.setupButtonEffects();
        
        // Gestion du redimensionnement
        window.addEventListener('resize', () => this.handleResize());
        
        // Gestion de la visibilité de la page
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Préchargement des images au survol
        this.setupImagePreloading();
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX / window.innerWidth;
        this.mouseY = e.clientY / window.innerHeight;
        
        this.updateFloatingShapes();
        this.updateInteractiveIcons(e.clientX, e.clientY);
    }

    // ===== EFFETS VISUELS =====
    startGlitchEffect() {
        if (!elements.glitchOverlay) return;

        const triggerGlitch = () => {
            // Effet glitch aléatoire
            if (Math.random() > 0.7) {
                elements.glitchOverlay.style.opacity = '1';
                
                setTimeout(() => {
                    elements.glitchOverlay.style.opacity = '0';
                }, CONFIG.glitchDuration);
            }
        };

        // Déclenchement initial
        setTimeout(triggerGlitch, 3000);

        // Effet récurrent avec timing variable
        const scheduleNextGlitch = () => {
            const nextInterval = CONFIG.glitchInterval + (Math.random() * 4000 - 2000);
            this.glitchTimeout = setTimeout(() => {
                triggerGlitch();
                scheduleNextGlitch();
            }, nextInterval);
        };

        scheduleNextGlitch();
    }

    // ===== ROTATION DES FAITS =====
    startFactRotation() {
        if (!elements.randomFact) return;

        let currentFactIndex = 0;

        const changeFact = () => {
            const nextIndex = (currentFactIndex + 1) % funFacts.length;
            
            // Animation de sortie
            elements.randomFact.style.transform = 'translateX(-20px)';
            elements.randomFact.style.opacity = '0';
            
            setTimeout(() => {
                elements.randomFact.textContent = funFacts[nextIndex];
                elements.randomFact.style.transform = 'translateX(20px)';
                
                requestAnimationFrame(() => {
                    elements.randomFact.style.transform = 'translateX(0)';
                    elements.randomFact.style.opacity = '1';
                });
            }, 400);
            
            currentFactIndex = nextIndex;
        };

        this.factInterval = setInterval(changeFact, CONFIG.factChangeInterval);
    }

    // ===== SYSTÈME DE PARTICULES =====
    createParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '3';
        canvas.style.opacity = '0.6';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Création des particules
        for (let i = 0; i < CONFIG.particleCount; i++) {
            this.particles.push(new Particle(canvas.width, canvas.height));
        }
        
        this.animateParticles(ctx, canvas);
    }

    animateParticles(ctx, canvas) {
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
                particle.update(this.mouseX * canvas.width, this.mouseY * canvas.height);
                particle.draw(ctx);
            });
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    // ===== ÉLÉMENTS INTERACTIFS =====
    setupInteractiveElements() {
        // Animation des liens rapides au survol
        const quickLinks = document.querySelectorAll('.quick-link');
        quickLinks.forEach((link, index) => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-8px) scale(1.02)';
                link.style.filter = 'brightness(1.1)';
                
                // Effet de propagation
                quickLinks.forEach((otherLink, otherIndex) => {
                    if (otherIndex !== index) {
                        otherLink.style.transform = 'scale(0.98)';
                        otherLink.style.opacity = '0.7';
                    }
                });
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
                link.style.filter = '';
                
                quickLinks.forEach(otherLink => {
                    otherLink.style.transform = '';
                    otherLink.style.opacity = '';
                });
            });
        });
    }

    updateFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.03;
            const x = (this.mouseX - 0.5) * speed * 50;
            const y = (this.mouseY - 0.5) * speed * 50;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    updateInteractiveIcons(mouseX, mouseY) {
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const iconCenterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - iconCenterX, 2) + Math.pow(mouseY - iconCenterY, 2)
            );
            
            if (distance < CONFIG.interactionRadius) {
                const scale = 1.3 - (distance / CONFIG.interactionRadius) * 0.3;
                const rotation = (distance / CONFIG.interactionRadius) * 15;
                icon.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
                icon.style.opacity = '1';
            } else {
                icon.style.transform = '';
                icon.style.opacity = '0.6';
            }
        });
    }

    // ===== EFFETS SUR LES BOUTONS =====
    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Effet de loading au clic
            button.addEventListener('click', (e) => {
                if (button.href && !button.href.includes('#')) {
                    this.createLoadingEffect(button);
                }
                this.createRippleEffect(e, button);
            });
            
            // Effet de survol avancé
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', () => {
                if (!button.classList.contains('loading')) {
                    button.style.transform = '';
                }
            });
        });
    }

    createLoadingEffect(button) {
        const originalContent = button.innerHTML;
        button.classList.add('loading');
        button.style.pointerEvents = 'none';
        
        button.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Chargement...</span>
        `;
        
        // Simuler un délai de chargement
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.remove('loading');
            button.style.pointerEvents = '';
        }, 1500);
    }

    createRippleEffect(event, button) {
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.8s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }

    // ===== RACCOURCIS CLAVIER =====
    handleKeyboardShortcuts(e) {
        // Echap - Retour en haut
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // H - Accueil
        if (e.key === 'h' && !this.isTyping(e)) {
            window.location.href = 'index.html';
        }
        
        // C - Contact
        if (e.key === 'c' && !this.isTyping(e)) {
            window.location.href = 'index.html#contact';
        }
        
        // R - Actualiser les faits
        if (e.key === 'r' && !this.isTyping(e)) {
            this.rotateFact();
        }
        
        // G - Déclencher l'effet glitch
        if (e.key === 'g' && !this.isTyping(e)) {
            this.triggerManualGlitch();
        }
    }

    isTyping(e) {
        return e.target.tagName === 'INPUT' || 
               e.target.tagName === 'TEXTAREA' || 
               e.target.isContentEditable;
    }

    rotateFact() {
        if (elements.randomFact) {
            const currentIndex = funFacts.indexOf(elements.randomFact.textContent);
            const nextIndex = (currentIndex + 1) % funFacts.length;
            
            elements.randomFact.style.transform = 'scale(0.9)';
            elements.randomFact.style.opacity = '0.5';
            
            setTimeout(() => {
                elements.randomFact.textContent = funFacts[nextIndex];
                elements.randomFact.style.transform = 'scale(1)';
                elements.randomFact.style.opacity = '1';
            }, 200);
        }
    }

    triggerManualGlitch() {
        if (elements.glitchOverlay) {
            elements.glitchOverlay.style.opacity = '1';
            setTimeout(() => {
                elements.glitchOverlay.style.opacity = '0';
            }, 200);
        }
    }

    // ===== GESTION DES PARAMÈTRES URL =====
    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const referrer = urlParams.get('ref');
        const attempted = urlParams.get('url');
        const reason = urlParams.get('reason');

        if (attempted) {
            this.showAttemptedURL(decodeURIComponent(attempted));
        }

        if (reason) {
            this.showErrorReason(reason);
        }

        if (referrer) {
            this.trackReferrer(referrer);
        }
    }

    showAttemptedURL(url) {
        const errorDescription = document.querySelector('.error-description');
        if (errorDescription && url) {
            const urlDisplay = document.createElement('div');
            urlDisplay.style.cssText = `
                margin-top: 1.5rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 0.5rem;
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;
            urlDisplay.innerHTML = `
                <strong style="color: #fbbf24;">URL recherchée :</strong><br>
                <code style="
                    background: rgba(0, 0, 0, 0.3);
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    font-family: 'Courier New', monospace;
                    word-break: break-all;
                    display: block;
                    margin-top: 0.5rem;
                ">${url}</code>
            `;
            errorDescription.appendChild(urlDisplay);
        }
    }

    showErrorReason(reason) {
        const reasons = {
            'moved': 'Cette page a été déplacée vers une nouvelle adresse.',
            'deleted': 'Cette page a été supprimée de notre site.',
            'renamed': 'Cette page a été renommée.',
            'maintenance': 'Cette page est temporairement indisponible pour maintenance.'
        };
        
        const message = reasons[reason] || 'Raison inconnue.';
        this.showNotification(message, 'info');
    }

    trackReferrer(referrer) {
        console.log(`404 Error - Referrer: ${referrer}`);
        // Intégration analytique possible ici
    }

    // ===== OBSERVATEUR D'INTERSECTION =====
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observer les éléments qui doivent apparaître au scroll
        const elementsToObserve = document.querySelectorAll('.quick-link, .fun-fact');
        elementsToObserve.forEach(el => {
            el.style.transform = 'translateY(20px) scale(0.95)';
            el.style.opacity = '0.7';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    // ===== PRÉCHARGEMENT DES IMAGES =====
    setupImagePreloading() {
        const links = document.querySelectorAll('a[href]');
        const preloadedImages = new Set();

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (href && !preloadedImages.has(href) && !href.startsWith('#')) {
                    // Précharger les ressources de la page de destination
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                    preloadedImages.add(href);
                }
            });
        });
    }

    // ===== GESTION DE LA VISIBILITÉ =====
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause des animations coûteuses
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        } else {
            // Reprise des animations
            const canvas = document.getElementById('particle-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                this.animateParticles(ctx, canvas);
            }
        }
    }

    // ===== REDIMENSIONNEMENT =====
    handleResize() {
        // Recalculer les positions des particules
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Repositionner les particules
            this.particles.forEach(particle => {
                particle.x = Math.random() * canvas.width;
                particle.y = Math.random() * canvas.height;
            });
        }

        // Optimisation pour mobile
        if (window.innerWidth < 768) {
            this.optimizeForMobile();
        }
    }

    optimizeForMobile() {
        // Réduire le nombre de particules sur mobile
        const canvas = document.getElementById('particle-canvas');
        if (canvas && this.particles.length > 15) {
            this.particles = this.particles.slice(0, 15);
        }

        // Désactiver certains effets sur mobile
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.display = window.innerWidth < 768 ? 'none' : 'flex';
        });
    }

    // ===== MONITORING DES PERFORMANCES =====
    setupPerformanceMonitoring() {
        // Mesure du temps de chargement
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page 404 chargée en ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('Temps de chargement lent détecté');
                this.optimizePerformance();
            }
        });

        // Surveillance de la mémoire (si disponible)
        if ('memory' in performance) {
            setInterval(() => {
                const memInfo = performance.memory;
                if (memInfo.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                    console.warn('Utilisation mémoire élevée détectée');
                    this.cleanupMemory();
                }
            }, 30000);
        }
    }

    optimizePerformance() {
        // Réduire les particules
        this.particles = this.particles.slice(0, Math.floor(this.particles.length / 2));
        
        // Réduire la fréquence des animations
        CONFIG.glitchInterval *= 1.5;
        CONFIG.factChangeInterval *= 1.2;
    }

    cleanupMemory() {
        // Nettoyer les références inutiles
        const unusedElements = document.querySelectorAll('.particle-debris');
        unusedElements.forEach(el => el.remove());
        
        // Forcer le garbage collection (si possible)
        if (window.gc) {
            window.gc();
        }
    }

    // ===== NOTIFICATIONS =====
    showNotification(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Styles pour les notifications
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(15px);
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    padding: 1rem 1.5rem;
                    z-index: 9999;
                    transform: translateX(100%);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border-left: 4px solid #6366f1;
                    max-width: 350px;
                }
                .notification-success { border-left-color: #10b981; }
                .notification-error { border-left-color: #ef4444; }
                .notification-warning { border-left-color: #f59e0b; }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #1f2937;
                    font-weight: 500;
                }
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Animation d'entrée
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Suppression automatique
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    // ===== UTILITAIRES =====
    setCurrentYear() {
        if (elements.currentYear) {
            elements.currentYear.textContent = new Date().getFullYear();
        }
    }

    // ===== NETTOYAGE =====
    destroy() {
        // Nettoyage des timeouts et intervals
        if (this.glitchTimeout) clearTimeout(this.glitchTimeout);
        if (this.factInterval) clearInterval(this.factInterval);
        if (this.animationId) cancelAnimationFrame(this.animationId);

        // Suppression du canvas des particules
        const canvas = document.getElementById('particle-canvas');
        if (canvas) canvas.remove();

        // Suppression des event listeners
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('keydown', this.handleKeyboardShortcuts);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// ===== CLASSE PARTICULE =====
class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.getRandomColor();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 255, 255, ',
            'rgba(245, 158, 11, ',
            'rgba(236, 72, 153, ',
            'rgba(139, 92, 246, ',
            'rgba(59, 130, 246, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouseX, mouseY) {
        // Mouvement de base
        this.x += this.vx;
        this.y += this.vy;

        // Interaction avec la souris
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const force = (100 - distance) / 100;
            this.vx -= dx * force * 0.01;
            this.vy -= dy * force * 0.01;
        }

        // Rebond sur les bords
        if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;

        // Maintenir dans les limites
        this.x = Math.max(0, Math.min(this.canvasWidth, this.x));
        this.y = Math.max(0, Math.min(this.canvasHeight, this.y));

        // Limiter la vitesse
        const maxSpeed = 2;
        if (Math.abs(this.vx) > maxSpeed) this.vx = this.vx > 0 ? maxSpeed : -maxSpeed;
        if (Math.abs(this.vy) > maxSpeed) this.vy = this.vy > 0 ? maxSpeed : -maxSpeed;

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Effet de lueur
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color + '0.5)';
        ctx.fill();
        
        ctx.restore();
    }
}

// ===== FONCTIONS UTILITAIRES =====
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function createSparkleEffect(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #fbbf24;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnimation 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
}

// Animation CSS pour les étincelles
if (!document.querySelector('#sparkle-animation')) {
    const sparkleStyles = document.createElement('style');
    sparkleStyles.id = 'sparkle-animation';
    sparkleStyles.textContent = `
        @keyframes sparkleAnimation {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyles);
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Vérification du support des fonctionnalités modernes
    const supportsModernFeatures = 'IntersectionObserver' in window && 
                                   'requestAnimationFrame' in window &&
                                   'addEventListener' in document;

    if (!supportsModernFeatures) {
        console.warn('Certaines fonctionnalités modernes ne sont pas supportées');
    }

    // Initialisation de la page 404 améliorée
    const errorPage = new Enhanced404Page();

    // Ajout d'effets supplémentaires
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.7) {
            createSparkleEffect(e.clientX, e.clientY);
        }
    });

    // Gestion des erreurs JavaScript
    window.addEventListener('error', (e) => {
        console.error('Erreur JavaScript sur la page 404:', e.error);
    });

    // Nettoyage lors de la fermeture
    window.addEventListener('beforeunload', () => {
        errorPage.destroy();
    });

    // Message de développeur dans la console
    console.log(`
    🎨 Page 404 améliorée chargée !
    
    Raccourcis clavier disponibles :
    • H : Retour à l'accueil
    • C : Page de contact  
    • R : Changer le fait aléatoire
    • G : Déclencher l'effet glitch
    • Échap : Retour en haut
    
    Développé avec ❤️ pour Euromag Fusion
    `);
});

// Export pour les tests (si nécessaire)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Enhanced404Page, Particle, createSparkleEffect };
}