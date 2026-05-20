import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, MapPin, Clock as ClockIcon, Tag } from 'lucide-react';
import { destinations } from '../data/destinations.js';

export default function Destinations() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="destinations" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-ink-800/30 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-brass-400 uppercase">Itinéraires Exclusifs</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 mb-6">
            Nos <span className="gold-text italic font-serif">3 Destinations</span>
          </h2>
          <div className="ornate-divider mx-auto w-48 mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-parchment-200/80 font-serif">
            Trois époques soigneusement sélectionnées par nos historiens.
            Chaque voyage est une œuvre d'art temporelle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {destinations.map((dest, i) => (
            <motion.article
              key={dest.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="card-vintage group cursor-pointer"
              onClick={() => setSelected(dest)}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={dest.thumbnail}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-ink-900/80 backdrop-blur-sm border border-brass-400/40 rounded-sm">
                  <span className="font-mono text-xs tracking-widest text-brass-300 uppercase">{dest.era}</span>
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="font-display text-3xl text-parchment-100 mb-1 drop-shadow-lg">
                    {dest.name}
                  </h3>
                  <p className="font-serif italic text-brass-200/90 text-sm">{dest.tagline}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="font-serif text-parchment-200/85 leading-relaxed mb-5 line-clamp-3">
                  {dest.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {dest.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono tracking-wider text-brass-300 border border-brass-500/30 rounded-sm bg-brass-900/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-brass-500/20">
                  <div>
                    <p className="font-mono text-[10px] text-brass-400/70 uppercase tracking-widest">À partir de</p>
                    <p className="font-display text-2xl gold-text">{dest.price}</p>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-display uppercase text-xs tracking-widest text-brass-300 group-hover:text-brass-200 transition-colors"
                  >
                    Détails <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal détails */}
      <AnimatePresence>
        {selected && <DestinationModal destination={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function DestinationModal({ destination, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="card-vintage max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-64 md:h-80">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-ink-900/70 hover:bg-ink-900 text-brass-300 rounded-full transition"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="font-mono text-xs tracking-[0.3em] text-brass-300 uppercase">{destination.era}</span>
            <h3 className="font-display text-4xl md:text-5xl text-parchment-100 mt-1">{destination.name}</h3>
            <p className="font-serif italic text-brass-200 mt-1">{destination.tagline}</p>
          </div>
        </div>

        <div className="p-8">
          <p className="font-serif text-lg text-parchment-200/90 leading-relaxed mb-6">
            {destination.longDescription}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-7">
            <InfoBlock icon={Tag} label="Tarif" value={destination.price} />
            <InfoBlock icon={ClockIcon} label="Durée" value={destination.duration} />
            <InfoBlock icon={MapPin} label="Pour qui" value={destination.bestFor} small />
          </div>

          <h4 className="font-display text-xl text-brass-300 mb-3 tracking-wide">
            Points forts du voyage
          </h4>
          <ul className="space-y-2 mb-7">
            {destination.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 font-serif text-parchment-200/85">
                <span className="text-brass-400 mt-1">✦</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#reservation" onClick={onClose} className="btn-brass flex-1 justify-center">
              Réserver ce voyage
            </a>
            <button onClick={onClose} className="btn-ghost flex-1 justify-center">
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InfoBlock({ icon: Icon, label, value, small }) {
  return (
    <div className="p-4 border border-brass-500/25 rounded-sm bg-ink-900/40">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} className="text-brass-400" />
        <span className="font-mono text-[10px] tracking-widest text-brass-400 uppercase">{label}</span>
      </div>
      <p className={`font-display ${small ? 'text-sm' : 'text-lg'} text-parchment-100`}>{value}</p>
    </div>
  );
}
