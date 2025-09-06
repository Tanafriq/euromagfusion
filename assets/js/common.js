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
        <h2>Mentions Légales</h2><br>
        <div class="legal-section">
            <h3>Éditeur du site</h3>
            <p><strong>Euromag Fusion</strong><br>
            Association loi 1901<br>
            Siège social : 151 avenue de la République, 92320 Châtillon, France<br>
            Email : contact@euromagfusion.com<br>
            Téléphone : +33 6 12 34 56 78</p>
            <p><strong>Objet de l'association :</strong> Promotion de la culture algérienne à travers l'organisation de spectacles, concerts, événements culturels et expositions en France et en Europe.</p>
        </div>
        <div class="legal-section">
            <h3>Directeur de la publication</h3>
            <p>Président de l'association Euromag Fusion</p>
        </div>
        <div class="legal-section">
            <h3>Hébergement</h3>
            <p>Ce site est hébergé par :<br>
            <strong>OVH SAS</strong><br>
            2 rue Kellermann<br>
            59100 Roubaix, France<br>
            Téléphone : 1007</p>
        </div>
        <div class="legal-section">
            <h3>Conception et développement</h3>
            <p>Site web développé par SL<br>
            Contact : slimanelami@proton.me</p>
        </div>
        <div class="legal-section">
            <h3>Propriété intellectuelle</h3>
            <p>L'ensemble du contenu de ce site web (textes, images, vidéos, logos, éléments graphiques, mise en page, structure) relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.</p>
            <p>Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques. La reproduction de tout ou partie de ce site sur quelque support que ce soit est formellement interdite sauf autorisation expresse d'Euromag Fusion.</p>
            <p>Le nom "Euromag Fusion" ainsi que le logo de l'association sont des marques déposées. Toute reproduction ou utilisation de ces éléments sans autorisation préalable constitue une contrefaçon.</p>
        </div>
        <div class="legal-section">
            <h3>Responsabilité</h3>
            <p>Euromag Fusion s'efforce de fournir des informations exactes et régulièrement mises à jour. Cependant, l'association ne peut garantir l'exactitude, la complétude ou l'actualité de toutes les informations présentes sur le site.</p>
            <p>L'association ne peut être tenue responsable des interruptions de service, qu'elles soient dues à la maintenance, à des pannes techniques ou à des causes externes.</p>
        </div>
        <div class="legal-section">
            <h3>Droit applicable</h3>
            <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.</p>
        </div>
    `,
        conditions: `
        <h2>Conditions Générales d'Utilisation</h2><br>
        <div class="legal-section">
            <h3>Article 1 - Objet</h3>
            <p>Les présentes conditions générales ont pour objet de définir les modalités et conditions d'utilisation du site web de l'association Euromag Fusion, accessible à l'adresse www.euromagfusion.com.</p>
        </div>
        <div class="legal-section">
            <h3>Article 2 - Acceptation</h3>
            <p>L'utilisation du site implique l'acceptation pleine et entière des présentes conditions générales d'utilisation. Ces conditions s'appliquent à tous les utilisateurs du site.</p>
        </div>
        <div class="legal-section">
            <h3>Article 3 - Services proposés</h3>
            <p>L'association Euromag Fusion propose :</p>
            <ul>
                <li>L'organisation d'événements culturels et de spectacles mettant en valeur la culture algérienne</li>
                <li>L'organisation d'expositions et salons culturels</li>
            </ul>
        </div>
        <div class="legal-section">
            <h3>Article 4 - Utilisation du site</h3>
            <p>L'utilisateur s'engage à utiliser le site de manière loyale et conforme à sa destination. Il est interdit de :</p>
            <ul>
                <li>Porter atteinte aux droits de propriété intellectuelle de l'association</li>
                <li>Utiliser le site à des fins commerciales sans autorisation</li>
                <li>Diffuser des contenus illicites, diffamatoires ou contraires aux bonnes mœurs</li>
                <li>Perturber le bon fonctionnement du site</li>
            </ul>
        </div>
        <div class="legal-section">
            <h3>Article 5 - Responsabilité</h3>
            <p>L'association s'efforce de fournir des informations exactes mais ne peut garantir l'exactitude de toutes les informations présentes sur le site. L'utilisateur reconnaît utiliser ces informations sous sa seule responsabilité.</p>
            <p>L'association ne peut être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site.</p>
        </div>
        <div class="legal-section">
            <h3>Article 6 - Modification des conditions</h3>
            <p>L'association se réserve le droit de modifier les présentes conditions à tout moment. Les modifications prennent effet dès leur publication sur le site.</p>
        </div>
        <div class="legal-section">
            <h3>Article 7 - Droit applicable</h3>
            <p>Les présentes conditions sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents français après tentative de résolution amiable.</p>
        </div>
    `,
        confidentialite: `
        <h2>Politique de Confidentialité</h2><br>
        <div class="legal-section">
            <h3>Responsable du traitement</h3>
            <p>Euromag Fusion, association loi 1901, domiciliée au 151 avenue de la République, 92320 Châtillon.<br>
            Contact : contact@euromagfusion.com</p>
        </div>
        <div class="legal-section">
            <h3>Données collectées</h3>
            <p>Nous collectons uniquement les données nécessaires au fonctionnement de nos services :</p>
            <ul>
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone (facultatif)</li>
                <li>Adresse postale (pour certains services)</li>
                <li>Message ou demande spécifique</li>
            </ul>
        </div>
        <div class="legal-section">
            <h3>Finalités du traitement</h3>
            <p>Vos données personnelles sont utilisées exclusivement pour :</p>
            <ul>
                <li>La gestion des demandes de contact et d'information</li>
                <li>L'envoi de notre newsletter (avec consentement préalable)</li>
                <li>La gestion des inscriptions aux événements</li>
                <li>L'information sur nos événements et activités</li>
                <li>L'amélioration de nos services</li>
            </ul>
        </div>
        <div class="legal-section">
            <h3>Base légale</h3>
            <p>Le traitement de vos données personnelles repose sur :</p>
            <ul>
                <li>Votre consentement (newsletter)</li>
                <li>L'intérêt légitime de l'association (réponse aux demandes de contact)</li>
                <li>L'exécution d'un contrat (inscription aux événements)</li>
            </ul>
        </div>
        <div class="legal-section">
            <h3>Conservation des données</h3>
            <p>Les données sont conservées pendant une durée n'excédant pas celle nécessaire aux finalités :</p>
            <ul>
                <li>Demandes de contact : 3 ans à compter du dernier contact</li>
                <li>Newsletter : jusqu'à la désinscription</li>
                <li>Gestion des événements : 3 ans après la fin de l'événement</li>
            </ul>
        </div>
        <div class="legal-section">
            <h3>Protection des données</h3>
            <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés.</p>
        </div>
        <div class="legal-section">
            <h3>Vos droits RGPD</h3>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
            <ul>
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification et de mise à jour</li>
                <li>Droit à l'effacement ("droit à l'oubli")</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
            <p>Pour exercer vos droits, contactez-nous à : contact@euromagfusion.com</p>
            <p>Vous disposez également du droit d'introduire une réclamation auprès de la CNIL : www.cnil.fr</p>
        </div>
    `,
        cookies: `
        <h2>Politique relative aux Cookies</h2><br>
        <div class="legal-section">
            <h3>Notre engagement pour votre vie privée</h3>
            <p><strong>Euromag Fusion respecte votre vie privée.</strong> Notre site web ne dépose aucun cookie de suivi, de mesure d'audience ou de publicité sur votre navigateur.</p>
        </div>
        <div class="legal-section">
            <h3>Qu'est-ce qu'un cookie ?</h3>
            <p>Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site web. Il permet de reconnaître votre navigateur et de mémoriser certaines informations.</p>
        </div>
        <div class="legal-section">
            <h3>Cookies utilisés sur notre site</h3>
            <p><strong>Aucun cookie n'est déposé par notre site.</strong> Nous avons fait le choix de ne pas utiliser :</p>
            <ul>
                <li>Cookies de mesure d'audience (Google Analytics, etc.)</li>
                <li>Cookies de publicité ou de marketing</li>
                <li>Cookies de réseaux sociaux</li>
                <li>Cookies de personnalisation</li>
            </ul>
            <p>Seuls les cookies techniques strictement nécessaires au fonctionnement de votre navigateur peuvent être utilisés (session de navigation, sécurité HTTPS).</p>
        </div>
        <div class="legal-section">
            <h3>Services externes</h3>
            <p>Si vous cliquez sur des liens externes (réseaux sociaux, vidéos YouTube intégrées), ces sites tiers peuvent déposer leurs propres cookies selon leurs politiques respectives. Nous vous invitons à consulter leurs conditions d'utilisation.</p>
        </div>
        <div class="legal-section">
            <h3>Votre navigation</h3>
            <p>Vous pouvez naviguer sur notre site en toute tranquillité, sans risque de traçage ou de collecte de données via des cookies. Nous privilégions une approche respectueuse de votre vie privée.</p>
            <p>Pour toute question concernant cette politique, contactez-nous à : contact@euromagfusion.com</p>
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

    // Services content - Mis à jour pour Euromag Fusion
    const serviceData = {
        concerts: `
            <h2>Organisation de concerts</h2><br>
            <div class="legal-section">
                <h3>Notre expertise</h3>
                <p>Euromag Fusion organise des concerts et spectacles musicaux qui célèbrent la richesse de la culture algérienne. Nous nous occupons de tous les aspects de la production, de la conception à la réalisation.</p>
                
                <h3>Services inclus</h3>
                <ul>
                    <li><strong>Programmation artistique :</strong> Sélection d'artistes de renom et de talents émergents</li>
                    <li><strong>Gestion des lieux :</strong> Recherche et réservation de salles prestigieuses (New Morning, Cabaret Sauvage, Salle Pleyel...)</li>
                    <li><strong>Production technique :</strong> Son, éclairage, scénographie adaptés aux performances</li>
                    <li><strong>Logistique complète :</strong> Transport des artistes, hébergement, restauration</li>
                    <li><strong>Communication :</strong> Promotion, relations presse, réseaux sociaux</li>
                    <li><strong>Billetterie :</strong> Gestion des ventes et accueil du public</li>
                </ul>

                <h3>Genres musicaux</h3>
                <p>Nous travaillons avec une grande variété de styles : raï contemporain, musique andalouse, chaâbi, pop-folk algérienne, fusion moderne et musiques traditionnelles.</p>

                <h3>Notre approche</h3>
                <p>Chaque concert est conçu comme une expérience culturelle authentique, offrant au public une immersion dans la beauté et la diversité de la culture algérienne.</p>
            </div>
        `,
        spectacles: `
            <h2>Spectacles culturels</h2><br>
            <div class="legal-section">
                <h3>Créations originales</h3>
                <p>Euromag Fusion conçoit et produit des spectacles culturels innovants qui mettent en lumière le patrimoine algérien sous toutes ses formes : musique, danse, théâtre, poésie et arts visuels.</p>
                
                <h3>Types de spectacles</h3>
                <ul>
                    <li><strong>Spectacles musicaux :</strong> Concerts thématiques, récitals et performances fusion</li>
                    <li><strong>Danses traditionnelles :</strong> Spectacles de danse populaire et chorégraphies contemporaines</li>
                    <li><strong>Performances multidisciplinaires :</strong> Mélange de musique, danse, récitation et arts visuels</li>
                    <li><strong>Soirées à thème :</strong> Événements culturels immersifs avec animations et gastronomie</li>
                    <li><strong>Spectacles jeune public :</strong> Sensibilisation culturelle adaptée aux enfants</li>
                </ul>

                <h3>Accompagnement artistique</h3>
                <ul>
                    <li>Direction artistique et mise en scène</li>
                    <li>Coaching et préparation des artistes</li>
                    <li>Création de costumes et décors authentiques</li>
                    <li>Adaptation aux différents types de lieux</li>
                </ul>

                <h3>Impact culturel</h3>
                <p>Nos spectacles visent à créer des ponts entre les cultures, à transmettre les traditions et à faire découvrir la modernité algérienne à un public large et diversifié.</p>
            </div>
        `,
        expositions: `
            <h2>Expositions et salons</h2><br>
            <div class="legal-section">
                <h3>Algérie Expo - Notre projet phare</h3>
                <p>Euromag Fusion développe "Algérie Expo", le premier grand salon international dédié à l'Algérie en France, prévu pour avril 2026 à Paris.</p>
                
                <h3>Concept d'exposition</h3>
                <ul>
                    <li><strong>Vitrine économique :</strong> Présentation des secteurs clés et opportunités d'investissement</li>
                    <li><strong>Patrimoine culturel :</strong> Expositions d'art, artisanat et traditions millénaires</li>
                    <li><strong>Destination touristique :</strong> Promotion des merveilles naturelles et sites historiques</li>
                    <li><strong>Gastronomie :</strong> Découverte des saveurs et spécialités régionales</li>
                    <li><strong>Innovation :</strong> Présentation des technologies et industries modernes</li>
                </ul>

                <h3>Services d'organisation</h3>
                <ul>
                    <li>Conception et aménagement d'espaces d'exposition</li>
                    <li>Gestion des exposants et partenaires</li>
                    <li>Programmation d'animations culturelles</li>
                    <li>Organisation de conférences et tables rondes</li>
                    <li>Coordination logistique et technique</li>
                    <li>Communication et relations médias</li>
                </ul>

                <h3>Impact et rayonnement</h3>
                <p>Ces événements créent des opportunités de networking, favorisent les échanges économiques et renforcent les liens entre l'Algérie et l'Europe.</p>
            </div>
        `
    };

    // Find the Services footer section and bind links
    const servicesSection = Array.from(document.querySelectorAll('.footer-section')).find(sec => sec.querySelector('h3')?.textContent?.toLowerCase().includes('services'));
    const serviceLinks = servicesSection ? servicesSection.querySelectorAll('a[href="#"]') : [];

    const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
    
    // Mapping mis à jour pour correspondre aux services d'Euromag Fusion
    const textKeyMap = {
        'organisationdeconcerts': 'concerts',
        'spectaclesculturels': 'spectacles',
        'expositionsetdelsalons': 'expositions',
        'expositionsetsalons': 'expositions'
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

// ==================== DEVELOPER SIGNATURE ====================
function initDeveloperSignature() {
    // Gestion du clic sur la signature sans message console
    const developerSignature = document.getElementById('developer-signature');
    if (developerSignature) {
        developerSignature.addEventListener('click', function (e) {
            e.preventDefault();
            // Créer un lien temporaire et le supprimer immédiatement pour éviter le message console
            const link = document.createElement('a');
            link.href = 'mailto:slimanelami@proton.me';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
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

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function () {
    // Mise à jour automatique de l'année
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Initialiser toutes les fonctionnalités
    initDeveloperSignature();
});

// Export des fonctions pour utilisation dans le fichier principal
window.NavigationFooter = {
    initNavigation,
    initMobileMenu,
    initScrollToTop,
    initLegalAndServices,
    initDeveloperSignature,
    handleScroll,
    debounce
};

// Exposition pour utilisation globale
window.LegalModalManager = LegalModalManager;