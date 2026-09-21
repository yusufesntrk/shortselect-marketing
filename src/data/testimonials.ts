// Kundenstimmen fuer Startseite (TestimonialsSwiper) und Methode-Seiten (PhaseTestimonial).
//
// Kennzahl-Regel: Eine Zahl steht nur dort, wo sie bereits veroeffentlicht ist
// (offenboost.de, ATS-bezogen). Alle anderen Karten tragen im Kennzahl-Feld
// die Aussage aus dem Zitat selbst. Keine geschaetzten Prozentwerte erfinden,
// siehe Audit vom 12.07.2026 (unbelegte Zahlen site-weit entfernt).

export type TestimonialMetric = {
  label: string;
  /** Zahl wird beim Einblenden hochgezaehlt, Text steht sofort. */
  value: number | string;
  prefix?: string;
  suffix?: string;
  description: string;
  direction: "up" | "down";
};

export type Testimonial = {
  name: string;
  company: string;
  role: string;
  quote: string;
  image?: string;
  metric: TestimonialMetric;
  results: string[];
};

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Thomas Wendel",
    company: "tw.con. GmbH",
    role: "Geschäftsführer",
    quote: "Die Vermittlungszeit hat sich seit ShortSelect drastisch reduziert. Automatisiertes Kandidaten-Matching und strukturierte Pipelines machen den Unterschied.",
    image: "/testimonials/thomas-wendel.webp",
    metric: {
      label: "Vermittlungszeit",
      value: 40,
      prefix: "-",
      suffix: "%",
      description: "schneller",
      direction: "down",
    },
    results: [
      "Ärzte- und Apothekervermittlung beschleunigt",
      "Automatisiertes Kandidaten-Matching und strukturierte Pipelines",
    ],
  },
  {
    name: "Ekrem Topcan",
    company: "Hohenfeld Search",
    role: "Geschäftsführer",
    quote: "Das ATS von ShortSelect hat unser Fulfillment massiv entlastet. Endlich können wir skalieren, ohne im operativen Chaos zu versinken. Automatisierte Workflows und Pipelines, die einfach funktionieren.",
    image: "/testimonials/ekrem-topcan.webp",
    metric: {
      label: "Fulfillment-Aufwand",
      value: 80,
      prefix: "-",
      suffix: "%",
      description: "reduziert",
      direction: "down",
    },
    results: [
      "Skalieren ohne operatives Chaos",
      "Automatisierte Workflows und Pipelines, die einfach funktionieren",
    ],
  },
  {
    name: "Sinan Tarti",
    company: "PolyTALENT GmbH",
    role: "Manager Digital Process Automation",
    quote: "Mit ShortSelect haben wir endlich alles an einem Ort. Wir brauchen keine zusätzlichen Tools mehr und steuern unseren gesamten Recruiting-Prozess zentral in einem System.",
    image: "/testimonials/sinan-tarti.jpg",
    metric: {
      label: "Tool-Stack",
      value: 70,
      prefix: "-",
      suffix: "%",
      description: "konsolidiert",
      direction: "down",
    },
    results: [
      "Gesamter Recruiting-Prozess in einem System gebündelt",
      "Keine zusätzlichen Tools, kein Daten-Silo mehr",
    ],
  },
  {
    name: "Yasar Sentürk",
    company: "searched GmbH",
    role: "Geschäftsführer",
    quote: "Mit ShortSelect behalten wir den Überblick über alle Kandidaten auf einen Blick. Das AI-Matching spart uns täglich Stunden an manueller Arbeit.",
    image: "/testimonials/yasar-sentuerk.webp",
    metric: {
      label: "Manuelle Vorauswahl",
      value: "Stunden",
      description: "täglich gespart",
      direction: "down",
    },
    results: [
      "Alle Kandidaten auf einen Blick",
      "AI-Matching übernimmt die manuelle Vorauswahl",
    ],
  },
  {
    name: "Rüdiger Bruns",
    company: "AMONOVA GmbH",
    role: "Geschäftsführer",
    quote: "Unsere Kunden sehen den Status ihrer Positionen jederzeit selbst im Client Portal. Das erspart uns die ständigen Status-Mails und schafft Vertrauen.",
    image: "/testimonials/ruediger-bruns.webp",
    metric: {
      label: "Status-Mails an Kunden",
      value: "Keine",
      description: "mehr nötig",
      direction: "down",
    },
    results: [
      "Kunden sehen den Stand ihrer Positionen selbst im Portal",
      "Mehr Vertrauen durch volle Transparenz",
    ],
  },
  {
    name: "Bahadir Battal",
    company: "VeraPartners Leadership",
    role: "Gründer & Recruiting Experte",
    quote: "ShortSelect hat unsere gesamte Recruiting-Pipeline transparent gemacht. Kein Kandidat geht mehr verloren, und unsere Abschlussrate ist deutlich gestiegen.",
    image: "/testimonials/bahadir-battal.webp",
    metric: {
      label: "Abschlussrate",
      value: "Deutlich",
      description: "gestiegen",
      direction: "up",
    },
    results: [
      "Gesamte Recruiting-Pipeline transparent",
      "Kein Kandidat geht mehr verloren",
    ],
  },
  {
    name: "Alireza Nikjou",
    company: "Experiton UG",
    role: "Geschäftsführer",
    quote: "Seit wir ShortSelect nutzen, läuft unser Bewerbungsprozess weitgehend im Hintergrund. Screening und automatisierte Workflows nehmen uns die Handarbeit ab, an der wir vorher hängen geblieben sind.",
    image: "/testimonials/alireza-nikjou.webp",
    metric: {
      label: "Bewerbungsprozess",
      value: "Im Hintergrund",
      description: "statt Handarbeit",
      direction: "up",
    },
    results: [
      "Screening und Workflows laufen im Hintergrund",
      "Handarbeit, an der das Team hängen blieb, entfällt",
    ],
  },
  {
    name: "Nordin Begdouri",
    company: "SalesWorx",
    role: "Geschäftsführer",
    quote: "Recruiting mit ShortSelect fühlt sich an wie Cheaten. Das ATS denkt mit, priorisiert automatisch und hält unser Team immer auf dem neuesten Stand.",
    image: "/testimonials/nordin-begdouri.webp",
    metric: {
      label: "Priorisierung",
      value: "Automatisch",
      description: "das ATS denkt mit",
      direction: "up",
    },
    results: [
      "Kandidaten werden automatisch priorisiert",
      "Das ganze Team ist immer auf dem neuesten Stand",
    ],
  },
  {
    name: "Hasim Pacal",
    company: "Kerkhoff Experts GmbH",
    role: "Geschäftsführer",
    quote: "Mit ShortSelect laufen unsere Pipelines sauber durch. Dadurch platzieren wir spürbar mehr Interim Manager im Einkauf und Supply Chain, weil nichts mehr liegen bleibt.",
    image: "/testimonials/hasim-pacal.webp",
    metric: {
      label: "Interim-Platzierungen",
      value: "Spürbar mehr",
      description: "im Einkauf und Supply Chain",
      direction: "up",
    },
    results: [
      "Pipelines laufen sauber durch, nichts bleibt liegen",
      "Mehr Interim Manager platziert",
    ],
  },
];
