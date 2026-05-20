import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Clock } from 'lucide-react';

const links = [
  { href: '#about', label: 'L\'Agence' },
  { href: '#destinations', label: 'Destinations' },
  { href: '#quiz', label: 'Quiz' },
  { href: '#reservation', label: 'Réservation' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-900/90 backdrop-blur-md border-b border-brass-500/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <Clock className="w-8 h-8 text-brass-400 group-hover:rotate-180 transition-transform duration-700" strokeWidth={1.5} />
          <div className="leading-tight">
            <span className="block font-display tracking-[0.2em] text-brass-300 text-sm uppercase">TimeTravel</span>
            <span className="block font-serif italic text-parchment-200/80 text-xs">Agency · Est. 1889</span>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display uppercase tracking-widest text-sm text-parchment-200 hover:text-brass-300 transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brass-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#reservation" className="hidden md:inline-flex btn-brass !py-2 !px-5 !text-xs">
          Réserver
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-brass-300 p-2"
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden px-6 py-4 bg-ink-900/95 border-t border-brass-500/20 space-y-3"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-display uppercase tracking-widest text-sm text-parchment-200 py-2"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#reservation"
              onClick={() => setOpen(false)}
              className="btn-brass w-full justify-center !py-2 !text-xs"
            >
              Réserver
            </a>
          </li>
        </motion.ul>
      )}
    </motion.header>
  );
}
