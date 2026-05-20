import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Loader2 } from 'lucide-react';
import { destinations, getDestinationById } from '../data/destinations.js';
import { generatePersonalizedDescription } from '../services/mistralApi.js';

/**
 * Quiz de recommandation personnalisée (Exercice 3.2 optionnel).
 * Algorithme : chaque réponse donne 1 point à 1 ou 2 destinations.
 * Celle qui totalise le plus de points est recommandée.
 * Une description personnalisée est ensuite générée par l'IA (Mistral).
 */
const questions = [
  {
    id: 'experience',
    text: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: 'Culturelle et artistique', destId: 'florence-1504' },
      { label: 'Aventure et nature', destId: 'cretace' },
      { label: 'Élégance et raffinement', destId: 'paris-1889' },
    ],
  },
  {
    id: 'period',
    text: 'Votre période préférée ?',
    options: [
      { label: 'Histoire moderne (XIXe-XXe siècle)', destId: 'paris-1889' },
      { label: 'Temps anciens et origines', destId: 'cretace' },
      { label: 'Renaissance et classicisme', destId: 'florence-1504' },
    ],
  },
  {
    id: 'ambience',
    text: 'Vous préférez :',
    options: [
      { label: "L'effervescence urbaine", destId: 'paris-1889' },
      { label: 'La nature sauvage', destId: 'cretace' },
      { label: "L'art et l'architecture", destId: 'florence-1504' },
    ],
  },
  {
    id: 'activity',
    text: 'Votre activité idéale :',
    options: [
      { label: 'Visiter des monuments', destId: 'paris-1889' },
      { label: 'Observer la faune', destId: 'cretace' },
      { label: 'Explorer des musées', destId: 'florence-1504' },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(-1); // -1 = intro, 0..3 = questions, 4 = result
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [aiText, setAiText] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const start = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setAiText('');
  };

  const choose = async (option, question) => {
    const newAnswers = [...answers, { question: question.text, label: option.label, destId: option.destId }];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Compute winner
      const counts = {};
      newAnswers.forEach((a) => {
        counts[a.destId] = (counts[a.destId] || 0) + 1;
      });
      const winnerId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      const winner = getDestinationById(winnerId);
      setResult(winner);
      setStep(questions.length);

      // Génère la description personnalisée via IA
      setLoadingAi(true);
      try {
        const interests = newAnswers.map((a) => a.label.toLowerCase());
        const text = await generatePersonalizedDescription(winner.name, interests);
        setAiText(text);
      } catch (e) {
        setAiText("Cette destination semble parfaitement correspondre à votre profil d'explorateur !");
      } finally {
        setLoadingAi(false);
      }
    }
  };

  return (
    <section id="quiz" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-brass-400 uppercase">Conseil Personnalisé · IA</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 mb-6">
            Trouvez <span className="gold-text italic font-serif">votre époque</span>
          </h2>
          <div className="ornate-divider mx-auto w-48 mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-parchment-200/80 font-serif">
            4 questions, et notre intelligence artificielle vous recommande
            la destination temporelle taillée pour votre âme.
          </p>
        </motion.div>

        <div className="card-vintage p-8 md:p-12 min-h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === -1 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <Sparkles className="w-12 h-12 text-brass-300 mx-auto mb-6 animate-flicker" />
                <h3 className="font-display text-3xl text-parchment-100 mb-4">
                  Prêt(e) pour le diagnostic temporel ?
                </h3>
                <p className="font-serif text-parchment-200/80 mb-8 max-w-lg mx-auto">
                  Répondez sincèrement aux 4 questions suivantes. À la fin, notre
                  IA générera une recommandation personnalisée rien que pour vous.
                </p>
                <button onClick={start} className="btn-brass">
                  Commencer le quiz
                </button>
              </motion.div>
            )}

            {step >= 0 && step < questions.length && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="flex items-center gap-2 mb-6 justify-center">
                  {questions.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i <= step ? 'bg-brass-400 w-12' : 'bg-brass-700/40 w-6'
                      }`}
                    />
                  ))}
                </div>
                <p className="font-mono text-xs tracking-widest text-brass-400 text-center mb-3">
                  QUESTION {step + 1} / {questions.length}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-parchment-100 text-center mb-8">
                  {questions[step].text}
                </h3>
                <div className="grid gap-3 max-w-xl mx-auto">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => choose(opt, questions[step])}
                      className="text-left p-4 border border-brass-500/30 rounded-sm bg-ink-900/40 hover:bg-brass-900/30 hover:border-brass-400 transition-all duration-300 font-serif text-lg text-parchment-200 hover:text-brass-200 hover:translate-x-1"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === questions.length && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="text-center mb-6">
                  <span className="font-mono text-xs tracking-[0.3em] text-brass-400 uppercase">Votre destination idéale</span>
                  <h3 className="font-display text-4xl md:text-5xl mt-2 gold-text italic">
                    {result.name}
                  </h3>
                  <p className="font-serif italic text-brass-200 mt-1">{result.tagline}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-center mb-6">
                  <img
                    src={result.thumbnail}
                    alt={result.name}
                    className="w-full h-56 object-cover rounded-sm border border-brass-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={16} className="text-brass-300" />
                      <span className="font-mono text-xs tracking-widest text-brass-400 uppercase">
                        Recommandation IA
                      </span>
                    </div>
                    {loadingAi ? (
                      <div className="flex items-center gap-2 text-parchment-200/70 font-serif">
                        <Loader2 className="animate-spin" size={18} />
                        <span>Génération de votre recommandation personnalisée…</span>
                      </div>
                    ) : (
                      <p className="font-serif text-parchment-100/90 leading-relaxed italic">
                        « {aiText} »
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="#reservation" className="btn-brass">
                    Réserver {result.name}
                  </a>
                  <button onClick={start} className="btn-ghost">
                    <RefreshCw size={16} /> Refaire le quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
