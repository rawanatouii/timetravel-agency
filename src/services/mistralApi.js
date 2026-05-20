/**
 * Service d'intégration avec l'API Mistral AI.
 * - Modèle utilisé : mistral-small-latest (gratuit / niveau gratuit généreux)
 * - Doc officielle : https://docs.mistral.ai/api/
 *
 * Sécurité : la clé est lue depuis import.meta.env.VITE_MISTRAL_API_KEY.
 * Pour la production, il est recommandé de passer par un backend pour ne pas
 * exposer la clé côté client. Ici nous restons en client-only pour rester
 * dans le cadre pédagogique du projet (2h, déploiement Vercel/Netlify direct).
 */

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)
- Tu emploies un français soutenu, avec quelques touches d'élégance vintage (style "Belle Époque")
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
Tu réponds aussi aux questions sur la sécurité du voyage temporel (paradoxes, bouclier dimensionnel, etc.) en gardant le ton fictif mais crédible.

Si on te pose une question hors-sujet (politique, médecine, code...), tu rediriges poliment vers les voyages temporels.`;

const MISTRAL_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';
const MODEL = 'mistral-small-latest';

/**
 * Envoie un message au chatbot et reçoit une réponse.
 * @param {Array<{role: 'user'|'assistant', content: string}>} history - Historique conversationnel
 * @returns {Promise<string>} La réponse du modèle
 */
export async function sendChatMessage(history) {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

  if (!apiKey || apiKey === 'your_mistral_api_key_here') {
    // Mode démo (pas de clé) : on retourne une réponse simulée intelligente
    return fallbackResponse(history[history.length - 1]?.content || '');
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
  ];

  try {
    const response = await fetch(MISTRAL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Mistral API error:', errText);
      return fallbackResponse(history[history.length - 1]?.content || '');
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || fallbackResponse('');
  } catch (err) {
    console.error('Mistral fetch error:', err);
    return fallbackResponse(history[history.length - 1]?.content || '');
  }
}

/**
 * Réponse de secours simulée intelligente (basée sur mots-clés).
 * Utilisée quand l'API Mistral n'est pas configurée ou indisponible.
 */
function fallbackResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (/paris|eiffel|1889|belle ?époque|montmartre/.test(msg)) {
    return "Paris 1889, quelle merveille ! Vous arriverez juste à temps pour l'Exposition Universelle et l'inauguration de la Tour Eiffel. Notre forfait à 12 800 € inclut un dîner privé au Train Bleu et une soirée au Moulin Rouge tout neuf. Une destination idéale pour les amateurs d'élégance.";
  }
  if (/dinosaure|crétac|jurassique|65|t-rex|tyranno|nature|aventure/.test(msg)) {
    return "Ah, le Crétacé ! Notre destination la plus audacieuse — 65 millions d'années en arrière, au cœur d'une nature préservée. Safari aérostat sécurisé, observation de T-Rex et de troupeaux d'hadrosaures. Forfait à 24 500 € sur 5 jours. Soyez rassuré : notre bouclier dimensionnel garantit votre sécurité absolue.";
  }
  if (/florence|renaissance|vinci|michel|david|médicis|art/.test(msg)) {
    return "Florence 1504 — la Renaissance dans toute sa splendeur ! Vous pourrez visiter l'atelier de Léonard de Vinci et assister à l'inauguration du David de Michel-Ange. Banquet chez les Médicis inclus. 18 200 € pour 6 jours d'émerveillement. Une destination incontournable pour qui aime l'art.";
  }
  if (/prix|tarif|coût|combien/.test(msg)) {
    return "Voici nos tarifs : Paris 1889 à 12 800 € (7j), Florence 1504 à 18 200 € (6j), et Crétacé -65M à 24 500 € (5j). Tous nos forfaits incluent transport temporel sécurisé, hébergement d'époque, repas gastronomiques, et assistance 24/7 d'un guide expert.";
  }
  if (/sécurité|paradoxe|danger|risque/.test(msg)) {
    return "Excellente question ! Tous nos voyages utilisent le protocole Chrono-Sécurité™ : bouclier dimensionnel anti-paradoxe, observation sans interaction directe avec l'époque, et extraction d'urgence en moins de 12 secondes. Aucun incident en 1 247 voyages réalisés.";
  }
  if (/conseil|recommand|suggér|choisir|quelle/.test(msg)) {
    return "Pour bien vous conseiller, j'aimerais en savoir un peu plus : préférez-vous l'art et la culture, l'aventure dans la nature, ou l'élégance et l'effervescence urbaine ? N'hésitez pas aussi à essayer notre Quiz personnalisé sur la page d'accueil — il vous recommandera la destination parfaite !";
  }
  if (/bonjour|salut|hello|coucou/.test(msg)) {
    return "Bonjour et bienvenue chez TimeTravel Agency ! Je suis votre conseiller en voyages temporels. Que puis-je vous faire découvrir aujourd'hui : Paris 1889, le Crétacé peuplé de dinosaures, ou la Florence de la Renaissance ?";
  }
  if (/merci|thank/.test(msg)) {
    return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions. Le temps n'attend personne... sauf chez TimeTravel Agency.";
  }

  return "Je suis votre conseiller en voyages temporels chez TimeTravel Agency. Je peux vous renseigner sur nos trois destinations exclusives : Paris 1889, le Crétacé -65M, ou Florence 1504. Sur quelle époque souhaitez-vous en savoir plus ?";
}

/**
 * Génère une description personnalisée d'une destination en fonction des intérêts.
 * Utilisé par le quiz de recommandation (Exercice 3.2).
 */
export async function generatePersonalizedDescription(destinationName, interests) {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

  const prompt = `Rédige une description courte (3-4 phrases) et personnalisée pour vendre le voyage à "${destinationName}" à un client passionné par : ${interests.join(', ')}. Ton chaleureux et professionnel, style agence de luxe.`;

  if (!apiKey || apiKey === 'your_mistral_api_key_here') {
    return `Cette destination est parfaite pour vous ! Avec votre passion pour ${interests.join(' et ')}, vous trouverez à ${destinationName} exactement ce qui fait battre votre cœur d'explorateur. Une expérience taillée sur mesure, où chaque instant résonne avec vos centres d'intérêt. TimeTravel Agency vous accompagne dans cette aventure unique.`;
  }

  try {
    const response = await fetch(MISTRAL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() ||
      `Cette destination semble faite pour vous, ${destinationName} vous tend les bras.`;
  } catch (err) {
    console.error(err);
    return `Cette destination semble faite pour vous, ${destinationName} vous tend les bras.`;
  }
}
