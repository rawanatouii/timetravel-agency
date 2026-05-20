# TimeTravel Agency — Rendus finaux

> Projet pédagogique M1/M2 Digital & IA — Ynov
> **Membres du groupe :** [Membre 1], [Membre 2], [Membre 3], [Membre 4]

## Ce que contient ce dossier

Le projet complet se trouve dans le dossier **`timetravel-agency/`**.

```
timetravel-agency/
├── README.md                ← Documentation principale
├── PROMPTS.md               ← Transparence sur les prompts IA utilisés
├── DEMARRAGE-RAPIDE.md      ← Comment lancer le projet en local (5 min)
├── DEPLOIEMENT.md           ← Comment déployer sur Vercel
├── package.json             ← Dépendances npm
├── index.html               ← Point d'entrée HTML
├── vite.config.js           ← Configuration Vite
├── tailwind.config.js       ← Thème steampunk vintage custom
├── vercel.json              ← Config pour déploiement Vercel
├── .env.example             ← Modèle pour la clé API Mistral
├── public/
│   └── favicon.svg          ← Icône de l'onglet
└── src/
    ├── App.jsx              ← Composition générale
    ├── main.jsx             ← Point d'entrée React
    ├── index.css            ← Tailwind + styles vintage
    ├── components/          ← 7 composants React
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Destinations.jsx
    │   ├── Quiz.jsx
    │   ├── Reservation.jsx
    │   ├── Footer.jsx
    │   └── Chatbot.jsx
    ├── data/
    │   └── destinations.js  ← Source de vérité des 3 destinations
    └── services/
        └── mistralApi.js    ← Intégration API Mistral + fallback
```

## Démarrage en 3 commandes

```bash
cd timetravel-agency
npm install
npm run dev
```

Puis ouvre http://localhost:5173

**Pour le détail complet, lire `timetravel-agency/DEMARRAGE-RAPIDE.md`.**

## Ce qui couvre les critères d'évaluation

### Technique (8 / 20)
- ✅ Webapp fonctionnelle, prête à déployer sur Vercel
- ✅ Code React modulaire (1 composant = 1 fichier, services séparés, data séparée)
- ✅ Intégration des assets (images placeholders à substituer par les visuels Session 1)
- ✅ Outils IA utilisés : Vibe coding (Claude/Cowork), Mistral AI API, Framer Motion

### Fonctionnalités IA (6 / 20)
- ✅ Agent conversationnel Mistral fonctionnel, system prompt riche, fallback intelligent
- ✅ Quiz personnalisé (4 questions) qui génère une recommandation **dynamiquement par IA**
- ✅ Cohérence du chatbot avec le contexte (tarifs, destinations, ton vintage)

### UX/UI & Créativité (4 / 20)
- ✅ Design steampunk vintage cohérent — palette laiton/parchemin, typographie Cinzel
- ✅ Navigation intuitive avec ancres + menu mobile hamburger
- ✅ Animations Framer Motion subtiles (fade-in scroll, hover cards, transitions modal)
- ✅ Engrenages décoratifs animés en CSS (rotation lente/inverse)
- ✅ Responsive mobile-first

### Documentation & Open Source (2 / 20)
- ✅ `README.md` complet (stack, features, install, déploiement, crédits, licence)
- ✅ `PROMPTS.md` documentant tous les prompts IA utilisés
- ✅ `DEMARRAGE-RAPIDE.md` + `DEPLOIEMENT.md` pour faciliter la reprise
- ✅ Section « Réflexion sur le processus » dans le README

## Avant le rendu Moodle

1. **Remplacer les 4 placeholders `[Membre X]`** dans :
   - `timetravel-agency/README.md` (ligne 7)
   - `timetravel-agency/src/components/Footer.jsx` (bas du fichier)
   - `timetravel-agency/LISEZ-MOI.md` ou ce fichier
2. **Remplacer les images Unsplash** par tes visuels du projet TimeTravel Session 1 (instructions dans `DEMARRAGE-RAPIDE.md` étape 5)
3. **Créer une clé Mistral gratuite** sur https://console.mistral.ai/ et la mettre dans `.env`
4. **Déployer sur Vercel** (suivre `DEPLOIEMENT.md`)
5. **Chaque membre dépose individuellement sur Moodle** :
   - URL Vercel
   - Lien GitHub
   - Indiquer les 4 noms

Bon rendu !
