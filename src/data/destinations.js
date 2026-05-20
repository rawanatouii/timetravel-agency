/**
 * Données des destinations temporelles de TimeTravel Agency.
 * Les images sont des placeholders Unsplash - à remplacer par les visuels
 * générés lors du premier projet TimeTravel Agency (Midjourney / Runway).
 */
export const destinations = [
  {
    id: 'paris-1889',
    slug: 'paris-1889',
    name: 'Paris 1889',
    era: 'Belle Époque',
    tagline: 'L\'aube de la modernité, sous l\'éclat des lumières',
    shortDescription:
      "Découvrez Paris au sommet de sa gloire pendant l'Exposition Universelle de 1889, sous l'ombre fraîchement érigée de la Tour Eiffel.",
    longDescription:
      "Plongez dans la Belle Époque parisienne. Promenez-vous sur les Champs-Élysées illuminés par le tout nouvel éclairage électrique, assistez à l'inauguration de la Tour Eiffel et goûtez aux cabarets de Montmartre où Toulouse-Lautrec immortalise les danseuses de cancan. Une époque où le progrès technologique rencontre le raffinement artistique.",
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=80&auto=format',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=60&auto=format',
    accentColor: '#d4a574',
    icon: '⚜',
    price: '12 800 €',
    duration: '7 jours / 6 nuits',
    highlights: [
      "Visite privée de l'Exposition Universelle",
      "Dîner au Train Bleu à la Gare de Lyon",
      "Soirée VIP au Moulin Rouge fraîchement ouvert",
      "Rencontre fictive avec Gustave Eiffel",
    ],
    tags: ['Architecture', 'Art', 'Élégance', 'Histoire moderne'],
    bestFor: 'Amateurs d\'art, d\'architecture et de raffinement',
  },
  {
    id: 'cretace',
    slug: 'cretace',
    name: 'Crétacé -65M',
    era: 'Mésozoïque',
    tagline: 'L\'aventure ultime, au temps des géants',
    shortDescription:
      'Aventurez-vous 65 millions d\'années en arrière, à l\'époque où la Terre appartenait aux dinosaures. Safari préhistorique sécurisé.',
    longDescription:
      "Embarquez pour le voyage le plus audacieux de TimeTravel Agency. Observez les troupeaux de triceratops dans les fougères géantes, écoutez le rugissement lointain d'un T-Rex, et survolez en aérostat protégé des ptérosaures planant au-dessus de mers tropicales. Climat chaud et humide, faune extraordinaire, et la planète encore vierge de toute trace humaine.",
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=1400&q=80&auto=format',
    thumbnail: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=60&auto=format',
    accentColor: '#7c9a5a',
    icon: '🦴',
    price: '24 500 €',
    duration: '5 jours / 4 nuits',
    highlights: [
      "Safari aérostat au-dessus des troupeaux de hadrosaures",
      "Observation nocturne sécurisée d'un nid de Tyrannosaurus",
      "Promenade dans une forêt de fougères arborescentes",
      "Camp éco-temporel avec bouclier dimensionnel",
    ],
    tags: ['Aventure', 'Nature', 'Faune', 'Temps anciens'],
    bestFor: 'Aventuriers, naturalistes, esprits curieux',
  },
  {
    id: 'florence-1504',
    slug: 'florence-1504',
    name: 'Florence 1504',
    era: 'Haute Renaissance',
    tagline: 'L\'apogée du génie humain, dans la cité des Médicis',
    shortDescription:
      'Vivez la Renaissance italienne au moment où Michel-Ange dévoile son David et où Léonard de Vinci peint la Joconde.',
    longDescription:
      "Florence, 1504. Les fontaines coulent sur la Piazza della Signoria, où l'imposant David de Michel-Ange vient d'être installé. Léonard de Vinci, Raphaël et Botticelli arpentent les mêmes ruelles. Atelier privé chez les maîtres, dîner avec les Médicis, et accès exclusif aux fresques du Duomo en cours de finition. Une plongée dans la fabrique même de la civilisation occidentale.",
    image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1400&q=80&auto=format',
    thumbnail: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=800&q=60&auto=format',
    accentColor: '#c19a5b',
    icon: '🎨',
    price: '18 200 €',
    duration: '6 jours / 5 nuits',
    highlights: [
      "Visite de l'atelier de Léonard de Vinci",
      "Inauguration privée du David de Michel-Ange",
      "Banquet chez Pier Soderini, gonfalonier de Florence",
      "Cours de peinture avec un élève de Botticelli",
    ],
    tags: ['Art', 'Culture', 'Renaissance', 'Architecture'],
    bestFor: 'Passionnés d\'art, d\'histoire et de culture',
  },
];

export const getDestinationById = (id) =>
  destinations.find((d) => d.id === id);
