# Prompts utilisés pendant le développement

> Transparence sur l'utilisation de l'IA générative durant le projet TimeTravel Agency.
> Conforme au critère « Documentation & Open Source » du brief Ynov M1/M2.

---

## 1. Prompt initial de génération du projet (vibe coding)

**Outil :** Claude Sonnet via Cowork
**Objectif :** Générer la base du code de la webapp

```
Crée une webapp React (Vite + Tailwind) pour une agence de voyage temporel fictive
appelée "TimeTravel Agency". Style visuel : vintage steampunk élégant — palette
laiton/cuivre/parchemin sur fond sombre, typographie Cinzel + Cormorant Garamond,
engrenages décoratifs animés en CSS.

Structure :
- Header sticky avec navigation (L'Agence, Destinations, Quiz, Réservation)
- Hero plein écran avec animation d'engrenages, titre principal, 2 CTA
- Section "À propos" avec 3 features (Chrono-Sécurité, Guides experts, Luxe)
- Galerie de 3 destinations (Paris 1889, Crétacé -65M, Florence 1504)
  avec cards cliquables + modal de détails
- Quiz IA personnalisé de 4 questions (recommandation de destination)
- Formulaire de réservation avec validation
- Chatbot widget flottant en bas à droite
- Footer

Utilise Framer Motion pour les animations au scroll (subtiles, élégantes).
Code propre, composants séparés, accessibilité de base (aria-label).
Responsive mobile-first.
```

## 2. System prompt du chatbot (Mistral)

**Modèle :** `mistral-small-latest`
**Localisation :** `src/services/mistralApi.js`

```
Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel
de luxe. Ton rôle : conseiller les clients sur les meilleures destinations
temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)
- Tu emploies un français soutenu, avec quelques touches d'élégance vintage
  (style "Belle Époque")
- Réponses concises (3-5 phrases maximum), sauf si on te demande des détails

Tu connais parfaitement les 3 destinations de l'agence :

1. PARIS 1889 (Belle Époque) — 12 800 €, 7 jours
   - Exposition Universelle, inauguration de la Tour Eiffel
   - Cabarets de Montmartre, dîners au Train Bleu
   - Public : amateurs d'art, d'architecture, de raffinement

2. CRÉTACÉ -65M (Mésozoïque) — 24 500 €, 5 jours
   - Safari sécurisé parmi les dinosaures (T-Rex, triceratops, hadrosaures)
   - Aérostat protégé, camp éco-temporel
   - Public : aventuriers, naturalistes

3. FLORENCE 1504 (Haute Renaissance) — 18 200 €, 6 jours
   - Léonard de Vinci, Michel-Ange (inauguration du David), Raphaël
   - Banquet chez les Médicis
   - Public : passionnés d'art, culture, histoire

Tu peux suggérer des destinations selon les intérêts du client.
Tu réponds aussi aux questions sur la sécurité du voyage temporel (paradoxes,
bouclier dimensionnel, etc.) en gardant le ton fictif mais crédible.

Si on te pose une question hors-sujet (politique, médecine, code...), tu rediriges
poliment vers les voyages temporels.
```

**Paramètres :** `temperature: 0.7`, `max_tokens: 400`

## 3. Prompt de génération de description personnalisée (Quiz)

**Modèle :** `mistral-small-latest`
**Déclenché :** à la fin du quiz, avec les réponses de l'utilisateur

```
Rédige une description courte (3-4 phrases) et personnalisée pour vendre
le voyage à "{destinationName}" à un client passionné par : {interests}.
Ton chaleureux et professionnel, style agence de luxe.
```

**Paramètres :** `temperature: 0.8`, `max_tokens: 200`

## 4. Prompts d'itération design

Quelques prompts utilisés pour raffiner le rendu visuel :

```
Améliore la card de destination en :
- Ajoutant un dégradé sombre du bas pour la lisibilité du titre
- Mettant un badge "ère" en haut à gauche avec bord cuivré
- Faisant un hover effect translateY(-8px) + scale image 1.10
- Bouton "Détails" avec icône chevron qui glisse au hover
```

```
Ajoute des animations Framer Motion subtiles :
- Fade-in progressif des sections au scroll (whileInView)
- Stagger sur les cards de destinations (delay: i * 0.15)
- Animation d'apparition du hero en 3 étapes (badge → titre → CTA)
- Durée 0.6-0.8s, easing easeOut

Surtout pas d'animations trop voyantes : on veut élégant, pas tape-à-l'œil.
```

## 5. Versioning des prompts — ce qui a bien fonctionné

✅ **Donner du contexte fort au chatbot** (system prompt long et précis)
→ réponses cohérentes dès le premier essai

✅ **Spécifier le ton ET les contraintes de longueur**
→ évite les réponses kilométriques

✅ **Itérer par petites touches**
→ "ajoute X" plutôt que "regénère le composant Y"

✅ **Fallback intelligent côté code**
→ pour ne pas casser la démo si la clé API n'est pas configurée

## 6. Ce qui n'a pas fonctionné (et ce qu'on a corrigé)

❌ **Prompts trop vagues** comme "fais quelque chose de beau"
→ remplacé par des prompts précis (palette, animations, contraintes)

❌ **Régénération complète à chaque changement**
→ remplacé par des éditions ciblées composant par composant

❌ **Oubli de la responsivité mobile au départ**
→ ajout systématique d'un audit mobile-first avec breakpoints `md:` et `sm:`

---

*Document rédigé dans un souci de transparence et de pédagogie sur l'usage de l'IA générative.*
