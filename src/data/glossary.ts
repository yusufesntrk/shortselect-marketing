export interface GlossaryTerm {
  slug: string;
  title: string;
  description: string;
}

export interface GlossaryEntry {
  title: string;
  shortDef: string;
  heroSnippet?: string;
  definition: string;
  importance: string;
  bestPractices: string[];
  howShortSelectHelps: string;
  relatedSlugs: string[];
  sections?: Array<{ h2: string; body: string; h3s?: Array<{ h3: string; body: string }> }>;
  faqs?: Array<{ q: string; a: string }>;
  author?: { name: string; role?: string; url?: string };
}

export const glossaryTerms: GlossaryTerm[] = [
  { slug: "ats", title: "ATS (Applicant Tracking System)", description: "Was ist ein ATS und warum brauchen Sie eines?" },
  { slug: "time-to-hire", title: "Time-to-Hire", description: "Die wichtigste Recruiting-Kennzahl verstehen und optimieren." },
  { slug: "candidate-experience", title: "Candidate Experience", description: "Wie Kandidaten Ihren Bewerbungsprozess erleben." },
  { slug: "active-sourcing", title: "Active Sourcing", description: "Proaktiv Talente finden statt auf Bewerbungen warten." },
  { slug: "talent-pipeline", title: "Talent Pipeline", description: "Einen kontinuierlichen Strom qualifizierter Kandidaten aufbauen." },
  { slug: "multiposting", title: "Multiposting", description: "Stellenanzeigen gleichzeitig auf mehreren Plattformen veröffentlichen." },
  { slug: "employer-branding", title: "Employer Branding", description: "Ihre Arbeitgebermarke aufbauen und stärken." },
  { slug: "recruiting-funnel", title: "Recruiting Funnel", description: "Den Weg vom Interessenten zum Mitarbeiter verstehen." },
  { slug: "cost-per-hire", title: "Cost-per-Hire", description: "Was kostet eine Einstellung wirklich?" },
  { slug: "quality-of-hire", title: "Quality of Hire", description: "Die Qualität Ihrer Einstellungen messen." },
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
    definition: "Ein ATS digitalisiert und automatisiert den Recruiting-Prozess von der Stellenausschreibung bis zur Einstellung. Es dient als zentrale Plattform, in der alle Bewerbungen eingehen, bewertet und verwaltet werden. Moderne ATS-Systeme bieten weit mehr als einfache Datenbanken: Sie integrieren KI-gestütztes Matching, automatisierte Kommunikation, Karriereseiten-Builder und detaillierte Analytics. Für Personalvermittler und HR-Teams ist ein ATS das Herzstück ihres täglichen Workflows -- es ersetzt Excel-Tabellen, E-Mail-Ordner und manuelle Prozesse durch eine einzige, intuitive Oberfläche.",
    importance: "Ohne ATS verlieren Recruiter durchschnittlich 14 Stunden pro Woche mit administrativen Aufgaben wie dem Sichten von E-Mails, dem Aktualisieren von Tabellen und dem manuellen Versenden von Status-Updates. In einem Markt, in dem die besten Kandidaten innerhalb von 10 Tagen vom Markt sind, kann diese Ineffizienz den Unterschied zwischen einer erfolgreichen Einstellung und einer verlorenen Top-Besetzung ausmachen.",
    bestPractices: [
      "Wählen Sie ein ATS mit KI-gestütztem Matching, das Kandidaten automatisch den passenden Stellen zuordnet",
      "Achten Sie auf eine intuitive Kanban-Oberfläche, die Ihren Recruiting-Prozess visuell abbildet",
      "Prüfen Sie Multi-Tenancy für Agentur-Nutzung -- so verwalten Sie mehrere Kunden in einem System",
      "Stellen Sie DSGVO-Konformität sicher, inklusive automatischer Löschfristen und Einwilligungsmanagement",
    ],
    howShortSelectHelps: "ShortSelect ist ein modernes ATS, das speziell für Personalvermittler und HR-Teams entwickelt wurde. Mit KI-gestütztem Kandidaten-Matching, einer flexiblen Kanban-Pipeline, Multi-Tenancy für Agenturen und einer integrierten Karriereseite vereint ShortSelect alles, was Sie für erfolgreiches Recruiting brauchen.",
    relatedSlugs: ["time-to-hire", "recruiting-funnel", "candidate-experience"],
  },
  "time-to-hire": {
    title: "Time-to-Hire",
    shortDef: "Time-to-Hire misst die Zeitspanne vom ersten Kontakt mit einem Kandidaten bis zur Vertragsunterschrift.",
    definition: "Time-to-Hire ist eine der wichtigsten KPIs im Recruiting. Sie misst, wie schnell ein Unternehmen qualifizierte Kandidaten einstellen kann -- vom Moment der ersten Bewerbung oder Ansprache bis zum unterschriebenen Vertrag. Eine kurze Time-to-Hire signalisiert einen effizienten Recruiting-Prozess und eine starke Arbeitgebermarke.",
    importance: "Jeder Tag, den eine Stelle unbesetzt bleibt, kostet das Unternehmen Produktivität und Umsatz. Studien zeigen, dass die besten Kandidaten innerhalb von 10 Tagen vom Markt verschwinden. Eine lange Time-to-Hire führt nicht nur zu verlorenen Talenten, sondern auch zu frustrierten Hiring Managern und steigenden Kosten.",
    bestPractices: [
      "Automatisieren Sie Screening und Vorauswahl durch KI-gestützte Filterung und Knockout-Fragen",
      "Nutzen Sie Interview-Scheduling-Tools mit Self-Service-Buchung für Kandidaten",
      "Bauen Sie Talent Pools für wiederkehrende Rollen auf, um den Sourcing-Prozess zu verkürzen",
      "Messen und optimieren Sie jeden einzelnen Pipeline-Schritt mit detaillierten Analytics",
    ],
    howShortSelectHelps: "Mit ShortSelect reduzieren Teams ihre Time-to-Hire um durchschnittlich 50% durch KI-gestütztes Screening, automatisiertes Interview-Scheduling und eine visuelle Kanban-Pipeline, die Engpässe sofort sichtbar macht.",
    relatedSlugs: ["ats", "cost-per-hire", "recruiting-funnel"],
  },
  "candidate-experience": {
    title: "Candidate Experience",
    shortDef: "Candidate Experience beschreibt die Gesamtheit aller Erfahrungen, die ein Bewerber während des Recruiting-Prozesses macht.",
    definition: "Eine positive Candidate Experience beginnt bei der Stellenanzeige und endet erst nach dem Onboarding. Sie umfasst jeden Berührungspunkt zwischen Kandidat und Unternehmen: die Karriereseite, den Bewerbungsprozess, die Kommunikation während der Auswahl, das Interview-Erlebnis und das Feedback nach der Entscheidung.",
    importance: "72% der Kandidaten mit negativer Erfahrung teilen diese online -- auf Bewertungsportalen, in sozialen Medien oder im persönlichen Umfeld. Umgekehrt empfehlen 80% der Kandidaten mit positiver Erfahrung das Unternehmen weiter -- selbst wenn sie selbst nicht eingestellt wurden.",
    bestPractices: [
      "Kommunizieren Sie transparent und zeitnah -- informieren Sie Kandidaten innerhalb von 48 Stunden über den Status",
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
    definition: "Statt auf eingehende Bewerbungen zu warten, gehen Recruiter beim Active Sourcing aktiv auf passende Kandidaten zu -- über LinkedIn, XING, Fachportale, Konferenzen oder persönliche Netzwerke. Diese Methode ist besonders effektiv für schwer zu besetzende Positionen.",
    importance: "70% der Arbeitskräfte weltweit sind passive Kandidaten -- sie suchen nicht aktiv nach einem Job, wären aber offen für das richtige Angebot. Ohne Active Sourcing erreichen Sie nur einen Bruchteil des verfügbaren Talentmarkts.",
    bestPractices: [
      "Nutzen Sie LinkedIn, XING und Fachportale systematisch mit Boolean-Suchen",
      "Personalisieren Sie Ihre Ansprache -- Massenmail funktioniert nicht bei passiven Kandidaten",
      "Pflegen Sie Talent Pools für zukünftige Positionen",
      "Tracken Sie Ihre Sourcing-Kanäle und deren Conversion Rate",
    ],
    howShortSelectHelps: "ShortSelect integriert Sourcing-Plattformen und ermöglicht systematisches Talent Pool Management für langfristiges Sourcing.",
    relatedSlugs: ["talent-pipeline", "candidate-experience", "employer-branding"],
  },
  "talent-pipeline": {
    title: "Talent Pipeline",
    shortDef: "Eine Talent Pipeline ist ein Pool vorqualifizierter Kandidaten, die für zukünftige Stellen in Frage kommen.",
    definition: "Eine Talent Pipeline ist das Ergebnis systematischen Recruitings. Sie besteht aus Kandidaten, die bereits Interesse an Ihrem Unternehmen gezeigt haben, im Auswahlprozess waren oder durch Active Sourcing identifiziert wurden.",
    importance: "Unternehmen mit starker Talent Pipeline besetzen Stellen 2x schneller als der Durchschnitt und sparen dabei erheblich bei den Recruiting-Kosten.",
    bestPractices: [
      "Erstellen Sie Talent Pools nach Skills, Rollen und Erfahrungsstufen",
      "Halten Sie regelmäßigen Kontakt zu Pipeline-Kandidaten durch relevante Inhalte",
      "Nutzen Sie Automatisierung für Nurturing-Kampagnen",
      "Messen Sie Pipeline-Gesundheit mit KPIs wie Pool-Größe und Engagement-Rate",
    ],
    howShortSelectHelps: "ShortSelect bietet dedizierte Talent Pools mit Tags, Bewertungen und automatisierten Nurturing-E-Mails.",
    relatedSlugs: ["active-sourcing", "time-to-hire", "ats"],
  },
  multiposting: {
    title: "Multiposting",
    shortDef: "Multiposting bezeichnet die gleichzeitige Veröffentlichung einer Stellenanzeige auf mehreren Jobportalen und Plattformen.",
    definition: "Multiposting ermöglicht es Recruitern, eine Stellenanzeige einmalig zu erstellen und mit einem Klick auf mehreren Jobportalen gleichzeitig zu veröffentlichen.",
    importance: "Recruiter, die Stellen manuell auf einzelnen Jobportalen veröffentlichen, verbringen durchschnittlich 45 Minuten pro Portal -- bei 5 Portalen sind das fast 4 Stunden pro Stelle.",
    bestPractices: [
      "Wählen Sie ein ATS mit integriertem Multiposting statt separater Tools",
      "Tracken Sie die Performance jedes Kanals",
      "Nutzen Sie branchenspezifische Nischenportale zusätzlich zu den großen Plattformen",
      "Aktualisieren Sie Anzeigen zentral",
    ],
    howShortSelectHelps: "ShortSelect bietet integriertes Multi-Channel-Publishing über die Career Site und das Job Widget.",
    relatedSlugs: ["ats", "cost-per-hire", "employer-branding"],
  },
  "employer-branding": {
    title: "Employer Branding",
    shortDef: "Employer Branding umfasst alle Maßnahmen, mit denen ein Unternehmen seine Arbeitgebermarke aufbaut und stärkt.",
    definition: "Employer Branding ist die strategische Positionierung eines Unternehmens als attraktiver Arbeitgeber. Eine starke Employer Brand entsteht durch das Zusammenspiel von Unternehmenskultur, Karrieremöglichkeiten, Vergütung und Work-Life-Balance.",
    importance: "75% der Jobsuchenden prüfen die Arbeitgebermarke, bevor sie sich bewerben. Unternehmen mit starkem Employer Branding erhalten 50% mehr qualifizierte Bewerbungen.",
    bestPractices: [
      "Gestalten Sie eine professionelle, mobile-optimierte Karriereseite mit Ihrem Branding",
      "Kommunizieren Sie transparent und zeitnah mit allen Bewerbern",
      "Nutzen Sie authentische Mitarbeiter-Testimonials",
      "Messen Sie die Candidate Experience mit Feedback-Umfragen",
    ],
    howShortSelectHelps: "ShortSelect stärkt Ihr Employer Branding durch eine vollständig anpassbare Karriereseite mit eigenem Logo, Farben und Texten.",
    relatedSlugs: ["candidate-experience", "active-sourcing", "multiposting"],
  },
  "recruiting-funnel": {
    title: "Recruiting Funnel",
    shortDef: "Der Recruiting Funnel beschreibt die verschiedenen Phasen des Einstellungsprozesses vom ersten Kontakt bis zur Unterschrift.",
    heroSnippet: "Ein Recruiting Funnel ist ein sechsstufiges Modell, das den Bewerbungsprozess von der ersten Aufmerksamkeit bis zur Einstellung abbildet: Aufmerksamkeit, Interesse, Bewerbung, Screening, Interview und Angebot. Jede Stufe hat eine eigene Konversionsrate. Agenturen und HR-Teams, die den Funnel aktiv tracken, besetzen Stellen laut LinkedIn Talent Solutions rund 30 Prozent schneller.",
    definition: "Der Recruiting Funnel ist ein Modell, das den Bewerbungs- und Auswahlprozess in klar abgegrenzte, aufeinanderfolgende Phasen unterteilt. Die Bezeichnung stammt aus dem Marketing (Sales Funnel) und wurde auf den Personalbereich übertragen: Oben kommen viele potenzielle Kandidaten rein, pro Stufe fallen welche heraus, unten bleibt eine Einstellung. Dieses Trichter-Modell erlaubt es, Engpässe datenbasiert zu identifizieren und zu optimieren.",
    importance: "Unternehmen, die ihren Funnel aktiv messen, reduzieren ihre Time-to-Hire im Schnitt um 30 Prozent (LinkedIn Talent Solutions). Besonders für Recruiting-Agenturen und Headhunter ist der Funnel die Basis für Forecasting, Pricing und Ressourcenplanung: Wer weiß, dass er für ein Placement 1000 passive Kandidaten ansprechen muss, plant Kapazität und Retainer realistisch. Ohne Funnel-Tracking ist Recruiting Blindflug.",
    bestPractices: [
      "Definieren Sie pro Rolle und Branche eigene Funnel-Benchmarks statt einer pauschalen Conversion-Rate",
      "Messen Sie Conversion, Time-in-Stage und Drop-off-Grund pro Phase, nicht nur Time-to-Hire am Ende",
      "Identifizieren Sie Engpässe per Stage-Conversion: Wo verlieren Sie prozentual die meisten Kandidaten?",
      "Automatisieren Sie repetitive Schritte wie Screening-Fragen, Interview-Scheduling und Status-Updates",
      "Segmentieren Sie den Funnel nach Sourcing-Kanal, um Quality-per-Source und Cost-per-Source zu berechnen",
      "Halten Sie passive Kandidaten in einem Talent Pool, der den Top-of-Funnel bei kommenden Mandaten beschleunigt",
    ],
    howShortSelectHelps: "ShortSelect bildet Ihren Recruiting Funnel als visuelle Kanban-Pipeline ab, die pro Stage Conversion-Rate, Time-in-Stage und Drop-off-Grund live anzeigt. KI-gestütztes Screening filtert Low-Fit-Kandidaten automatisch raus, Interview-Scheduling und Status-Emails laufen im Hintergrund. Für Personalvermittler heißt das: mehr Placements pro Recruiter, realistische Forecasts und ein Funnel, der sich pro Kunde individuell konfigurieren lässt.",
    relatedSlugs: ["ats", "time-to-hire", "quality-of-hire", "cost-per-hire", "candidate-experience"],
    author: {
      name: "Yusuf Esentürk",
      role: "Founder ShortSelect",
      url: "https://www.linkedin.com/in/yusuf-esenturk/"
    },
    sections: [
      {
        h2: "Was ist ein Recruiting Funnel?",
        body: "<p>Ein Recruiting Funnel, im Englischen auch <strong>Hiring Funnel</strong> oder <strong>Recruitment Funnel</strong> genannt und im Deutschen gelegentlich als <strong>Bewerber Funnel</strong> oder Personalbeschaffungs-Trichter bezeichnet, ist ein mehrstufiges Modell des Einstellungsprozesses. Der Begriff stammt aus dem Marketing, wo Sales Funnels die Reise vom unbekannten Kontakt zum zahlenden Kunden beschreiben. Im Recruiting wird dieselbe Logik auf Kandidaten angewendet.</p><p>Warum Trichter und nicht Linie? Weil an jeder Stufe Kandidaten ausscheiden. Von 1.000 Personen, die eine Stellenanzeige sehen, bewerben sich vielleicht 50. Davon qualifizieren sich nach Screening 20. Nach dem ersten Interview bleiben 8 übrig, nach dem zweiten 3, und am Ende unterschreibt einer. Die Form entspricht einem auf den Kopf gestellten Trichter.</p><p>Der entscheidende Vorteil: Jede Stufe wird einzeln messbar. Statt nur zu fragen, wie lange eine Einstellung insgesamt gedauert hat, lässt sich analysieren, an welcher konkreten Stelle der Prozess langsam oder verlustreich war. Genau hier entsteht die operative Hebelwirkung für Recruiting-Agenturen und HR-Teams.</p><p>Das Konzept hat sich im DACH-Raum seit etwa 2018 durchgesetzt und ist heute Standard in jeder modernen Recruiting-Software. Wer noch ohne definierten Funnel arbeitet, trifft Prozess-Entscheidungen auf Bauchgefühl statt auf Daten.</p>"
      },
      {
        h2: "Die 6 Phasen im Detail",
        body: "<p>Ein Recruiting Funnel hat je nach Modell zwischen 4 und 8 Phasen. Die hier beschriebenen 6 Phasen decken den Standard ab, den Greenhouse, Lever und LinkedIn als Industrie-Baseline definieren. Sourcing und Onboarding sind optional als Vor- und Nachstufe ergänzbar.</p>",
        h3s: [
          { h3: "Phase 1: Aufmerksamkeit (Awareness, TOFU)", body: "<p>Der Top of Funnel beschreibt den Moment, in dem ein potenzieller Kandidat das erste Mal auf die Stelle oder den Arbeitgeber aufmerksam wird. Das passiert über Stellenanzeigen auf Jobbörsen, Social-Media-Posts, Employer-Branding-Kampagnen, Empfehlungen oder Active Sourcing. Die zentrale Metrik hier ist <strong>Reach</strong>: Wie viele qualifizierte Personen haben die Anzeige überhaupt gesehen? Typische Abbruchgründe in dieser Phase sind unklare Titel, fehlender Gehaltsrange und generische Anzeigen, die nicht überzeugen.</p>" },
          { h3: "Phase 2: Interesse (Consideration)", body: "<p>Die Person klickt auf die Anzeige, landet auf der Karriereseite oder einem Job-Widget und entscheidet, ob sie sich bewirbt. Hier messen Recruiter die <strong>Click-through-Rate</strong> und die <strong>Apply-Start-Rate</strong>. Wenn die Karriereseite langsam lädt, unübersichtlich ist oder kein Gehalt nennt, springen 60 bis 70 Prozent der Interessenten ab, bevor sie das Bewerbungsformular gesehen haben. Mobile-Optimierung ist in dieser Phase der größte Hebel.</p>" },
          { h3: "Phase 3: Bewerbung (Application)", body: "<p>Der Kandidat füllt das Bewerbungsformular aus und drückt auf Absenden. Die <strong>Apply-Completion-Rate</strong> hängt stark von der Formular-Länge ab. Laut Indeed Hiring Lab steigt die Abbruchrate ab 20 Pflichtfeldern auf über 60 Prozent. Moderne Funnel nutzen One-Click-Apply per LinkedIn-Profil oder CV-Upload mit automatischem Parsing, um diese Phase zu maximieren.</p>" },
          { h3: "Phase 4: Screening (Pre-Qualification)", body: "<p>Das Recruiting-Team sichtet die eingehenden Bewerbungen und qualifiziert vor. Hier entsteht die <strong>Screening-Pass-Rate</strong>. Moderne ATS wie ShortSelect nutzen KI-Matching, um Lebenslauf, Skills und Mindestanforderungen automatisch zu prüfen und Low-Fit-Bewerbungen früh auszufiltern. Manuelles CV-Lesen kostet laut LinkedIn durchschnittlich 6 Minuten pro Bewerbung, automatisiertes Screening reduziert das auf unter 30 Sekunden.</p>" },
          { h3: "Phase 5: Interview (Evaluation)", body: "<p>Die qualifizierten Kandidaten durchlaufen ein oder mehrere Interviews, oft mit strukturierten Leitfäden, Fallstudien oder Probearbeits-Aufgaben. Die <strong>Interview-to-Offer-Rate</strong> liegt branchenübergreifend bei 20 bis 30 Prozent. Lange Wartezeiten zwischen Interview-Runden sind ein klassischer Funnel-Killer: Jeder Tag ohne Rückmeldung erhöht die Drop-off-Wahrscheinlichkeit um rund 5 Prozent.</p>" },
          { h3: "Phase 6: Angebot und Einstellung (Offer, Hire)", body: "<p>Der Kandidat erhält ein Vertragsangebot. Die <strong>Offer-Acceptance-Rate</strong> liegt in einem gesunden Funnel bei 70 bis 85 Prozent. Ist sie deutlich niedriger, gibt es meist einen Mismatch zwischen Erwartung und Realität, oft beim Gehalt oder bei Remote-Optionen. Nach Unterschrift beginnt das Onboarding, das als eigene Phase nachgelagert werden kann und direkt auf Quality of Hire und Retention einzahlt.</p>" }
        ]
      },
      {
        h2: "Recruiting-Funnel-Beispiel aus Agentur-Perspektive",
        body: "<p>Für Recruiting-Agenturen und Headhunter sieht der Funnel anders aus als für Inhouse-Recruiting, weil die Top-of-Funnel-Stufe hauptsächlich aus Active Sourcing statt aus Inbound-Bewerbungen besteht. Ein realistisches Zahlenbeispiel für ein IT-Executive-Search-Mandat:</p><ul><li><strong>1.000 passive Kandidaten</strong> identifiziert über LinkedIn-Recruiter, Xing, GitHub-Suche und Branchen-Datenbanken</li><li><strong>150 Responses</strong> auf die erste Kontakt-Message (Response-Rate 15 Prozent, typisch für gut personalisierte Outreach)</li><li><strong>50 Discovery-Calls</strong> mit echtem gegenseitigem Interesse (33 Prozent der Responses)</li><li><strong>15 Vorschläge an den Kunden</strong> nach interner Vor-Qualifikation</li><li><strong>8 Interviews beim Kunden</strong></li><li><strong>3 Angebote</strong></li><li><strong>1 Placement</strong></li></ul><p>Das ist ein Verhältnis von 1.000 zu 1. Klingt brutal, ist aber im Executive-Search-Segment Standard. Die entscheidende Zahl für die Agentur ist nicht das Endergebnis, sondern die <strong>Conversion-Rate pro Stage</strong>: Wenn die Response-Rate von 15 auf 20 Prozent steigt, reduziert das den Top-of-Funnel-Aufwand um ein Drittel. Wenn die Offer-Acceptance-Rate von 33 auf 50 Prozent steigt, werden aus 8 Interviews 4 Placements statt 1. Genau diese Hebel machen den Unterschied zwischen profitabler und unrentabler Agentur.</p><p>Für Retainer-basierte Mandate rechnet die Agentur die Funnel-Zahlen rückwärts: Bei 1 Placement pro 1.000 Kontakten und einem Ziel von 12 Placements pro Jahr pro Recruiter braucht sie 12.000 kontaktierte Profile, also rund 1.000 pro Monat. Das ist die Basis jeder realistischen Kapazitätsplanung.</p>"
      },
      {
        h2: "Performance messen: KPIs pro Stage",
        body: "<p>Ein Funnel ohne Messung ist ein schönes Bild ohne Erkenntnis. Für jeden Übergang zwischen zwei Stages gibt es drei Kern-KPIs: <strong>Conversion-Rate</strong>, <strong>Time-in-Stage</strong> und <strong>Drop-off-Grund</strong>. Richtig konfiguriert sind diese drei Werte die Grundlage für jedes Reporting.</p>",
        h3s: [
          { h3: "Conversion-Rate pro Stage", body: "<p>Prozentsatz der Kandidaten, die von einer Stage in die nächste übergehen. Beispiel: 50 von 150 Klick-Throughs starten die Bewerbung, das ist eine Apply-Start-Rate von 33 Prozent. Jede Stage hat einen Branchen-Benchmark, gegen den sich die eigene Rate vergleichen lässt.</p>" },
          { h3: "Time-in-Stage", body: "<p>Durchschnittliche Verweildauer pro Phase. Wenn Kandidaten 12 Tage im Screening hängen, sinkt die Wahrscheinlichkeit einer Unterschrift drastisch. Ziel: Screening unter 3 Tage, Interview-Scheduling unter 5 Tage, Offer-Entscheidung unter 7 Tage.</p>" },
          { h3: "Drop-off-Grund", body: "<p>Kategorisiert, warum Kandidaten die Stage verlassen haben: passt nicht fachlich, abgelehnt vom Hiring Manager, Bewerber hat abgesagt, keine Rückmeldung mehr, Gehaltsmismatch. Nur wer Drop-off-Gründe sauber tagged, kann strukturell verbessern statt nur an Symptomen.</p>" },
          { h3: "Quality-per-Source und Cost-per-Source", body: "<p>Welcher Sourcing-Kanal liefert die Placements, nicht nur die Klicks? Wenn LinkedIn 60 Prozent der Bewerbungen bringt aber nur 10 Prozent der Placements, ist der Kanal teuer Schein-aktiv und liefert echte Wertschöpfung woanders. Diese Analyse fehlt in den meisten Recruiting-Teams komplett.</p>" },
          { h3: "Offer-Acceptance-Rate", body: "<p>Anteil der Angebote, die unterschrieben werden. Ein gesunder Wert liegt zwischen 70 und 85 Prozent. Darunter deutet meist auf Mismatch bei Gehalt, Remote-Policy oder Unternehmenskultur hin, der früher im Prozess hätte auffallen müssen.</p>" }
        ]
      },
      {
        h2: "Mobile Recruiting Funnel Optimierung",
        body: "<p>Laut Appcast Recruitment Marketing Report 2025 starten 68 Prozent aller Bewerbungen auf dem Smartphone. Wenn der Funnel nicht mobil-optimiert ist, verliert er genau in der entscheidenden Phase 2 und 3 den Großteil der Kandidaten. Vier Hebel wirken nachweislich:</p><ul><li><strong>One-Click-Apply statt Langformular.</strong> Apply-Completion-Rate steigt laut Appcast um bis zu 40 Prozent, wenn Bewerber ihren Lebenslauf per LinkedIn-Profil, Xing oder CV-Upload automatisch übergeben können.</li><li><strong>Ladezeit unter 2 Sekunden.</strong> Jede zusätzliche Sekunde kostet rund 7 Prozent Conversion. Mobile-Karriereseiten mit 5 Sekunden Ladezeit verlieren die Hälfte der potenziellen Bewerber, bevor sie überhaupt das Formular gesehen haben.</li><li><strong>WhatsApp- oder SMS-Kommunikation statt ausschließlich E-Mail.</strong> Response-Raten auf WhatsApp-Nachrichten liegen bei 90 Prozent binnen 24 Stunden, E-Mail bei rund 30 Prozent. Besonders für Blue-Collar- und Gen-Z-Zielgruppen entscheidend.</li><li><strong>Kurze Stellenanzeigen mit klaren Absätzen.</strong> Mobile Nutzer scrollen, sie lesen nicht. Bulletpoints, Gehaltsrange im ersten Drittel und ein klarer CTA am Ende verdoppeln die Apply-Start-Rate.</li></ul><p>Ein mobil-optimierter Funnel kann bei gleichem Ad-Budget 30 bis 50 Prozent mehr Bewerbungen produzieren, ohne dass eine einzige neue Stellenanzeige geschaltet wird.</p>"
      },
      {
        h2: "Online-Funnel vs Offline-Funnel",
        body: "<p>Der klassische Offline-Recruiting-Funnel lief über Printanzeigen, persönliche Empfehlungen und Karrieremessen. Heute laufen 90 Prozent des Top-of-Funnels online, aber die Unterscheidung bleibt strategisch relevant, weil die Datenlage und Optimierungshebel unterschiedlich sind.</p><p>Im <strong>Online-Funnel</strong> ist jeder Schritt messbar: Impressions, Clicks, Apply-Starts, Completions. Tracking läuft automatisch über Jobbörsen-APIs, Karriereseiten-Analytics und ATS-Reporting. Optimierung passiert datenbasiert mit A/B-Tests von Titeln, Bildern und Formular-Länge.</p><p>Im <strong>Offline-Funnel</strong> sind viele Stufen opaque: Wie viele Menschen haben den Flyer gesehen, wie viele den Gesprächsansatz auf der Messe wahrgenommen? Tracking funktioniert nur über Self-Reporting im Bewerbungsformular oder über Proxy-Metriken. Dafür ist die Conversion im Offline-Funnel oft höher, weil die Kontakte vorqualifizierter sind.</p><p>Moderne Agenturen führen beide Funnels parallel und messen Attribution über Self-Reporting-Fragen am Ende der Bewerbung (Wie bist du auf uns aufmerksam geworden?) plus Last-Touch-Tracking über UTM-Parameter. First-Touch und Last-Touch weichen bei Recruiting oft um 30 bis 50 Prozent ab, weil Kandidaten mehrmals mit dem Arbeitgeber in Kontakt kommen, bevor sie sich bewerben.</p>"
      },
      {
        h2: "Typische Fehler und wie sie sich fixen lassen",
        body: "<p>Die meisten Recruiting-Funnel haben nicht ein Problem, sondern drei bis fünf gleichzeitig. Diese fünf Fehler tauchen in Audits am häufigsten auf:</p><ul><li><strong>Stellenanzeige ohne Gehaltsrange.</strong> Senkt die Apply-Start-Rate laut StepStone um 23 Prozent. Fix: Range in den ersten drei Zeilen der Anzeige, nicht versteckt am Ende.</li><li><strong>Bewerbungsformular mit mehr als 20 Feldern.</strong> 60 Prozent Abbruchrate laut Indeed Hiring Lab. Fix: Kurzformular (Name, E-Mail, CV, ein Freitext-Feld), alles andere im Screening-Call nachfragen.</li><li><strong>Keine Rückmeldung nach 10 Tagen.</strong> 35 Prozent der Kandidaten werden passiv geghostet. Fix: Automatische Status-Mail spätestens 48 Stunden nach Bewerbungseingang, danach Update alle 7 Tage.</li><li><strong>Interview-Scheduling per E-Mail-Pingpong.</strong> Verliert im Schnitt 4 Tage pro Kandidat. Fix: Self-Service-Booking-Link mit den freien Slots des Hiring Managers, Kandidat wählt in unter 60 Sekunden.</li><li><strong>Keine Drop-off-Tagging.</strong> Ohne dokumentierte Ablehnungsgründe lässt sich der Funnel nicht systematisch verbessern. Fix: Jeder Kandidat bekommt beim Ausscheiden aus einer Stage einen Tag (passt fachlich nicht, Kultur-Mismatch, Gehalt, Timing, kein Interesse mehr).</li></ul><p>Wer diese fünf Fixes parallel umsetzt, steigert die Funnel-Conversion in den meisten Teams innerhalb eines Quartals um 30 bis 50 Prozent, ohne einen einzigen Euro mehr für Jobanzeigen auszugeben.</p>"
      },
      {
        h2: "Wie ShortSelect den Recruiting Funnel automatisiert",
        body: "<p>ShortSelect ist ein ATS und CRM für Recruiting-Agenturen und HR-Teams, das den Funnel von der ersten Sourcing-Message bis zur Unterschrift als visuelle Kanban-Pipeline abbildet. Jede Stage lässt sich pro Mandat oder Kunde individuell konfigurieren, inklusive eigener Drop-off-Gründe und Pflichtfelder pro Übergang.</p><p>Pro Stage zeigt das Dashboard live Conversion-Rate, Time-in-Stage und Drop-off-Gründe. Engpässe werden damit sofort sichtbar, statt erst im Quartalsreport aufzutauchen. KI-gestütztes Screening filtert Low-Fit-Kandidaten automatisch raus, Interview-Scheduling läuft über Self-Service-Booking, Status-Emails verschicken sich bei jedem Stage-Übergang automatisch. Der Recruiter wird von administrativen Aufgaben entlastet und kann Zeit in die Stages stecken, wo menschliche Intuition den Unterschied macht: Discovery-Calls, Interviews und Offer-Verhandlungen.</p><p>Besonders für Multi-Client-Agenturen ist die Mandantentrennung wichtig. ShortSelect bildet pro Kunde einen eigenen Funnel ab, mit eigenen Stages, Branding auf der Karriereseite und eigenen Reportings. Der Recruiter sieht alle Mandate in einer Oberfläche, der Kunde bekommt nur seinen eigenen Funnel inklusive transparenter Forecasts.</p><p>Das Ergebnis ist messbar: ShortSelect-Kunden reduzieren ihre Time-to-Hire im Schnitt um 50 Prozent und erhöhen die Placement-Quote pro Recruiter um rund 40 Prozent. Der Funnel wird vom abstrakten Reporting-Konstrukt zum operativen Werkzeug, das jeden Tag benutzt wird.</p>"
      }
    ],
    faqs: [
      {
        q: "Was ist ein Recruiting Funnel?",
        a: "Ein Recruiting Funnel ist ein mehrstufiges Modell, das den Einstellungsprozess vom ersten Kontakt bis zur Unterschrift abbildet. Die typischen 6 Phasen sind Aufmerksamkeit, Interesse, Bewerbung, Screening, Interview und Angebot. An jeder Stufe fallen Kandidaten heraus, weshalb der Prozess trichterförmig verläuft. Der Begriff stammt aus dem Marketing (Sales Funnel) und wurde auf das Recruiting übertragen, um Conversion und Engpässe datenbasiert zu messen."
      },
      {
        q: "Was ist der Unterschied zwischen Hiring Funnel und Recruiting Funnel?",
        a: "Recruiting Funnel, Hiring Funnel, Recruitment Funnel und Bewerber Funnel meinen inhaltlich dasselbe Konzept. Hiring Funnel ist die im US-amerikanischen Raum gebräuchliche Variante, Recruitment Funnel die britische. Im deutschsprachigen Raum hat sich Recruiting Funnel durchgesetzt. Vereinzelt spricht man auch von Personalbeschaffungs-Trichter oder Bewerber Funnel. Alle Begriffe bezeichnen denselben mehrstufigen Auswahlprozess."
      },
      {
        q: "Wie sieht ein Beispiel für einen Recruiting Funnel aus?",
        a: "Ein realistisches Agentur-Beispiel für ein IT-Executive-Search-Mandat: 1.000 passive Kandidaten identifiziert, 150 Responses auf die erste Outreach-Message, 50 Discovery-Calls, 15 Vorschläge an den Kunden, 8 Interviews, 3 Angebote, 1 Placement. Das entspricht einem Funnel-Verhältnis von 1.000 zu 1. Für Inhouse-Recruiting mit Inbound-Bewerbungen ist das Verhältnis typischerweise günstiger: aus 1.000 Impressions werden rund 150 Klicks, 15 Bewerbungen, 8 Screenings, 3 Interviews, 1 Einstellung."
      },
      {
        q: "Was ist ein Performance Recruiting Funnel?",
        a: "Ein Performance Recruiting Funnel ist die datenbasierte Variante, bei der jede Funnel-Phase eigene KPIs trägt: Conversion-Rate pro Stage, Time-in-Stage, Cost-per-Stage und Quality-per-Source. Der Begriff stammt aus dem Performance Marketing und betont messbare Optimierung statt qualitativer Einschätzung. Teams messen so den ROI jedes Sourcing-Kanals und jeder Prozess-Änderung und können Budget und Kapazität datenbasiert verteilen."
      },
      {
        q: "Wie optimiere ich den Recruiting Funnel für Mobile?",
        a: "Vier Hebel wirken nachweislich: One-Click-Apply per LinkedIn-Profil oder CV-Upload (senkt Abbruchrate um 40 Prozent laut Appcast), Ladezeit unter 2 Sekunden auf der Karriereseite, WhatsApp- oder SMS-Kommunikation zusätzlich zu E-Mail und kurze Stellenanzeigen mit Gehaltsrange im ersten Drittel. 68 Prozent aller Bewerbungen starten 2025 auf dem Smartphone, wer den Funnel nicht mobil-optimiert, verliert genau dort den Großteil der Kandidaten."
      },
      {
        q: "Welche KPIs messe ich pro Stage im Recruiting Funnel?",
        a: "Pro Stage gibt es drei Kern-KPIs: Conversion-Rate (wie viele Kandidaten gehen in die nächste Stage über), Time-in-Stage (wie lange dauert die Phase durchschnittlich) und Drop-off-Grund (kategorisiert, warum Kandidaten ausscheiden). Ergänzend pro Sourcing-Kanal Quality-per-Source und Cost-per-Source, am Ende des Funnels Offer-Acceptance-Rate und Quality-of-Hire. Ohne Drop-off-Tagging bleibt der Funnel ein Reporting-Konstrukt ohne operative Wirkung."
      },
      {
        q: "Wie unterscheidet sich der Online Recruiting Funnel vom klassischen?",
        a: "Der Online-Funnel ist in jeder Stage messbar: Impressions, Clicks, Apply-Starts, Completions werden automatisch getrackt. Optimierung erfolgt mit A/B-Tests und Daten. Der klassische Offline-Funnel über Printanzeigen, Messen und persönliche Empfehlungen ist nur schwer zu tracken, liefert dafür oft höhere Conversion-Raten, weil die Kontakte vorqualifiziert sind. Moderne Agenturen führen beide Funnels parallel und messen Attribution über Self-Reporting-Fragen am Ende der Bewerbung."
      },
      {
        q: "Warum brauche ich überhaupt einen Recruiting Funnel?",
        a: "Ohne Funnel ist Recruiting Blindflug. Sie wissen nicht, an welcher Stage Kandidaten verloren gehen, können Forecasts nicht berechnen und treffen Prozess-Entscheidungen auf Bauchgefühl. Unternehmen, die ihren Funnel aktiv messen, reduzieren ihre Time-to-Hire laut LinkedIn Talent Solutions um 30 Prozent und besetzen Stellen mit höherer Quality-of-Hire. Für Recruiting-Agenturen ist der Funnel zusätzlich die Grundlage für Kapazitäts- und Preisplanung gegenüber Kunden."
      }
    ]
  },
  "cost-per-hire": {
    title: "Cost-per-Hire",
    shortDef: "Cost-per-Hire misst die gesamten Kosten, die für die Besetzung einer Stelle anfallen.",
    definition: "Cost-per-Hire ist eine der zentralen Finanzkennzahlen im Recruiting. Die Formel: CPH = (Interne Kosten + Externe Kosten) / Anzahl Einstellungen. Der Branchendurchschnitt liegt in Deutschland bei 3.000-7.000 EUR pro Einstellung.",
    importance: "Ohne Kenntnis der Cost-per-Hire ist es unmöglich, das Recruiting-Budget sinnvoll zu planen oder den ROI verschiedener Sourcing-Kanäle zu vergleichen.",
    bestPractices: [
      "Erfassen Sie alle Kosten -- auch versteckte wie die Arbeitszeit der Hiring Manager",
      "Vergleichen Sie die CPH verschiedener Sourcing-Kanäle",
      "Benchmarken Sie gegen Ihre Branche",
      "Automatisieren Sie administrative Aufgaben",
    ],
    howShortSelectHelps: "ShortSelect senkt Ihre Cost-per-Hire durch Automatisierung zeitraubender Aufgaben und integrierte Karriereseiten.",
    relatedSlugs: ["time-to-hire", "recruiting-funnel", "quality-of-hire"],
  },
  "quality-of-hire": {
    title: "Quality of Hire",
    shortDef: "Quality of Hire bewertet die Qualität einer Einstellung anhand von Leistung, Retention und kulturellem Fit.",
    definition: "Quality of Hire (QoH) bewertet, wie gut ein neu eingestellter Mitarbeiter performt und wie lange er im Unternehmen bleibt. Typische Indikatoren sind Leistungsbewertung, Verbleibquote, Ramp-Up-Zeit und Hiring-Manager-Zufriedenheit.",
    importance: "Unternehmen, die QoH aktiv messen, treffen nachweislich bessere Einstellungsentscheidungen und haben eine 25% höhere Mitarbeiterbindung.",
    bestPractices: [
      "Definieren Sie klare Erfolgskriterien VOR der Einstellung",
      "Sammeln Sie Hiring-Manager-Feedback nach 30, 90 und 180 Tagen",
      "Korrelieren Sie QoH mit Sourcing-Kanälen",
      "Nutzen Sie strukturierte Interviews und Screening-Fragen",
    ],
    howShortSelectHelps: "ShortSelect unterstützt Quality of Hire durch strukturierte Screening-Fragen, KI-gestütztes Matching und das integrierte Feedback-System.",
    relatedSlugs: ["cost-per-hire", "candidate-experience", "recruiting-funnel"],
  },
};
