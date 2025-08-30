// ==================== NAVIGATION & FOOTER ====================

// Variables globales
let navbar;
let scrollTopBtn;

// ==================== NAVIGATION ====================
function initNavigation() {
    navbar = document.getElementById('navbar');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileMenu = document.getElementById('mobileMenu');
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    if (!mobileMenu || !navLinks) return;

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ==================== SCROLL TO TOP ====================
function initScrollToTop() {
    scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ==================== MODAL MANAGER FOR LEGAL CONTENT ====================
const LegalModalManager = (() => {
    const modals = {};

    function register(id, { onOpen, onClose } = {}) {
        const modal = document.getElementById(id);
        if (!modal) return;

        const closeButtons = modal.querySelectorAll('.close-btn');

        function open() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            onOpen?.(modal);
        }

        function close() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            onClose?.(modal);
        }

        closeButtons.forEach(btn => btn.addEventListener('click', close));
        modal.addEventListener('click', e => { if (e.target === modal) close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display === 'block') close(); });

        modals[id] = { open, close, modal };
    }

    function open(id) { modals[id]?.open(); }
    function close(id) { modals[id]?.close(); }

    return { register, open, close };
})();

// ==================== LEGAL & SERVICES CONTENT ====================
function initLegalAndServices() {
    const legalModal = document.getElementById('legalModal');
    const legalContent = document.getElementById('legalContent');
    if (!legalModal || !legalContent) return;

    // Register the legal modal
    LegalModalManager.register('legalModal');

    const legalData = {
        mentions: `
            <h2>Mentions Légales</h2>
            <div class="legal-section">
                <h3>Éditeur du site</h3>
                <p><strong>Euromag Fusion</strong><br>
                Association loi 1901<br>
                Siège social : Paris, France<br>
                SIRET : 123 456 789 00012<br>
                Email : contact@euromagfusion.com<br>
                Téléphone : +33 6 12 34 56 78</p>
            </div>
            <div class="legal-section">
                <h3>Directeur de la publication</h3>
                <p>Président de l'association Euromag Fusion</p>
            </div>
            <div class="legal-section">
                <h3>Hébergement</h3>
                <p>Ce site est hébergé par OVH<br>
                Adresse : France</p>
            </div>
            <div class="legal-section">
                <h3>Propriété intellectuelle</h3>
                <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
            </div>
        `,
        conditions: `
            <h2>Conditions Générales d'Utilisation</h2>
            <div class="legal-section">
                <h3>Article 1 - Objet</h3>
                <p>Les présentes conditions générales ont pour objet de définir les modalités et conditions d'utilisation du site web de l'association Euromag Fusion.</p>
            </div>
            <div class="legal-section">
                <h3>Article 2 - Acceptation</h3>
                <p>L'utilisation du site implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après.</p>
            </div>
            <div class="legal-section">
                <h3>Article 3 - Services</h3>
                <p>L'association Euromag Fusion propose des services d'organisation d'événements culturels et de spectacles mettant en valeur la culture algérienne.</p>
            </div>
            <div class="legal-section">
                <h3>Article 4 - Responsabilité</h3>
                <p>L'association s'efforce de fournir des informations exactes mais ne peut garantir l'exactitude de toutes les informations présentes sur le site.</p>
            </div>
        `,
        confidentialite: `
            <h2>Politique de Confidentialité</h2>
            <div class="legal-section">
                <h3>Collecte des données</h3>
                <p>Nous collectons uniquement les données nécessaires au fonctionnement de nos services et à la communication avec nos membres et visiteurs.</p>
            </div>
            <div class="legal-section">
                <h3>Utilisation des données</h3>
                <p>Vos données personnelles sont utilisées exclusivement pour :</p>
                <ul>
                    <li>La gestion de votre adhésion à l'association</li>
                    <li>L'information sur nos événements et activités</li>
                    <li>La réponse à vos demandes et messages</li>
                    <li>L'amélioration de nos services</li>
                </ul>
            </div>
            <div class="legal-section">
                <h3>Protection des données</h3>
                <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés.</p>
            </div>
            <div class="legal-section">
                <h3>Vos droits</h3>
                <p>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>
                <ul>
                    <li>Droit d'accès à vos données personnelles</li>
                    <li>Droit de rectification et de mise à jour</li>
                    <li>Droit à l'effacement (droit à l'oubli)</li>
                    <li>Droit à la portabilité des données</li>
                </ul>
            </div>
        `,
        cookies: `
            <h2>Gestion des Cookies</h2>
            <div class="legal-section">
                <h3>Qu'est-ce qu'un cookie ?</h3>
                <p>Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site web. Il permet de reconnaître votre navigateur et de mémoriser certaines informations.</p>
            </div>
            <div class="legal-section">
                <h3>Types de cookies utilisés</h3>
                <p>Notre site utilise différents types de cookies :</p>
                <ul>
                    <li><strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site</li>
                    <li><strong>Cookies de mesure d'audience :</strong> Pour analyser l'utilisation du site</li>
                    <li><strong>Cookies de personnalisation :</strong> Pour améliorer votre expérience utilisateur</li>
                </ul>
            </div>
            <div class="legal-section">
                <h3>Gestion des cookies</h3>
                <p>Vous pouvez à tout moment modifier vos préférences de cookies :</p>
                <ul>
                    <li>Via les paramètres de votre navigateur</li>
                    <li>En utilisant notre outil de gestion des cookies</li>
                    <li>En nous contactant directement</li>
                </ul>
            </div>
        `
    };

    // Bind legal links
    document.querySelectorAll('.legal-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const legalType = link.dataset.legal;
            const html = legalData[legalType];
            if (html) {
                legalContent.innerHTML = html;
                LegalModalManager.open('legalModal');
            }
        });
    });

    // Services content in the same modal
    const serviceData = {
        organisation: `
            <h2>Organisation d'événements</h2>
            <div class="legal-section">
                <p>Conception, planification et production d'événements culturels clé-en-main : programmation artistique, logistique, scénographie, régie technique et coordination des équipes.</p>
                <ul>
                    <li>Étude des besoins et budget</li>
                    <li>Gestion des prestataires et lieux</li>
                    <li>Communication & billetterie</li>
                </ul>
            </div>
        `,
        spectacles: `
            <h2>Spectacles culturels</h2>
            <div class="legal-section">
                <p>Création et diffusion de spectacles mettant en valeur la culture algérienne : musique andalouse, chaâbi, danses traditionnelles, poésie populaire et arts visuels.</p>
                <ul>
                    <li>Programmation d'artistes</li>
                    <li>Direction artistique</li>
                    <li>Scènes adaptées (intérieur / extérieur)</li>
                </ul>
            </div>
        `,
        formations: `
            <h2>Formations artistiques</h2>
            <div class="legal-section">
                <p>Ateliers et masterclasses pour tous niveaux : musique, chant, danse, écriture poétique, patrimoine et histoire des arts algériens.</p>
                <ul>
                    <li>Formations ponctuelles ou cycles longs</li>
                    <li>Intervenants professionnels</li>
                    <li>Supports pédagogiques fournis</li>
                </ul>
            </div>
        `,
        location: `
            <h2>Location de matériel</h2>
            <div class="legal-section">
                <p>Location de sonorisation, éclairage, structures, backline et matériel scénique, avec option livraison, montage et assistance technique.</p>
                <ul>
                    <li>Packs adaptés à la jauge</li>
                    <li>Techniciens certifiés</li>
                    <li>Assurance et maintenance</li>
                </ul>
            </div>
        `
    };

    // Find the Services footer section and bind links
    const servicesSection = Array.from(document.querySelectorAll('.footer-section')).find(sec => sec.querySelector('h3')?.textContent?.toLowerCase().includes('services'));
    const serviceLinks = servicesSection ? servicesSection.querySelectorAll('a[href="#"]') : [];

    const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
    const textKeyMap = {
        'organisationdeconcerts': 'organisation',
        'spectaclesculturels': 'spectacles',
        'formationsartistiques': 'formations',
        'locationdemateriel': 'location'
    };

    serviceLinks.forEach(a => {
        const key = textKeyMap[normalize(a.textContent)];
        if (!key) return;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const html = serviceData[key];
            if (html) {
                legalContent.innerHTML = html;
                LegalModalManager.open('legalModal');
            }
        });
    });
}

// ==================== GLOBAL SCROLL HANDLER ====================
function handleScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('show', window.pageYOffset > 500);
}

// ==================== UTILS ====================
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Export des fonctions pour utilisation dans le fichier principal
window.NavigationFooter = {
    initNavigation,
    initMobileMenu,
    initScrollToTop,
    initLegalAndServices,
    handleScroll,
    debounce
};

// Exposition pour utilisation globale
window.LegalModalManager = LegalModalManager;