import { Clock, Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-brass-500/20 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-4 gap-8 mb-10"
        >
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-7 h-7 text-brass-400" strokeWidth={1.5} />
              <div>
                <span className="block font-display tracking-[0.2em] text-brass-300 text-base">TIMETRAVEL</span>
                <span className="block font-serif italic text-parchment-200/70 text-xs">Agency · Est. 1889</span>
              </div>
            </div>
            <p className="font-serif text-parchment-200/70 max-w-md leading-relaxed">
              Le passé, présent éternel. TimeTravel Agency vous transporte aux moments
              charnières de l'humanité, dans un confort résolument moderne.
            </p>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-xs text-brass-400 mb-4">Navigation</h4>
            <ul className="space-y-2 font-serif text-parchment-200/75">
              <li><a href="#about" className="hover:text-brass-300 transition">L'Agence</a></li>
              <li><a href="#destinations" className="hover:text-brass-300 transition">Destinations</a></li>
              <li><a href="#quiz" className="hover:text-brass-300 transition">Quiz</a></li>
              <li><a href="#reservation" className="hover:text-brass-300 transition">Réservation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-xs text-brass-400 mb-4">Contact</h4>
            <ul className="space-y-2 font-serif text-parchment-200/75 text-sm">
              <li>contact@timetravel-agency.com</li>
              <li>+33 1 89 18 89 18</li>
              <li>1, rue de l'Exposition · Paris</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
              <SocialIcon icon={Github} />
            </div>
          </div>
        </motion.div>

        <div className="ornate-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="font-mono text-[11px] tracking-widest text-brass-500/70 uppercase">
            © 2026 TimeTravel Agency · Projet pédagogique M1/M2 Digital & IA
          </p>
          <p className="font-serif italic text-sm text-parchment-200/60">
            Réalisé par{' '}
            <span className="text-brass-300">Rawan ATWE</span>,{' '}
            <span className="text-brass-300">Douglas QUASHIE</span>,{' '}
            <span className="text-brass-300">Jonathan DAH</span>,{' '}
            <span className="text-brass-300">Anthony CAVAGNE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-brass-500/30 text-brass-300 hover:bg-brass-400/20 hover:border-brass-400 transition"
      aria-label="Réseau social"
    >
      <Icon size={16} />
    </a>
  );
}
