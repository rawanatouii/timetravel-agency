import { motion } from 'framer-motion';
import { Compass, Settings, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1800&q=80&auto=format')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/60 to-ink-900" />
      <div className="vignette" />

      {/* Decorative gears */}
      <Settings
        className="absolute top-32 right-8 md:right-24 w-32 h-32 text-brass-500/15 animate-gear-slow gear-icon"
        strokeWidth={1}
      />
      <Settings
        className="absolute bottom-24 left-8 md:left-24 w-24 h-24 text-brass-500/15 animate-gear-reverse gear-icon"
        strokeWidth={1}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2 mb-8 border border-brass-400/40 rounded-full bg-ink-800/40 backdrop-blur-sm"
        >
          <Compass className="w-4 h-4 text-brass-300 animate-flicker" />
          <span className="font-mono text-xs tracking-[0.3em] text-brass-200 uppercase">
            Agence de voyage temporel · Depuis 1889
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
        >
          <span className="block text-parchment-100">Explorez</span>
          <span className="block gold-text italic font-serif text-6xl md:text-8xl lg:text-9xl">l'Histoire,</span>
          <span className="block text-parchment-100">réinventée</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="ornate-divider mx-auto w-64 my-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-serif text-xl md:text-2xl text-parchment-200/90 italic max-w-2xl mx-auto mb-10"
        >
          Embarquez à bord de nos machines temporelles vers
          trois époques d'exception. Le passé n'aura jamais
          été aussi proche.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#destinations" className="btn-brass">
            Découvrir les destinations
          </a>
          <a href="#quiz" className="btn-ghost">
            Trouver mon époque idéale
          </a>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-brass-300/70 hover:text-brass-300 transition-colors"
          aria-label="Faire défiler"
        >
          <span className="font-mono text-xs tracking-widest mb-2">SCROLL</span>
          <ChevronDown className="animate-bounce" size={20} />
        </motion.a>
      </div>
    </section>
  );
}
