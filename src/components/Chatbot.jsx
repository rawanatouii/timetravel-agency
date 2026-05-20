import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../services/mistralApi.js';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    "Bonjour et bienvenue chez TimeTravel Agency ! Je suis votre conseiller virtuel en voyages temporels. Que puis-je vous faire découvrir : Paris 1889, le Crétacé, ou Florence 1504 ?",
};

const SUGGESTIONS = [
  'Quelle destination pour un amateur d\'art ?',
  'Combien coûte le voyage au Crétacé ?',
  'Est-ce vraiment sans danger ?',
  'Que voir à Paris en 1889 ?',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg = { role: 'user', content };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      // On envoie l'historique sans le message initial du bot (purement décoratif côté UI)
      const apiHistory = newHistory.filter((m, i) => !(i === 0 && m.role === 'assistant'));
      const reply = await sendChatMessage(apiHistory);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Pardonnez-moi, une légère perturbation temporelle me coupe la communication. Pourriez-vous reformuler votre question ?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl group"
        style={{
          background: 'linear-gradient(135deg, #b87333 0%, #d4a574 50%, #b87333 100%)',
          boxShadow: '0 8px 25px rgba(184,115,51,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
        }}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-ink-900" />
            </motion.div>
          ) : (
            <motion.div key="c" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-ink-900" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-brass-400/30" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px] h-[560px] max-h-[80vh] card-vintage flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-brass-500/30 bg-gradient-to-r from-ink-800 to-ink-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brass-400 to-brass-700 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-ink-900" />
                </div>
                <div>
                  <h3 className="font-display text-parchment-100 text-lg leading-none">Conseiller TimeTravel</h3>
                  <p className="font-mono text-[10px] tracking-widest text-brass-300 uppercase mt-1">
                    Assistant IA · En ligne
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <ChatBubble key={i} role={m.role} content={m.content} />
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-parchment-200/70">
                  <Loader2 size={16} className="animate-spin text-brass-400" />
                  <span className="font-serif italic text-sm">Le conseiller rédige…</span>
                </div>
              )}

              {/* Suggestions visibles au début */}
              {messages.length === 1 && !loading && (
                <div className="pt-4 space-y-2">
                  <p className="font-mono text-[10px] tracking-widest text-brass-400/70 uppercase">Suggestions</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-sm font-serif italic px-3 py-2 rounded-sm border border-brass-500/25 text-parchment-200/80 hover:bg-brass-900/30 hover:border-brass-400/50 hover:text-brass-200 transition"
                    >
                      « {s} »
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-brass-500/30 bg-ink-900/60">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Posez-moi vos questions sur les voyages temporels…"
                  disabled={loading}
                  className="flex-1 px-3 py-2 bg-ink-900/80 border border-brass-500/30 rounded-sm text-parchment-100 placeholder:text-parchment-200/40 font-serif text-sm focus:outline-none focus:border-brass-400 transition"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="p-2 bg-gradient-to-br from-brass-400 to-brass-600 text-ink-900 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed hover:from-brass-300 transition"
                  aria-label="Envoyer"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="font-mono text-[9px] tracking-widest text-brass-500/60 uppercase mt-2 text-center">
                Propulsé par Mistral AI · mistral-small
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] px-4 py-2.5 font-serif text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-brass-500 to-brass-700 text-ink-900 rounded-2xl rounded-br-sm'
            : 'bg-ink-700/80 border border-brass-500/20 text-parchment-100 rounded-2xl rounded-bl-sm'
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
}
