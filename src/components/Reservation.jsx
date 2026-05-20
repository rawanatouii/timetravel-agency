import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, User, Mail } from 'lucide-react';
import { destinations } from '../data/destinations.js';

export default function Reservation() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    destination: destinations[0].id,
    date: '',
    travelers: 2,
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return 'Veuillez indiquer votre nom.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Adresse email invalide.';
    if (!form.date) return 'Veuillez choisir une date de départ.';
    if (new Date(form.date) < new Date()) return 'La date doit être dans le futur.';
    if (form.travelers < 1) return 'Au moins un voyageur est requis.';
    return '';
  };

  const submit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setSubmitted(true);
    // Pas de backend ici - réservation simulée (cadre pédagogique)
  };

  const selected = destinations.find((d) => d.id === form.destination);

  return (
    <section id="reservation" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent to-ink-800/40">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-brass-400 uppercase">Réservation</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 mb-6">
            Embarquez pour <span className="gold-text italic font-serif">l'aventure</span>
          </h2>
          <div className="ornate-divider mx-auto w-48 mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-parchment-200/80 font-serif">
            Réservez dès aujourd'hui votre voyage temporel. Un conseiller dédié
            vous recontactera sous 24h pour finaliser votre itinéraire.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="card-vintage p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <Field label="Nom complet" icon={User}>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Marie Dupont"
                    className="vintage-input"
                  />
                </Field>

                <Field label="Email" icon={Mail}>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="marie@example.com"
                    className="vintage-input"
                  />
                </Field>

                <Field label="Destination temporelle" full>
                  <select
                    value={form.destination}
                    onChange={update('destination')}
                    className="vintage-input"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} — {d.price} ({d.duration})
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Date de départ" icon={Calendar}>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={update('date')}
                    className="vintage-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Field>

                <Field label="Voyageurs">
                  <input
                    type="number"
                    min={1}
                    max={8}
                    required
                    value={form.travelers}
                    onChange={update('travelers')}
                    className="vintage-input"
                  />
                </Field>

                <Field label="Demandes particulières (optionnel)" full>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={update('notes')}
                    placeholder="Régime alimentaire, intérêts spécifiques, accessibilité…"
                    className="vintage-input resize-none"
                  />
                </Field>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between p-4 mb-4 border border-brass-500/30 bg-ink-900/40 rounded-sm">
                    <div>
                      <p className="font-mono text-[10px] tracking-widest text-brass-400 uppercase">Estimation</p>
                      <p className="font-display text-2xl gold-text">
                        {(parseInt(selected.price.replace(/\D/g, ''), 10) * form.travelers).toLocaleString('fr-FR')} €
                      </p>
                    </div>
                    <p className="font-serif italic text-sm text-parchment-200/70 text-right">
                      {form.travelers} voyageur(s) × {selected.price}
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-300 text-sm mb-3 font-serif italic">⚠ {error}</p>
                  )}

                  <button type="submit" className="btn-brass w-full justify-center">
                    Confirmer la demande de réservation
                  </button>
                  <p className="text-center font-mono text-[10px] tracking-widest text-brass-500/60 uppercase mt-3">
                    Aucun paiement requis · Confirmation sous 24h
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex p-5 rounded-full bg-brass-400/20 border-2 border-brass-400 mb-6">
                  <Check className="w-10 h-10 text-brass-300" />
                </div>
                <h3 className="font-display text-3xl text-parchment-100 mb-3">
                  Demande enregistrée !
                </h3>
                <p className="font-serif text-parchment-200/85 mb-6 max-w-md mx-auto">
                  Merci <strong className="text-brass-300">{form.name}</strong> ! Votre demande pour
                  <em className="text-brass-300"> {selected.name} </em>
                  a bien été reçue. Un email de confirmation vient d'être envoyé à
                  <span className="text-brass-300"> {form.email}</span>.
                </p>
                <p className="font-serif italic text-parchment-200/60 text-sm mb-6">
                  Notre conseiller temporel vous contactera sous 24 heures pour finaliser votre itinéraire.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ ...form, name: '', email: '', date: '', notes: '' });
                  }}
                  className="btn-ghost"
                >
                  Faire une nouvelle réservation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .vintage-input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          background: rgba(26, 15, 10, 0.5);
          border: 1px solid rgba(184, 115, 51, 0.35);
          color: #fdf8f0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .vintage-input::placeholder { color: rgba(249, 240, 210, 0.4); font-style: italic; }
        .vintage-input:focus { outline: none; border-color: #d4a574; background: rgba(26, 15, 10, 0.75); }
        .vintage-input:focus { box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.15); }
      `}</style>
    </section>
  );
}

function Field({ label, icon: Icon, full, children }) {
  return (
    <label className={`block ${full ? 'md:col-span-2' : ''}`}>
      <span className="font-mono text-[10px] tracking-widest text-brass-400 uppercase mb-2 flex items-center gap-2">
        {Icon && <Icon size={12} />} {label}
      </span>
      {children}
    </label>
  );
}
