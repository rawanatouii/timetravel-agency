# Guide de déploiement

## Option 1 — Vercel (recommandé, 5 min)

Vercel est la plateforme la plus simple pour un projet Vite, et c'est gratuit illimité pour les projets pédagogiques.

### Étape A — Pousser le code sur GitHub

```bash
# Dans le dossier timetravel-agency :
git init
git add .
git commit -m "Initial commit - TimeTravel Agency webapp"

# Crée un repo sur https://github.com/new (peu importe le nom)
# Puis :
git remote add origin https://github.com/TON_USER/timetravel-agency.git
git branch -M main
git push -u origin main
```

### Étape B — Importer dans Vercel

1. Va sur https://vercel.com/new
2. Connecte ton compte GitHub (gratuit)
3. Clique « Import » sur ton repo `timetravel-agency`
4. **Framework Preset** doit être détecté automatiquement : `Vite`
5. **Important** : déplie « Environment Variables » et ajoute :
   - Name : `VITE_MISTRAL_API_KEY`
   - Value : ta clé Mistral
6. Clique « Deploy »

Au bout de 60 secondes, tu obtiens une URL du type :
`https://timetravel-agency.vercel.app`

**C'est l'URL à déposer sur Moodle.**

### Tester en production

Ouvre l'URL sur :
- ✅ Desktop (Chrome, Firefox, Safari)
- ✅ Mobile (vrai téléphone si possible)
- ✅ Vérifie que le chatbot répond
- ✅ Vérifie que le quiz fonctionne jusqu'à la recommandation IA
- ✅ Vérifie que le formulaire de réservation valide bien

---

## Option 2 — Netlify (drag & drop, 3 min)

Si tu préfères ne pas passer par Git :

```bash
npm run build      # génère le dossier dist/
```

Puis :

1. Va sur https://app.netlify.com/drop
2. Glisse-dépose le dossier `dist/`
3. URL publique générée instantanément

> ⚠ Sur Netlify, pour activer le chatbot IA, il faut configurer la variable d'environnement dans **Site settings → Environment variables**, puis re-build.

---

## Option 3 — GitHub Pages (gratuit, 5 min)

1. Modifie `vite.config.js` pour ajouter le base path :
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/timetravel-agency/',   // nom du repo
   })
   ```
2. `npm run build`
3. Installe `gh-pages` :
   ```bash
   npm install --save-dev gh-pages
   ```
4. Ajoute dans `package.json` :
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
5. `npm run deploy`
6. Active GitHub Pages dans les paramètres du repo (Settings → Pages → Branch: `gh-pages`)

> ⚠ Limitation : les variables d'environnement ne sont pas supportées par GH Pages. Le chatbot fonctionnera en mode dégradé.

---

## Que rendre sur Moodle ?

Chaque membre du groupe doit déposer **individuellement** les mêmes fichiers :

1. **URL de la webapp déployée** (lien Vercel, copié-collé dans la zone texte de Moodle)
2. **Repository GitHub** (lien public)
3. **README.md** (déjà dans le projet)
4. **PROMPTS.md** (déjà dans le projet)

Dans la zone texte de Moodle, indiquer également :
```
Groupe : [Membre 1], [Membre 2], [Membre 3], [Membre 4]
URL : https://timetravel-agency.vercel.app
Repo : https://github.com/TON_USER/timetravel-agency
```

---

## Checklist finale avant rendu

- [ ] Les 4 noms du groupe sont visibles dans le `README.md`
- [ ] Les 4 noms sont visibles dans le `Footer` de la webapp
- [ ] L'URL Vercel fonctionne sur mobile + desktop
- [ ] Le chatbot ouvre, répond, ferme correctement
- [ ] Le quiz arrive jusqu'à la recommandation finale
- [ ] Le formulaire de réservation valide les inputs
- [ ] Pas de console error dans le navigateur (F12)
- [ ] Chaque membre a déposé sur Moodle (sinon zéro)
