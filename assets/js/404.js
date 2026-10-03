// ===== PAGE 404 =====

const CONFIG = {
    glitchInterval: 6000,
    glitchDuration: 250,
    factChangeInterval: 8000,
    particleCount: window.innerWidth < 768 ? 15 : 25
};

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

// ===== EFFET GLITCH =====
function triggerGlitch(overlay, duration = CONFIG.glitchDuration) {
    overlay.style.opacity = '1';
    setTimeout(() => {
        overlay.style.opacity = '0';
    }, duration);
}

function startGlitchEffect(overlay) {
    const scheduleNextGlitch = () => {
        const delay = CONFIG.glitchInterval + (Math.random() * 4000 - 2000);
        setTimeout(() => {
            if (Math.random() > 0.7) triggerGlitch(overlay);
            scheduleNextGlitch();
        }, delay);
    };
    scheduleNextGlitch();
}

// ===== ROTATION DES ANECDOTES =====
function showNextFact(factElement) {
    const currentIndex = funFacts.indexOf(factElement.textContent);
    const nextIndex = (currentIndex + 1) % funFacts.length;

    factElement.style.transform = 'translateX(-20px)';
    factElement.style.opacity = '0';

    setTimeout(() => {
        factElement.textContent = funFacts[nextIndex];
        factElement.style.transform = 'translateX(20px)';

        requestAnimationFrame(() => {
            factElement.style.transform = 'translateX(0)';
            factElement.style.opacity = '1';
        });
    }, 400);
}

// ===== PARTICULES =====
class Particle {
    constructor(width, height) {
        const colors = [
            'rgba(255, 255, 255, ',
            'rgba(245, 158, 11, ',
            'rgba(236, 72, 153, ',
            'rgba(139, 92, 246, ',
            'rgba(59, 130, 246, '
        ];

        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(width, height, mouseX, mouseY) {
        this.x += this.vx;
        this.y += this.vy;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.hypot(dx, dy);

        // Les particules fuient le curseur
        if (distance < 100) {
            const force = (100 - distance) / 100;
            this.vx -= dx * force * 0.01;
            this.vy -= dy * force * 0.01;
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));

        const maxSpeed = 2;
        this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx)) * 0.99;
        this.vy = Math.max(-maxSpeed, Math.min(maxSpeed, this.vy)) * 0.99;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${this.color}0.5)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const mouse = { x: -1000, y: -1000 };
    let particles = [];
    let animationId = null;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = Array.from({ length: CONFIG.particleCount }, () => new Particle(canvas.width, canvas.height));
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update(canvas.width, canvas.height, mouse.x, mouse.y);
            particle.draw(ctx);
        });
        animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Pas d'animation quand l'onglet est en arrière-plan
    document.addEventListener('visibilitychange', () => {
        cancelAnimationFrame(animationId);
        if (!document.hidden) animate();
    });

    window.addEventListener('resize', resize);
    resize();
    animate();
}

// ===== EFFETS AU CLIC =====
function createRipple(event, button) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);
    sparkle.addEventListener('animationend', () => sparkle.remove());
}

// ===== RACCOURCIS CLAVIER =====
function initKeyboardShortcuts(glitchOverlay, factElement) {
    document.addEventListener('keydown', (e) => {
        const isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable;
        if (isTyping || e.ctrlKey || e.metaKey || e.altKey) return;

        switch (e.key) {
            case 'Escape':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'h':
                window.location.href = '/';
                break;
            case 'c':
                window.location.href = '/#contact';
                break;
            case 'r':
                if (factElement) showNextFact(factElement);
                break;
            case 'g':
                if (glitchOverlay) triggerGlitch(glitchOverlay, 200);
                break;
        }
    });
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    const glitchOverlay = document.getElementById('glitchOverlay');
    const factElement = document.getElementById('randomFact');
    const currentYear = document.getElementById('current-year');

    if (currentYear) currentYear.textContent = new Date().getFullYear();

    if (glitchOverlay) {
        setTimeout(() => {
            if (Math.random() > 0.7) triggerGlitch(glitchOverlay);
        }, 3000);
        startGlitchEffect(glitchOverlay);
    }

    if (factElement) {
        setInterval(() => showNextFact(factElement), CONFIG.factChangeInterval);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initParticles();
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => createRipple(e, button));
    });

    document.addEventListener('click', (e) => {
        if (Math.random() > 0.7) createSparkle(e.clientX, e.clientY);
    });

    initKeyboardShortcuts(glitchOverlay, factElement);

    console.log('%c🎭 Bienvenue sur Euromag Fusion!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%cSite développé par SL avec ❤️ pour promouvoir la culture algérienne', 'color: #ec4899; font-size: 14px;');
});
