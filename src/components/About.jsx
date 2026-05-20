import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Telescope } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Chrono-Sécurité™',
    description:
      "Bouclier dimensionnel breveté, protocole anti-paradoxe et extraction d'urgence en moins de 12 secondes. Zéro incident en 1 247 voyages.",
  },
  {
    icon: Telescope,
    title: 'Guides Experts',
    description:
      "Nos historiens et naturalistes vous accompagnent à chaque instant. Polyglottes, passionnés, et formés aux us et coutumes de chaque époque.",
  },
  {
    icon: Sparkles,
    title: 'Expérience Luxe',
    description:
      "Hébergements d'époque restaurés, gastronomie historique authentique, garde-robe sur mesure incluse. Le voyage le plus mémorable de votre vie.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-brass-400 uppercase">Notre Mission</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 mb-6">
            <span className="gold-text italic font-serif">L'Agence</span> qui défie le temps
          </h2>
          <div className="ornate-divider mx-auto w-48 mb-6" />
          <p className="max-w-3xl mx-auto text-lg text-parchment-200/85 font-serif leading-relaxed">
            Fondée en 1889 par un cercle de savants visionnaires lors de l'Exposition Universelle de Paris,
            <em className="text-brass-300"> TimeTravel Agency </em>
            est la seule maison agréée pour des voyages temporels à destination des âmes
            curieuses et raffinées. Nous transformons les rêves d'histoire en souvenirs vécus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-vintage p-8 hover:border-brass-400/60 transition-all duration-500 hover:-translate-y-1 group"
            >
              <div className="relative inline-flex p-4 rounded-full bg-gradient-to-br from-brass-500/20 to-brass-700/10 border border-brass-400/30 mb-5 group-hover:scale-110 transition-transform duration-500">
                <f.icon className="w-7 h-7 text-brass-300" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl text-parchment-100 mb-3 tracking-wide">{f.title}</h3>
              <p className="font-serif text-parchment-200/80 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
