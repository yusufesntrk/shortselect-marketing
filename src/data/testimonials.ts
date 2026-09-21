// Kundenstimmen fuer Startseite (TestimonialsSwiper) und Methode-Seiten (PhaseTestimonial).
//
// Kennzahl-Regel (Yusuf, 21.09.2026): Jede Karte traegt eines von zwei Ergebnissen,
// entweder neue Profile per AI Sourcing, die LinkedIn so nie angezeigt hat, oder
// Time-to-Hire reduziert. Eine Zahl steht nur dort, wo sie bereits veroeffentlicht
// ist (offenboost.de, ATS-bezogen). Keine geschaetzten Prozentwerte erfinden,
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
  /** Oeffentliches LinkedIn-Profil, per Profiltext gegen die Firma verifiziert (21.09.2026). */
  linkedin?: string;
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
    linkedin: "https://www.linkedin.com/in/dr-thomas-wendel-652b871",
    metric: {
      label: "Time-to-Hire",
      value: 40,
      prefix: "-",
      suffix: "%",
      description: "schneller besetzt",
      direction: "down",
    },
    results: [
      "Time-to-Hire seit ShortSelect reduziert",
      "Automatisiertes Kandidaten-Matching und strukturierte Pipelines",
    ],
  },
  {
    name: "Carolin Bark",
    company: "Bark recruiting+",
    role: "Geschäftsführerin",
    quote: "ShortSelect hat uns neue Profile speziell in der Messtechnik gefunden, die wir vorher nicht kannten. Genau die Kandidaten, die uns die LinkedIn-Suche so nie angezeigt hat.",
    image: "/testimonials/carolin-bark.webp",
    linkedin: "https://www.linkedin.com/in/carolin-bark",
    metric: {
      label: "AI Sourcing",
      value: "Neue Profile",
      description: "die LinkedIn so nie angezeigt hat",
      direction: "up",
    },
    results: [
      "Neue Profile speziell in der Messtechnik, die sie vorher nicht kannte",
      "Neue Profile per AI Sourcing, die die LinkedIn-Suche nie angezeigt hat",
    ],
  },
  {
    name: "Ekrem Topcan",
    company: "Hohenfeld Search",
    role: "Geschäftsführer",
    quote: "Das ATS von ShortSelect hat unser Fulfillment massiv entlastet. Endlich können wir skalieren, ohne im operativen Chaos zu versinken. Automatisierte Workflows und Pipelines, die einfach funktionieren.",
    image: "/testimonials/ekrem-topcan.webp",
    linkedin: "https://www.linkedin.com/in/ekremtopcan",
    metric: {
      label: "AI Sourcing",
      value: "Neue Profile",
      description: "die LinkedIn so nie angezeigt hat",
      direction: "up",
    },
    results: [
      "Neue Profile per AI Sourcing, die die LinkedIn-Suche nie angezeigt hat",
      "80 % weniger Fulfillment-Aufwand durch ATS-Automatisierung",
    ],
  },
  {
    name: "Sinan Tarti",
    company: "PolyTALENT GmbH",
    role: "Manager Digital Process Automation",
    quote: "Mit ShortSelect haben wir endlich alles an einem Ort. Wir brauchen keine zusätzlichen Tools mehr und steuern unseren gesamten Recruiting-Prozess zentral in einem System.",
    image: "/testimonials/sinan-tarti.jpg",
    linkedin: "https://www.linkedin.com/in/sinan-tarti-4b0872188",
    metric: {
      label: "Time-to-Hire",
      value: "Reduziert",
      description: "seit ShortSelect",
      direction: "down",
    },
    results: [
      "Time-to-Hire seit ShortSelect reduziert",
      "Tool-Stack um 70 % konsolidiert, alles in einem System",
    ],
  },
  {
    name: "Yasar Sentürk",
    company: "searched GmbH",
    role: "Geschäftsführer",
    quote: "Mit ShortSelect behalten wir den Überblick über alle Kandidaten auf einen Blick. Das AI-Matching spart uns täglich Stunden an manueller Arbeit.",
    image: "/testimonials/yasar-sentuerk.webp",
    linkedin: "https://www.linkedin.com/in/yasar-sentuerk",
    metric: {
      label: "AI Sourcing",
      value: "Neue Profile",
      description: "die LinkedIn so nie angezeigt hat",
      direction: "up",
    },
    results: [
      "Neue Profile per AI Sourcing, die die LinkedIn-Suche nie angezeigt hat",
      "AI-Matching übernimmt die manuelle Vorauswahl",
    ],
  },
  {
    name: "Rüdiger Bruns",
    company: "AMONOVA GmbH",
    role: "Geschäftsführer",
    quote: "Unsere Kunden sehen den Status ihrer Positionen jederzeit selbst im Client Portal. Das erspart uns die ständigen Status-Mails und schafft Vertrauen.",
    image: "/testimonials/ruediger-bruns.webp",
    linkedin: "https://www.linkedin.com/in/ruedigerbruns",
    metric: {
      label: "Time-to-Hire",
      value: "Reduziert",
      description: "seit ShortSelect",
      direction: "down",
    },
    results: [
      "Time-to-Hire seit ShortSelect reduziert",
      "Kunden sehen den Stand ihrer Positionen selbst im Portal",
    ],
  },
  {
    name: "Bahadir Battal",
    company: "VeraPartners Leadership",
    role: "Gründer & Recruiting Experte",
    quote: "ShortSelect hat unsere gesamte Recruiting-Pipeline transparent gemacht. Kein Kandidat geht mehr verloren, und unsere Abschlussrate ist deutlich gestiegen.",
    image: "/testimonials/bahadir-battal.webp",
    linkedin: "https://www.linkedin.com/in/bahadirbattal",
    metric: {
      label: "AI Sourcing",
      value: "Neue Profile",
      description: "die LinkedIn so nie angezeigt hat",
      direction: "up",
    },
    results: [
      "Neue Profile per AI Sourcing, die die LinkedIn-Suche nie angezeigt hat",
      "Kein Kandidat geht mehr in der Pipeline verloren",
    ],
  },
  {
    name: "Alireza Nikjou",
    company: "Experiton UG",
    role: "Geschäftsführer",
    quote: "Seit wir ShortSelect nutzen, läuft unser Bewerbungsprozess weitgehend im Hintergrund. Screening und automatisierte Workflows nehmen uns die Handarbeit ab, an der wir vorher hängen geblieben sind.",
    image: "/testimonials/alireza-nikjou.webp",
    linkedin: "https://www.linkedin.com/in/alireza-nikjou-83239312b",
    metric: {
      label: "Time-to-Hire",
      value: "Reduziert",
      description: "seit ShortSelect",
      direction: "down",
    },
    results: [
      "Time-to-Hire seit ShortSelect reduziert",
      "Screening und Workflows laufen im Hintergrund",
    ],
  },
  {
    name: "Nordin Begdouri",
    company: "SalesWorx",
    role: "Geschäftsführer",
    quote: "Recruiting mit ShortSelect fühlt sich an wie Cheaten. Das ATS denkt mit, priorisiert automatisch und hält unser Team immer auf dem neuesten Stand.",
    image: "/testimonials/nordin-begdouri.webp",
    linkedin: "https://www.linkedin.com/in/nordinbegdouri",
    metric: {
      label: "AI Sourcing",
      value: "Neue Profile",
      description: "die LinkedIn so nie angezeigt hat",
      direction: "up",
    },
    results: [
      "Neue Profile per AI Sourcing, die die LinkedIn-Suche nie angezeigt hat",
      "Das ATS priorisiert automatisch und hält das Team auf dem Stand",
    ],
  },
  {
    name: "Hasim Pacal",
    company: "Kerkhoff Experts GmbH",
    role: "Geschäftsführer",
    quote: "Mit ShortSelect laufen unsere Pipelines sauber durch. Dadurch platzieren wir spürbar mehr Interim Manager im Einkauf und Supply Chain, weil nichts mehr liegen bleibt.",
    image: "/testimonials/hasim-pacal.webp",
    linkedin: "https://www.linkedin.com/in/hasimpacal-personalvermittlung",
    metric: {
      label: "Time-to-Hire",
      value: "Reduziert",
      description: "seit ShortSelect",
      direction: "down",
    },
    results: [
      "Time-to-Hire seit ShortSelect reduziert",
      "Mehr Interim Manager im Einkauf und Supply Chain platziert",
    ],
  },
];
