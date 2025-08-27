// ===== EVENT DATA =====
const eventData = {
    chazil: {
        title: 'CHAZIL',
        date: '25 Avril 2025',
        location: 'New Morning, Paris',
        type: 'Concert',
        time: '20h00 - 23h30',
        price: '€',
        image: './assets/img/chazil-ban.webp',
        video: '8hH7f3WKHyY',
        description: `
            <p>Le concert a été une célébration unique du raï, un genre musical algérien que l'artiste a su réinventer. Son style allie la richesse du raï classique à une touche moderne et audacieuse, pour créer une musique à la fois authentique et novatrice.</p><br />
            
            <h3>Un héritage revisité</h3>
            <p>Le raï, né à l'Ouest de l'Algérie au début du XXe siècle, a longtemps été la voix des générations nouvelles. <strong>CHAZIL</strong> puise dans cet héritage en s'inspirant des grands maîtres, tout en y injectant de nouvelles sonorités. Il modernise les codes de ce genre avec sa voix unique et sa guitare, créant ainsi une atmosphère à la fois nostalgique et rafraîchissante.</p><br />
            
            <h3>Un artiste et ses musiciens</h3>
            <p>Cette soirée exceptionnelle a mis en lumière le talent de <strong>CHAZIL</strong>, accompagné d'un groupe qui a su sublimer ses arrangements. Le public a découvert une instrumentation à la fois traditionnelle et contemporaine, mêlant guitare, percussions et instruments électroniques, pour donner corps à la vision de l'artiste.</p><br />
            
            <h3>Une expérience inoubliable</h3>
            <p>Le public a été transporté par un voyage musical à travers le raï, redécouvrant ses plus beaux classiques à travers le prisme de <strong>CHAZIL</strong>. Les interprétations ont alterné entre des reprises poignantes et des compositions originales, démontrant la capacité de l'artiste à faire vivre et évoluer cet héritage culturel.</p>
        `,
        program: [
            { time: '20h00', title: 'Accueil du public', description: 'Les portes s\'ouvrent. Le DJ chauffe la salle' },
            { time: '20h30', title: 'Ouverture', description: 'Un jeune talent fait le show. Le public se prépare' },
            { time: '21h00', title: 'Premier ensemble', description: 'Chazil arrive sur scène. Ses succès résonnent' },
            { time: '22h00', title: 'Intermède', description: 'Petite pause musicale. Le public se rafraîchit' },
            { time: '22h30', title: 'Second ensemble', description: 'Le Raï reprend ses droits. Chazil rend hommage aux grands' },
            { time: '23h30', title: 'Clôture', description: 'Le grand final. Le public chante, Chazil met le feu' }
        ],
        gallery: [
            './assets/img/event-1-1.webp',
            './assets/img/event-1-2.webp',
            './assets/img/event-1-3.webp',
            './assets/img/event-1-4.webp'
        ]
    },
    babylonedjamtimoh: {
        title: 'BABYLONE, DJAM & TIMOH',
        date: '15 Février 2025',
        location: 'Cabaret Sauvage, Paris',
        type: 'Concert',
        time: '19h00 - 24h00',
        price: '€',
        image: './assets/img/babylone-djam-timoh.webp',
        video: 'ng6WRvuHRxM',
        description: `
            <p>Cet événement a été une célébration de la richesse et de la diversité de la musique algérienne actuelle, réunissant trois artistes à l'avant-garde de la scène. La soirée a offert une exploration de genres variés, allant de la poésie pop-folk de <strong>Babylone</strong> à la fusion électrique de <strong>Djam</strong>, en passant par l'énergie brute et authentique du rap de <strong>Timoh</strong>.</p><br />
            
            <h3>Un héritage revisité</h3>
            <p>Les trois artistes ont démontré comment l'héritage musical algérien continue d'évoluer. <strong>Babylone</strong> a puisé dans les sonorités andalouses et kabyles pour créer des mélodies modernes et intimes. <strong>Djam</strong> a électrifié le chaâbi traditionnel en y injectant l'énergie du rock et du blues. De son côté, <strong>Timoh</strong> a fusionné la musique urbaine avec ses racines kabyles, donnant une nouvelle voix à la culture de sa région à travers le rap.</p><br />
            
            <h3>Des artistes et leurs musiciens</h3>
            <p>La scène a été le théâtre d'une variété de performances uniques. Le public a d'abord été captivé par l'univers acoustique de <strong>Babylone</strong>, créant une atmosphère intimiste. L'énergie a monté d'un cran avec <strong>Djam</strong> et sa formation rock, qui ont livré une prestation puissante et rythmée. Enfin, <strong>Timoh</strong> a clos la soirée avec un show percutant, où son flow et la production urbaine ont fait vibrer la foule.</p><br />
            
            <h3>Une expérience inoubliable</h3>
            <p>Cette soirée a offert au public un voyage musical inoubliable, où chaque artiste a apporté une touche unique. La douceur et la poésie de <strong>Babylone</strong>, l'intensité et l'audace de <strong>Djam</strong>, et l'authenticité et la force de <strong>Timoh</strong> se sont succédées pour former un spectacle complet. L'événement a mis en lumière la créativité et la vitalité de la nouvelle génération d'artistes algériens.</p>
        `,
        program: [
            { time: '19h00', title: 'Coup d\'envoi', description: 'Le concert démarre. Les portes s\'ouvrent au public' },
            { time: '19h30', title: 'Hommage aux pionniers', description: 'Les classiques résonnent. Hommage aux pionniers' },
            { time: '21h00', title: 'Jeunes talents', description: 'Place à la nouvelle génération. Les jeunes talents prennent la scène' },
            { time: '22h30', title: 'Invités internationaux', description: 'Des invités du Maghreb jouent. C\'est une fusion de cultures' },
            { time: '23h30', title: 'Grande finale', description: 'Tous les artistes sur scène. La soirée se termine en beauté' }
        ],
        gallery: [
            './assets/img/event-1-1.webp',
            './assets/img/event-1-2.webp',
            './assets/img/event-1-3.webp',
            './assets/img/event-1-4.webp'
        ]
    },
    tarhaninefreeklane: {
        title: 'TARHANINE & FREEKLANE',
        date: '15 Septembre 2024',
        location: 'Cabaret Sauvage, Paris',
        type: 'Concert',
        time: '20h00 - 22h30',
        price: '€',
        image: './assets/img/tarhaninel-freeklane-ban.webp',
        video: 'c7UwD-7BBt0',
        description: `
            <p>Cet événement a été une véritable célébration du voyage et de la fusion musicale, réunissant deux artistes exceptionnels, <strong>Kader Tarhanine</strong> et <strong>Freeklane</strong>. La soirée a offert au public une immersion unique, où les sons du désert et les rythmes folkloriques algériens ont rencontré des influences modernes, créant un dialogue musical fascinant entre le passé et le présent.</p><br />
            
            <h3>Un héritage revisité</h3>
            <p>Les deux artistes ont brillamment démontré la vitalité du patrimoine musical algérien. <strong>Kader Tarhanine</strong> a transporté le public au cœur du Sahara en réinventant la musique touarègue, tout en conservant son authenticité spirituelle. De son côté, <strong>Freeklane</strong> a fusionné avec audace des rythmes traditionnels tels que le chaâbi, le gnawa ou le bédoui avec des genres contemporains comme le rock et le reggae, créant une identité sonore unique et énergique.</p><br />
            
            <h3>Des artistes et leurs musiciens</h3>
            <p>La scène a reflété la diversité des deux univers. <strong>Kader Tarhanine</strong> a d'abord captivé l'audience avec une prestation envoûtante, centrée sur les mélodies de sa guitare, accompagnées d'une section rythmique qui a su souligner la profondeur de ses chants. La soirée a ensuite pris une tournure plus festive avec le groupe <strong>Freeklane</strong>, qui a enflammé la foule grâce à la richesse de ses instruments et à une énergie communicative.</p><br />
            
            <h3>Une expérience inoubliable</h3>
            <p>Le public a été emporté par un voyage musical complet. Après la sérénité et la poésie du désert apportées par <strong>Kader Tarhanine</strong>, l'ambiance est devenue électrique grâce à <strong>Freeklane</strong> et leur capacité à faire vibrer la foule. L'événement a mis en lumière la capacité de ces artistes à faire rayonner la culture algérienne en la réinventant sans cesse, pour le plus grand bonheur d'un public qui a vibré à l'unisson.</p>
        `,
        program: [
            { time: '20h00', title: 'L\'âme du désert', description: 'La scène est à Kader Tarhanine. Sa guitare blues nous transporte' },
            { time: '20h45', title: 'Le groove du désert', description: 'C\'est au tour de Freeklane. L\'énergie rock monte' },
            { time: '21h30', title: 'Rencontre au sommet', description: 'Les deux groupes s\'unissent. C\'est une fusion explosive' },
            { time: '22h00', title: 'Enthousiasme général', description: 'Ils jouent ensemble leurs hits. Le public est en folie' },
            { time: '22h30', title: 'Final explosif', description: 'Tous les musiciens sont sur scène. Le concert se termine en beauté' }
        ],
        gallery: [
            './assets/img/event-1-1.webp',
            './assets/img/event-1-2.webp',
            './assets/img/event-1-3.webp',
            './assets/img/event-1-4.webp'
        ]
    }
};

// ===== DOM ELEMENTS =====
const elements = {
    scrollTop: document.getElementById('scrollTop')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Add missing CSS variable if needed
    if (!document.documentElement.style.getPropertyValue('--gray-50')) {
        document.documentElement.style.setProperty('--gray-50', '#f9fafb');
    }

    // Initialize navigation and legal functionalities from common.js
    if (window.NavigationFooter) {
        NavigationFooter.initNavigation();
        NavigationFooter.initMobileMenu();
        NavigationFooter.initScrollToTop();
        NavigationFooter.initLegalAndServices(); // ← Cette ligne était manquante !
        
        // Global scroll handler
        window.addEventListener('scroll', NavigationFooter.debounce(() => {
            requestAnimationFrame(() => {
                NavigationFooter.handleScroll();
                handleScroll(); // Your existing scroll handler
            });
        }, 10));
    }

    // Get event ID from URL and populate content
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event') || 'chazil';
    const event = eventData[eventId];

    if (event) {
        populateEventContent(event);
    } else {
        // Event not found, redirect to main page
        window.location.href = 'index.html#evenements';
    }

    // Initialize event listeners
    initEventListeners();
});

// ===== POPULATE EVENT CONTENT =====
function populateEventContent(event) {
    // Basic info
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').textContent = event.date;
    document.getElementById('eventLocation').textContent = event.location;
    document.getElementById('eventType').textContent = event.type;
    document.getElementById('breadcrumbTitle').textContent = event.title;
    document.getElementById('eventHeroBg').src = event.image;
    document.getElementById('eventHeroBg').alt = event.title;

    // Sidebar info
    document.getElementById('sidebarDate').textContent = event.date;
    document.getElementById('sidebarLocation').textContent = event.location;
    document.getElementById('sidebarTime').textContent = event.time;
    document.getElementById('sidebarPrice').textContent = event.price;

    // Full description
    document.getElementById('eventFullDescription').innerHTML = event.description;

    // Program
    populateProgram(event.program);

    // Video
    populateVideo(event.video);

    // Gallery
    populateGallery(event.gallery);

    // Update page meta information
    document.title = `${event.title} - Euromag Fusion`;
}

// ===== POPULATE PROGRAM =====
function populateProgram(program) {
    const programTimeline = document.getElementById('programTimeline');
    programTimeline.innerHTML = '';
    
    program.forEach(item => {
        const programItem = document.createElement('div');
        programItem.className = 'program-item';
        programItem.innerHTML = `
            <div class="program-time">${item.time}</div>
            <div class="program-title">${item.title}</div>
            <div class="program-description">${item.description}</div>
        `;
        programTimeline.appendChild(programItem);
    });
}

// ===== POPULATE VIDEO =====
function populateVideo(videoId) {
    const videoSection = document.getElementById('videoSection');
    const eventVideo = document.getElementById('eventVideo');
    
    if (videoId) {
        eventVideo.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
        videoSection.style.display = 'block';
    } else {
        videoSection.style.display = 'none';
    }
}

// ===== POPULATE GALLERY =====
function populateGallery(gallery) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    gallery.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${image}" alt="Photo ${index + 1}" loading="lazy">`;
        galleryItem.addEventListener('click', () => openImageModal(image));
        galleryGrid.appendChild(galleryItem);
    });
}

// ===== SCROLL FUNCTIONALITY =====
function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // Scroll-to-top button
    if (elements.scrollTop) {
        if (scrollY > 300) {
            elements.scrollTop.classList.add('show');
        } else {
            elements.scrollTop.classList.remove('show');
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Scroll events
    window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });
    
    // Scroll to top button
    if (elements.scrollTop) {
        elements.scrollTop.addEventListener('click', scrollToTop);
    }
    
    // Close modals with Escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const imageModal = document.querySelector('.image-modal');
            if (imageModal) {
                closeImageModal(imageModal);
            }
        }
    });
}

// ===== SHARE FUNCTIONS =====
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event') || 'chazil';
    const event = eventData[eventId];
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${event.title} - Découvrez cet événement culturel algérien`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareOnWhatsApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event') || 'chazil';
    const event = eventData[eventId];
    
    const text = encodeURIComponent(`${event.title} - Découvrez cet événement culturel algérien ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareOnTelegram() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event') || 'chazil';
    const event = eventData[eventId];
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${event.title} - Découvrez cet événement culturel algérien`);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

function copyLink() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Lien copié dans le presse-papiers !', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(window.location.href);
        });
    } else {
        fallbackCopyTextToClipboard(window.location.href);
    }
}

// ===== FALLBACK COPY FUNCTION =====
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showNotification('Lien copié dans le presse-papiers !', 'success');
    } catch (err) {
        showNotification('Impossible de copier le lien', 'error');
    }

    document.body.removeChild(textArea);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== IMAGE MODAL =====
function openImageModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;

    const img = document.createElement('img');
    img.src = imageSrc.replace('w=300&h=200', 'w=1200&h=800');
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 1rem;
        box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
        animation: scaleIn 0.3s ease;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        color: #000;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = '#ef4444';
        closeBtn.style.color = 'white';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.9)';
        closeBtn.style.color = '#000';
    });

    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeModal = () => closeImageModal(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    closeBtn.addEventListener('click', closeModal);
}

function closeImageModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
        document.body.style.overflow = 'auto';
    }, 300);
}

// ===== PERFORMANCE OPTIMIZATION =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== MAKE FUNCTIONS GLOBAL FOR HTML ONCLICK =====
window.shareOnFacebook = shareOnFacebook;
window.shareOnTwitter = shareOnTwitter;
window.shareOnLinkedIn = shareOnLinkedIn;
window.shareOnWhatsApp = shareOnWhatsApp;
window.shareOnTelegram = shareOnTelegram;
window.copyLink = copyLink;