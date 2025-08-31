# Euromag Fusion

## Description

Site web officiel de Euromag Fusion, dédiée à la promotion de la culture algérienne en France et en Europe. Le site présente les concerts organisés par l'annonce du futur événement "Algérie Expo Paris 2026".

## Structure du projet

```
euromag-fusion/
├── index.html              # Page d'accueil principale
├── algerie-expo.html       # Page dédiée à l'événement Algérie Expo
├── event-details.html      # Page de détails des concerts (générée dynamiquement)
├── assets/
│   ├── css/
│   │   ├── common.css      # Styles partagés
│   │   ├── styles.css      # Styles principaux
│   │   └── styles-algerie-expo.css  # Styles spécifiques à Algérie Expo
│   ├── js/
│   │   ├── common.js       # Scripts partagés (navigation, légal)
│   │   ├── script.js       # Scripts page d'accueil
│   │   ├── script-algerie-expo.js   # Scripts Algérie Expo
│   │   └── event-details.js # Scripts détails concerts
│   └── img/               # Images et assets visuels
└── README.md              # Documentation du projet
```

## Fonctionnalités

### Page d'accueil (`index.html`)
- Présentation de l'association Euromag Fusion
- Section "À propos" avec mission, vision et valeurs
- Liste des concerts passés avec système d'onglets
- Section concerts à venir avec newsletter
- Formulaire de contact
- Navigation responsive avec menu mobile

### Page Algérie Expo (`algerie-expo.html`)
- Page de présentation de l'événement "Algérie Expo Paris 2026"
- Compte à rebours interactif jusqu'au lancement
- Présentation des secteurs d'exposition
- Section partenaires
- Newsletter dédiée

### Détails des concerts (`event-details.html`)
- Pages dynamiques générées via JavaScript
- Programme détaillé des concerts
- Galerie photo avec modal
- Vidéo intégrée YouTube
- Partage sur réseaux sociaux

## Technologies utilisées

- **HTML5** : Structure sémantique avec Schema.org
- **CSS3** : Flexbox, Grid, animations CSS
- **JavaScript ES6+** : Modules, async/await, destructuring
- **Font Awesome** : Icônes
- **Google Fonts** : Typographies (Inter, Poppins)

### Frameworks et bibliothèques
- Vanilla JavaScript (pas de framework frontend)
- CSS Grid et Flexbox pour la mise en page
- CSS Custom Properties pour la theming
- Intersection Observer API pour les animations au scroll

## Installation et développement

### Prérequis
- Serveur web local (Live Server, http-server, ou similaire)
- Navigateur moderne supportant ES6+

### Lancement en développement

```bash
# Clone du repository
git clone ...
cd euromag-fusion

# Avec Live Server (VS Code extension)
# Clic droit sur index.html > "Open with Live Server"

# Ou avec http-server (Node.js)
npx http-server . -p 8080

# Ou avec Python
python -m http.server 8080
```

### Structure des données

Les données des concerts sont stockées dans `assets/js/event-details.js` :

```javascript
const eventData = {
    chazil: {
        title: 'CHAZIL',
        date: '25 Avril 2025',
        location: 'New Morning, Paris',
        // ... autres propriétés
    }
    // ... autres événements
}
```

## Optimisations

### Performance
- Images WebP avec fallback
- Lazy loading des images
- Minification CSS/JS (à implémenter)
- Optimisation des fonts Google

### SEO
- Métadonnées Open Graph et Twitter Cards
- Schema.org pour les événements
- Structure sémantique HTML5
- Balises meta description et keywords

### Accessibilité
- Navigation au clavier
- Labels ARIA appropriés
- Contraste suffisant
- Images avec attributs alt

## Fonctionnalités JavaScript

### Navigation (`common.js`)
- Menu mobile responsive
- Scroll smooth vers les sections
- Bouton retour en haut
- Gestion des modals légales

### Événements (`script.js`)
- Système d'onglets pour les concerts
- Gestion des modals vidéo
- Formulaires de contact et newsletter
- Animation des particules en arrière-plan

### Algérie Expo (`script-algerie-expo.js`)
- Compte à rebours dynamique
- Éléments flottants animés
- Newsletter dédiée

## Déploiement

### Hébergement statique
Le site peut être déployé sur :
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Configuration serveur
Aucune configuration backend requise. Le site est entièrement statique.

## Maintenance

### Ajout d'un nouveau concert
1. Ajouter les images dans `assets/img/`
2. Mettre à jour `eventData` dans `event-details.js`
3. Créer la carte événement dans `index.html`

### Modification du design
- Couleurs principales dans `:root` du CSS
- Composants réutilisables dans `common.css`
- Variables CSS pour faciliter la customisation

## Contact et support

Pour toute question technique concernant le site :
- Email : contact@euromagfusion.com
- Développeur : SL

## Licence

© 2024-2025 Euromag Fusion. Tous droits réservés.