export interface GlossaryTerm {
  slug: string;
  title: string;
  description: string;
}

export interface GlossaryEntry {
  title: string;
  shortDef: string;
  definition: string;
  importance: string;
  bestPractices: string[];
  howShortSelectHelps: string;
  relatedSlugs: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  { slug: "ats", title: "ATS (Applicant Tracking System)", description: "Was ist ein ATS und warum brauchen Sie eines?" },
  { slug: "time-to-hire", title: "Time-to-Hire", description: "Die wichtigste Recruiting-Kennzahl verstehen und optimieren." },
  { slug: "candidate-experience", title: "Candidate Experience", description: "Wie Kandidaten Ihren Bewerbungsprozess erleben." },
  { slug: "active-sourcing", title: "Active Sourcing", description: "Proaktiv Talente finden statt auf Bewerbungen warten." },
  { slug: "talent-pipeline", title: "Talent Pipeline", description: "Einen kontinuierlichen Strom qualifizierter Kandidaten aufbauen." },
  { slug: "multiposting", title: "Multiposting", description: "Stellenanzeigen gleichzeitig auf mehreren Plattformen veroeffentlichen." },
  { slug: "employer-branding", title: "Employer Branding", description: "Ihre Arbeitgebermarke aufbauen und staerken." },
  { slug: "recruiting-funnel", title: "Recruiting Funnel", description: "Den Weg vom Interessenten zum Mitarbeiter verstehen." },
  { slug: "cost-per-hire", title: "Cost-per-Hire", description: "Was kostet eine Einstellung wirklich?" },
  { slug: "quality-of-hire", title: "Quality of Hire", description: "Die Qualitaet Ihrer Einstellungen messen." },
];

export const allTermTitles: Record<string, string> = {
  ats: "ATS (Applicant Tracking System)",
  "time-to-hire": "Time-to-Hire",
  "candidate-experience": "Candidate Experience",
  "active-sourcing": "Active Sourcing",
  "talent-pipeline": "Talent Pipeline",
  multiposting: "Multiposting",
  "employer-branding": "Employer Branding",
  "recruiting-funnel": "Recruiting Funnel",
  "cost-per-hire": "Cost-per-Hire",
  "quality-of-hire": "Quality of Hire",
};

export const glossaryData: Record<string, GlossaryEntry> = {
  ats: {
    title: "ATS (Applicant Tracking System)",
    shortDef: "Ein Applicant Tracking System (ATS) ist eine Software zur Verwaltung des gesamten Bewerbungsprozesses -- von der Stellenausschreibung bis zur Einstellung.",
    definition: "Ein ATS digitalisiert und automatisiert den Recruiting-Prozess von der Stellenausschreibung bis zur Einstellung. Es dient als zentrale Plattform, in der alle Bewerbungen eingehen, bewertet und verwaltet werden. Moderne ATS-Systeme bieten weit mehr als einfache Datenbanken: Sie integrieren KI-gestuetztes Matching, automatisierte Kommunikation, Karriereseiten-Builder und detaillierte Analytics. Fuer Personalvermittler und HR-Teams ist ein ATS das Herzstueck ihres taeglichen Workflows -- es ersetzt Excel-Tabellen, E-Mail-Ordner und manuelle Prozesse durch eine einzige, intuitive Oberflaeche.",
    importance: "Ohne ATS verlieren Recruiter durchschnittlich 14 Stunden pro Woche mit administrativen Aufgaben wie dem Sichten von E-Mails, dem Aktualisieren von Tabellen und dem manuellen Versenden von Status-Updates. In einem Markt, in dem die besten Kandidaten innerhalb von 10 Tagen vom Markt sind, kann diese Ineffizienz den Unterschied zwischen einer erfolgreichen Einstellung und einer verlorenen Top-Besetzung ausmachen.",
    bestPractices: [
      "Waehlen Sie ein ATS mit KI-gestuetztem Matching, das Kandidaten automatisch den passenden Stellen zuordnet",
      "Achten Sie auf eine intuitive Kanban-Oberflaeche, die Ihren Recruiting-Prozess visuell abbildet",
      "Pruefen Sie Multi-Tenancy fuer Agentur-Nutzung -- so verwalten Sie mehrere Kunden in einem System",
      "Stellen Sie DSGVO-Konformitaet sicher, inklusive automatischer Loeschfristen und Einwilligungsmanagement",
    ],
    howShortSelectHelps: "ShortSelect ist ein modernes ATS, das speziell fuer Personalvermittler und HR-Teams entwickelt wurde. Mit KI-gestuetztem Kandidaten-Matching, einer flexiblen Kanban-Pipeline, Multi-Tenancy fuer Agenturen und einer integrierten Karriereseite vereint ShortSelect alles, was Sie fuer erfolgreiches Recruiting brauchen.",
    relatedSlugs: ["time-to-hire", "recruiting-funnel", "candidate-experience"],
  },
  "time-to-hire": {
    title: "Time-to-Hire",
    shortDef: "Time-to-Hire misst die Zeitspanne vom ersten Kontakt mit einem Kandidaten bis zur Vertragsunterschrift.",
    definition: "Time-to-Hire ist eine der wichtigsten KPIs im Recruiting. Sie misst, wie schnell ein Unternehmen qualifizierte Kandidaten einstellen kann -- vom Moment der ersten Bewerbung oder Ansprache bis zum unterschriebenen Vertrag. Eine kurze Time-to-Hire signalisiert einen effizienten Recruiting-Prozess und eine starke Arbeitgebermarke.",
    importance: "Jeder Tag, den eine Stelle unbesetzt bleibt, kostet das Unternehmen Produktivitaet und Umsatz. Studien zeigen, dass die besten Kandidaten innerhalb von 10 Tagen vom Markt verschwinden. Eine lange Time-to-Hire fuehrt nicht nur zu verlorenen Talenten, sondern auch zu frustrierten Hiring Managern und steigenden Kosten.",
    bestPractices: [
      "Automatisieren Sie Screening und Vorauswahl durch KI-gestuetzte Filterung und Knockout-Fragen",
      "Nutzen Sie Interview-Scheduling-Tools mit Self-Service-Buchung fuer Kandidaten",
      "Bauen Sie Talent Pools fuer wiederkehrende Rollen auf, um den Sourcing-Prozess zu verkuerzen",
      "Messen und optimieren Sie jeden einzelnen Pipeline-Schritt mit detaillierten Analytics",
    ],
    howShortSelectHelps: "Mit ShortSelect reduzieren Teams ihre Time-to-Hire um durchschnittlich 50% durch KI-gestuetztes Screening, automatisiertes Interview-Scheduling und eine visuelle Kanban-Pipeline, die Engpaesse sofort sichtbar macht.",
    relatedSlugs: ["ats", "cost-per-hire", "recruiting-funnel"],
  },
  "candidate-experience": {
    title: "Candidate Experience",
    shortDef: "Candidate Experience beschreibt die Gesamtheit aller Erfahrungen, die ein Bewerber waehrend des Recruiting-Prozesses macht.",
    definition: "Eine positive Candidate Experience beginnt bei der Stellenanzeige und endet erst nach dem Onboarding. Sie umfasst jeden Beruehrungspunkt zwischen Kandidat und Unternehmen: die Karriereseite, den Bewerbungsprozess, die Kommunikation waehrend der Auswahl, das Interview-Erlebnis und das Feedback nach der Entscheidung.",
    importance: "72% der Kandidaten mit negativer Erfahrung teilen diese online -- auf Bewertungsportalen, in sozialen Medien oder im persoenlichen Umfeld. Umgekehrt empfehlen 80% der Kandidaten mit positiver Erfahrung das Unternehmen weiter -- selbst wenn sie selbst nicht eingestellt wurden.",
    bestPractices: [
      "Kommunizieren Sie transparent und zeitnah -- informieren Sie Kandidaten innerhalb von 48 Stunden ueber den Status",
      "Bieten Sie eine mobile-optimierte Karriereseite mit maximal 3 Klicks bis zur Bewerbung",
      "Automatisieren Sie Status-Updates per E-Mail, damit kein Kandidat im Dunkeln bleibt",
      "Vereinfachen Sie den Bewerbungsprozess -- weniger Pflichtfelder, kein Registrierungszwang",
    ],
    howShortSelectHelps: "ShortSelect bietet automatische E-Mail-Benachrichtigungen bei jedem Pipeline-Schritt, eine gebrandete Karriereseite mit One-Click-Bewerbung und Self-Service Interview-Scheduling.",
    relatedSlugs: ["employer-branding", "ats", "talent-pipeline"],
  },
  "active-sourcing": {
    title: "Active Sourcing",
    shortDef: "Active Sourcing beschreibt die proaktive Suche und Ansprache von potenziellen Kandidaten durch Recruiter.",
    definition: "Statt auf eingehende Bewerbungen zu warten, gehen Recruiter beim Active Sourcing aktiv auf passende Kandidaten zu -- ueber LinkedIn, XING, Fachportale, Konferenzen oder persoenliche Netzwerke. Diese Methode ist besonders effektiv fuer schwer zu besetzende Positionen.",
    importance: "70% der Arbeitskraefte weltweit sind passive Kandidaten -- sie suchen nicht aktiv nach einem Job, waeren aber offen fuer das richtige Angebot. Ohne Active Sourcing erreichen Sie nur einen Bruchteil des verfuegbaren Talentmarkts.",
    bestPractices: [
      "Nutzen Sie LinkedIn, XING und Fachportale systematisch mit Boolean-Suchen",
      "Personalisieren Sie Ihre Ansprache -- Massenmail funktioniert nicht bei passiven Kandidaten",
      "Pflegen Sie Talent Pools fuer zukuenftige Positionen",
      "Tracken Sie Ihre Sourcing-Kanaele und deren Conversion Rate",
    ],
    howShortSelectHelps: "ShortSelect integriert Sourcing-Plattformen und ermoeglicht systematisches Talent Pool Management fuer langfristiges Sourcing.",
    relatedSlugs: ["talent-pipeline", "candidate-experience", "employer-branding"],
  },
  "talent-pipeline": {
    title: "Talent Pipeline",
    shortDef: "Eine Talent Pipeline ist ein Pool vorqualifizierter Kandidaten, die fuer zukuenftige Stellen in Frage kommen.",
    definition: "Eine Talent Pipeline ist das Ergebnis systematischen Recruitings. Sie besteht aus Kandidaten, die bereits Interesse an Ihrem Unternehmen gezeigt haben, im Auswahlprozess waren oder durch Active Sourcing identifiziert wurden.",
    importance: "Unternehmen mit starker Talent Pipeline besetzen Stellen 2x schneller als der Durchschnitt und sparen dabei erheblich bei den Recruiting-Kosten.",
    bestPractices: [
      "Erstellen Sie Talent Pools nach Skills, Rollen und Erfahrungsstufen",
      "Halten Sie regelmaessigen Kontakt zu Pipeline-Kandidaten durch relevante Inhalte",
      "Nutzen Sie Automatisierung fuer Nurturing-Kampagnen",
      "Messen Sie Pipeline-Gesundheit mit KPIs wie Pool-Groesse und Engagement-Rate",
    ],
    howShortSelectHelps: "ShortSelect bietet dedizierte Talent Pools mit Tags, Bewertungen und automatisierten Nurturing-E-Mails.",
    relatedSlugs: ["active-sourcing", "time-to-hire", "ats"],
  },
  multiposting: {
    title: "Multiposting",
    shortDef: "Multiposting bezeichnet die gleichzeitige Veroeffentlichung einer Stellenanzeige auf mehreren Jobportalen und Plattformen.",
    definition: "Multiposting ermoeglicht es Recruitern, eine Stellenanzeige einmalig zu erstellen und mit einem Klick auf mehreren Jobportalen gleichzeitig zu veroeffentlichen.",
    importance: "Recruiter, die Stellen manuell auf einzelnen Jobportalen veroeffentlichen, verbringen durchschnittlich 45 Minuten pro Portal -- bei 5 Portalen sind das fast 4 Stunden pro Stelle.",
    bestPractices: [
      "Waehlen Sie ein ATS mit integriertem Multiposting statt separater Tools",
      "Tracken Sie die Performance jedes Kanals",
      "Nutzen Sie branchenspezifische Nischenportale zusaetzlich zu den grossen Plattformen",
      "Aktualisieren Sie Anzeigen zentral",
    ],
    howShortSelectHelps: "ShortSelect bietet integriertes Multi-Channel-Publishing ueber die Career Site und das Job Widget.",
    relatedSlugs: ["ats", "cost-per-hire", "employer-branding"],
  },
  "employer-branding": {
    title: "Employer Branding",
    shortDef: "Employer Branding umfasst alle Massnahmen, mit denen ein Unternehmen seine Arbeitgebermarke aufbaut und staerkt.",
    definition: "Employer Branding ist die strategische Positionierung eines Unternehmens als attraktiver Arbeitgeber. Eine starke Employer Brand entsteht durch das Zusammenspiel von Unternehmenskultur, Karrieremoeglichkeiten, Verguetung und Work-Life-Balance.",
    importance: "75% der Jobsuchenden pruefen die Arbeitgebermarke, bevor sie sich bewerben. Unternehmen mit starkem Employer Branding erhalten 50% mehr qualifizierte Bewerbungen.",
    bestPractices: [
      "Gestalten Sie eine professionelle, mobile-optimierte Karriereseite mit Ihrem Branding",
      "Kommunizieren Sie transparent und zeitnah mit allen Bewerbern",
      "Nutzen Sie authentische Mitarbeiter-Testimonials",
      "Messen Sie die Candidate Experience mit Feedback-Umfragen",
    ],
    howShortSelectHelps: "ShortSelect staerkt Ihr Employer Branding durch eine vollstaendig anpassbare Karriereseite mit eigenem Logo, Farben und Texten.",
    relatedSlugs: ["candidate-experience", "active-sourcing", "multiposting"],
  },
  "recruiting-funnel": {
    title: "Recruiting Funnel",
    shortDef: "Der Recruiting Funnel beschreibt die verschiedenen Phasen des Einstellungsprozesses.",
    definition: "Der Recruiting Funnel ist ein Modell, das den Bewerbungsprozess in aufeinanderfolgende Phasen unterteilt. Die typischen Phasen sind: Aufmerksamkeit, Interesse, Screening, Interview, Angebot und Einstellung.",
    importance: "Unternehmen, die ihren Funnel aktiv messen, reduzieren ihre Time-to-Hire um 30%.",
    bestPractices: [
      "Definieren Sie klare Pipeline-Stufen",
      "Messen Sie die Konversionsrate zwischen jeder Stufe",
      "Identifizieren Sie Engpaesse",
      "Automatisieren Sie repetitive Schritte",
    ],
    howShortSelectHelps: "ShortSelect bildet Ihren Recruiting Funnel als visuelle Kanban-Pipeline ab mit integrierten Analytics.",
    relatedSlugs: ["ats", "time-to-hire", "quality-of-hire"],
  },
  "cost-per-hire": {
    title: "Cost-per-Hire",
    shortDef: "Cost-per-Hire misst die gesamten Kosten, die fuer die Besetzung einer Stelle anfallen.",
    definition: "Cost-per-Hire ist eine der zentralen Finanzkennzahlen im Recruiting. Die Formel: CPH = (Interne Kosten + Externe Kosten) / Anzahl Einstellungen. Der Branchendurchschnitt liegt in Deutschland bei 3.000-7.000 EUR pro Einstellung.",
    importance: "Ohne Kenntnis der Cost-per-Hire ist es unmoeglich, das Recruiting-Budget sinnvoll zu planen oder den ROI verschiedener Sourcing-Kanaele zu vergleichen.",
    bestPractices: [
      "Erfassen Sie alle Kosten -- auch versteckte wie die Arbeitszeit der Hiring Manager",
      "Vergleichen Sie die CPH verschiedener Sourcing-Kanaele",
      "Benchmarken Sie gegen Ihre Branche",
      "Automatisieren Sie administrative Aufgaben",
    ],
    howShortSelectHelps: "ShortSelect senkt Ihre Cost-per-Hire durch Automatisierung zeitraubender Aufgaben und integrierte Karriereseiten.",
    relatedSlugs: ["time-to-hire", "recruiting-funnel", "quality-of-hire"],
  },
  "quality-of-hire": {
    title: "Quality of Hire",
    shortDef: "Quality of Hire bewertet die Qualitaet einer Einstellung anhand von Leistung, Retention und kulturellem Fit.",
    definition: "Quality of Hire (QoH) bewertet, wie gut ein neu eingestellter Mitarbeiter performt und wie lange er im Unternehmen bleibt. Typische Indikatoren sind Leistungsbewertung, Verbleibquote, Ramp-Up-Zeit und Hiring-Manager-Zufriedenheit.",
    importance: "Unternehmen, die QoH aktiv messen, treffen nachweislich bessere Einstellungsentscheidungen und haben eine 25% hoehere Mitarbeiterbindung.",
    bestPractices: [
      "Definieren Sie klare Erfolgskriterien VOR der Einstellung",
      "Sammeln Sie Hiring-Manager-Feedback nach 30, 90 und 180 Tagen",
      "Korrelieren Sie QoH mit Sourcing-Kanaelen",
      "Nutzen Sie strukturierte Interviews und Screening-Fragen",
    ],
    howShortSelectHelps: "ShortSelect unterstuetzt Quality of Hire durch strukturierte Screening-Fragen, KI-gestuetztes Matching und das integrierte Feedback-System.",
    relatedSlugs: ["cost-per-hire", "candidate-experience", "recruiting-funnel"],
  },
};
