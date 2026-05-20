# TimeTravel Agency - Webapp Interactive

> **Projet pédagogique M1/M2 Digital & IA — Ynov**
> Webapp moderne et interactive pour une agence de voyage temporel fictive, propulsée par l'IA générative.

**Membres du groupe :** [Membre 1], [Membre 2], [Membre 3], [Membre 4]

---

## Le projet

TimeTravel Agency est une agence fictive qui propose des voyages dans le temps vers trois époques d'exception :

- **Paris 1889** — Belle Époque, inauguration de la Tour Eiffel
- **Crétacé -65M** — Safari préhistorique parmi les dinosaures
- **Florence 1504** — Apogée de la Renaissance italienne

L'objectif pédagogique est de pratiquer le *vibe coding* (génération de code par IA), d'intégrer un agent conversationnel, et de mettre en place une feature d'automatisation/personnalisation.

## Stack technique

| Domaine | Technologie |
|---|---|
| Framework UI | **React 18** + Vite |
| Styling | **Tailwind CSS 3** + thème custom *Steampunk Vintage* |
| Animations | **Framer Motion** (fade-in scroll, transitions, micro-interactions) |
| Icônes | **Lucide React** |
| IA conversationnelle | **Mistral AI API** (`mistral-small-latest`) |
| Polices | Google Fonts — Cinzel, Cormorant Garamond, Special Elite |
| Hébergement images | Unsplash (placeholders, à remplacer par visuels Session 1) |
| Déploiement | **Vercel** (1-clic) ou Netlify |

## Features implémentées

### Phase 1 — Architecture & Planning
- Structure de navigation : Header → Hero → About → Destinations → Quiz → Réservation → Footer
- Design mobile-first 100% responsive

### Phase 2 — Vibe Coding
- **Hero section** avec image de fond, animations d'apparition, engrenages steampunk animés en CSS, CTA doubles
- **Section "L'Agence"** présentant la mission et les 3 piliers de l'agence
- **Galerie des destinations** avec 3 cards interactives, modal détaillée par destination, hover effects
- **Intégration assets** : images de chaque destination en hero des cards (placeholders Unsplash à substituer par les visuels du premier projet TimeTravel)
- **Lazy loading** sur toutes les images
- **Animations Framer Motion** (Exercice 2.3 optionnel) :
  - Fade-in progressif au scroll (`whileInView`)
  - Apparition échelonnée du hero
  - Hover effects sur cards (translateY + scale)
  - Transition fluide du modal de destination

### Phase 3 — Intelligence Artificielle
- **Agent conversationnel (3.1)** — Chatbot Mistral en bas à droite, ouverture sur clic, system prompt riche avec personnalité (« conseiller en voyage temporel de luxe »), historique conversationnel, suggestions de questions au démarrage, fallback intelligent si pas de clé API
- **Quiz personnalisé (3.2 optionnel)** — 4 questions, algorithme de scoring par destination, **description finale générée dynamiquement par l'IA** en fonction des centres d'intérêt choisis
- **Formulaire de réservation** avec validation (email, date future, voyageurs) et calcul automatique du tarif

### Phase 4 — Déploiement
- Build optimisé Vite
- Déploiement Vercel (gratuit, illimité)
- URL publique testable mobile + desktop

## Installation & lancement

```bash
# 1. Cloner ou télécharger le projet
git clone <repo>
cd timetravel-agency

# 2. Installer les dépendances
npm install

# 3. Configurer la clé Mistral (optionnel - le chatbot fonctionne en mode dégradé sans clé)
cp .env.example .env
# Puis éditer .env et coller votre clé Mistral (gratuite sur https://console.mistral.ai/)

# 4. Lancer en développement
npm run dev

# 5. Build pour production
npm run build
```

### Obtenir une clé Mistral gratuite (2 minutes)

1. Aller sur https://console.mistral.ai/
2. Créer un compte (gratuit)
3. Onglet « API Keys » → « Create new key »
4. Copier la clé dans le fichier `.env` :
   ```
   VITE_MISTRAL_API_KEY=ma_cle_secrete_ici
   ```

> ℹ Sans clé, le chatbot bascule automatiquement sur un mode de réponses simulées basées sur des mots-clés, ce qui permet la démo.

## Déploiement sur Vercel (5 min)

1. Pousser le repo sur GitHub
2. Sur [vercel.com](https://vercel.com), cliquer « Add New Project »
3. Importer le repo GitHub
4. Vercel détecte automatiquement Vite — laisser tous les paramètres par défaut
5. Dans **Environment Variables**, ajouter `VITE_MISTRAL_API_KEY` avec la clé Mistral
6. Cliquer « Deploy » — URL publique disponible en 60 secondes

## Outils IA utilisés (transparence)

Conformément aux bonnes pratiques open source et au critère « Documentation & Open Source » du brief :

| Étape | Outil IA | Modèle / Service |
|---|---|---|
| Génération du code source | Vibe coding | Claude Sonnet via Cowork |
| Maquette préliminaire | Mental + v0.dev (inspiration) | — |
| Visuels destinations (Session 1) | Midjourney + Runway | À substituer aux placeholders Unsplash |
| Chatbot conversationnel | Mistral AI API | `mistral-small-latest` |
| Description personnalisée du quiz | Mistral AI API | `mistral-small-latest` |
| Polices typographiques | Google Fonts | Cinzel, Cormorant Garamond, Special Elite |

## Prompts utilisés

Les prompts notables utilisés pendant la génération sont documentés dans `PROMPTS.md`. Cela couvre :
- Le system prompt complet du chatbot
- Le prompt de génération du quiz personnalisé
- Le brief initial passé à l'IA générative pour la base du code

## Choix de conception

**Pourquoi le thème *Steampunk Vintage* ?**
Nous voulions créer une atmosphère cohérente avec le concept même de voyage temporel. Le vocabulaire visuel steampunk — engrenages, laiton patiné, parchemins, typographie Cinzel — évoque les machines à voyager dans le temps tout en restant élégant et professionnel. Cela différencie notre webapp des classiques *landing pages SaaS* dark-mode-bleu.

**Pourquoi React + Vite et pas Bolt.new ?**
Nous avons préféré générer le code par prompting (vibe coding) puis l'éditer manuellement pour maîtriser la qualité, la structure des composants et la performance. Vite garantit un build optimisé pour le déploiement sur Vercel.

**Pourquoi Mistral et pas OpenAI ?**
Mistral AI est un acteur français open-source, son niveau gratuit est généreux (`mistral-small-latest`), et il s'aligne avec la valorisation open-source du projet.

## Réflexion sur le processus

**Ce qui a bien fonctionné :**
- La séparation claire des composants React permet à 4 personnes de travailler en parallèle sur différentes parties
- Le system prompt riche du chatbot rend ses réponses cohérentes avec l'univers de l'agence dès la première réponse
- Tailwind avec un thème custom (`brass`, `parchment`, `ink`) donne une cohérence visuelle immédiate
- Le mode dégradé du chatbot (fallback sur mots-clés sans clé API) permet de démontrer la fonctionnalité même sans configuration

**Limites & pistes d'amélioration :**
- La clé API Mistral est exposée côté client — pour la production, il faudrait un backend (Edge function Vercel par exemple)
- Les visuels sont actuellement des placeholders Unsplash — à remplacer par les images générées via Midjourney lors du projet Session 1
- Pas de vrai backend pour la réservation (simulée côté client)

**Apprentissages clés :**
- L'importance d'un *context is king* pour les agents IA — un system prompt précis vaut mieux qu'un long prompt utilisateur
- Le compromis vitesse / qualité du vibe coding : génération rapide initiale, puis édition manuelle ciblée
- L'animation au service du sens : les engrenages qui tournent renforcent l'univers, sans alourdir la performance

## Structure du projet

```
timetravel-agency/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        Header sticky avec menu mobile
│   │   ├── Hero.jsx          Section d'accueil avec engrenages animés
│   │   ├── About.jsx         Présentation de l'agence (3 piliers)
│   │   ├── Destinations.jsx  Galerie + modal détaillée
│   │   ├── Quiz.jsx          Quiz IA personnalisé (Exercice 3.2)
│   │   ├── Reservation.jsx   Formulaire avec validation
│   │   ├── Footer.jsx        Pied de page + crédits
│   │   └── Chatbot.jsx       Widget Mistral en bas à droite
│   ├── data/
│   │   └── destinations.js   Source de vérité des 3 destinations
│   ├── services/
│   │   └── mistralApi.js     Intégration API + fallback intelligent
│   ├── App.jsx               Composition générale
│   ├── main.jsx              Point d'entrée React
│   └── index.css             Tailwind + styles vintage
├── index.html
├── package.json
├── tailwind.config.js        Thème steampunk (brass, parchment, ink)
├── vite.config.js
├── PROMPTS.md                Prompts utilisés pendant le développement
└── README.md
```

## Crédits

- **Images destinations :** placeholders [Unsplash](https://unsplash.com/license) (licence libre) — à remplacer par les visuels Midjourney/Runway du projet TimeTravel Session 1
- **Icônes :** [Lucide](https://lucide.dev/license) (licence ISC)
- **Polices :** [Google Fonts](https://fonts.google.com/) (Open Font License)
- **API IA :** [Mistral AI](https://mistral.ai/) — niveau gratuit
- **Inspiration design :** Awwwards, Dribbble (thème steampunk/vintage)

## Licence

Projet pédagogique réalisé dans le cadre du Master Digital & IA — Ynov.
Code source disponible librement à des fins éducatives.

---

> *« Le temps n'attend personne… sauf chez TimeTravel Agency. »*
