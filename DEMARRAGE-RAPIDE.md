# Démarrage rapide — 5 minutes

> Pour les 4 membres du groupe — guide express pour faire tourner le projet localement et le déployer.

## Étape 1 — Installer Node.js (si pas déjà fait)

Si tu n'as pas Node.js, va sur https://nodejs.org/ et installe la version LTS (recommandée). Vérifie ensuite dans un terminal :

```bash
node --version   # doit afficher v18 ou plus
npm --version
```

## Étape 2 — Lancer le projet en local

Dans le dossier du projet :

```bash
npm install     # installe toutes les dépendances (1 à 2 min)
npm run dev     # lance le serveur local sur http://localhost:5173
```

Le navigateur s'ouvre automatiquement. **C'est tout.**

> Si tu vois la page avec le titre « Explorez l'Histoire, réinventée », c'est gagné.

## Étape 3 — Activer le vrai chatbot Mistral (optionnel mais recommandé)

Sans cette étape, le chatbot fonctionne quand même en mode "fallback" (réponses pré-programmées intelligentes). Mais c'est mieux avec la vraie IA :

1. Va sur https://console.mistral.ai/
2. Crée un compte gratuit (email suffit)
3. Section « API Keys » → « Create new key »
4. Copie la clé
5. Dans le dossier du projet, copie `.env.example` en `.env` :
   ```bash
   cp .env.example .env
   ```
6. Ouvre le fichier `.env` et remplace la valeur :
   ```
   VITE_MISTRAL_API_KEY=ta_cle_mistral_ici
   ```
7. Relance `npm run dev`

## Étape 4 — Mettre à jour les noms du groupe

Ouvre `src/components/Footer.jsx` et remplace les 4 placeholders :

```jsx
<span className="text-brass-300">[Membre 1]</span>
```

…par les vrais prénoms et noms.

Pareil dans le `README.md` ligne 7.

## Étape 5 — Remplacer les visuels par ceux du projet Session 1

Les 3 cards de destinations utilisent actuellement des photos Unsplash en placeholders. Pour utiliser **vos** visuels Midjourney/Runway générés lors du premier projet TimeTravel :

1. Mets tes 3 images dans `public/images/` (à créer)
2. Ouvre `src/data/destinations.js`
3. Remplace les URLs Unsplash par les chemins locaux :
   ```js
   image: '/images/paris-1889.jpg',
   thumbnail: '/images/paris-1889-thumb.jpg',
   ```

## Étape 6 — Tester sur mobile

Dans Chrome → F12 → bouton « toggle device toolbar » (Ctrl+Shift+M) → sélectionner « iPhone 12 Pro ».
Vérifier que tout passe bien (menu hamburger, cards en colonne unique, chatbot accessible).

## Étape 7 — Déployer sur Vercel

Voir le fichier `DEPLOIEMENT.md`.

---

## Commandes utiles

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement (hot reload) |
| `npm run build` | Build optimisé pour la prod (dossier `dist/`) |
| `npm run preview` | Aperçu local du build de prod |

## Que faire si ça ne marche pas ?

| Erreur | Solution |
|---|---|
| `command not found: npm` | Installer Node.js (voir étape 1) |
| `EACCES` ou permissions | `sudo npm install` (Mac/Linux) |
| Le port 5173 est occupé | Vite ouvre automatiquement le suivant (5174) |
| Le chatbot répond bizarrement | Vérifier la clé Mistral dans `.env` |
| Les images ne chargent pas | Vérifier la connexion internet (Unsplash CDN) |
