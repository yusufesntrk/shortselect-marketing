import type { BlogPost } from "./types";

export const backfill2: BlogPost[] = [
  {
    slug: "multi-mandanten-ats-kunden-trennen",
    title: "Multi-Mandanten-ATS: Wie Personalberatungen mehrere Kunden sauber trennen",
    seoTitle: "Multi-Mandanten-ATS für Agenturen | ShortSelect",
    date: "2026-04-29",
    author: "ShortSelect Team",
    authorRole: "Redaktion",
    category: "Praxis-Guides",
    tags: ["Multi-Mandanten", "ATS", "Personalberatung", "Datentrennung", "Client-Portal", "CRM"],
    excerpt:
      "Eine Agentur besetzt Stellen für viele Auftraggeber gleichzeitig. Wie ein Multi-Mandanten-ATS Kandidaten, Jobs und Kommunikation pro Kunde sauber trennt, ohne dass Recruiter zwischen zehn Logins springen.",
    seoDescription:
      "So trennen Personalberatungen mehrere Kunden sauber im ATS: Datentrennung, Berechtigungen, Client-Portal und CRM im Multi-Mandanten-Recruiting.",
    readTime: "8 Min.",
    content: `
<p>Ein Multi-Mandanten-ATS trennt Kandidaten, Jobs, Kommunikation und Auswertungen pro Auftraggeber, sodass eine Personalberatung viele Kunden parallel bedienen kann, ohne dass Daten sich vermischen oder Recruiter zwischen getrennten Systemen wechseln müssen. Genau das unterscheidet ein agentur-taugliches System von einem Bewerbermanagement, das für eine einzige Firma gedacht ist. Wer als Agentur wächst, merkt schnell: Nicht die Zahl der offenen Stellen wird zum Problem, sondern die Zahl der Auftraggeber. Dieser Guide zeigt, worauf es bei der sauberen Trennung ankommt.</p>

<h2>Warum ist Mandantentrennung für Agenturen so kritisch?</h2>
<p>Eine Personalberatung arbeitet strukturell anders als ein Inhouse-HR-Team. Das HR-Team besetzt die Stellen der eigenen Firma, mit einer Datenbasis, einem Prozess, einem Auftraggeber. Eine Agentur besetzt die Stellen fremder Firmen, oft zehn oder zwanzig Mandate gleichzeitig, jedes mit eigenen Ansprechpartnern, eigenen Anforderungen und eigenen Vertraulichkeitsregeln.</p>
<p>Daraus folgt eine harte Anforderung: Kunde A darf niemals die Kandidaten, Notizen oder Konditionen von Kunde B sehen. Zwei Wettbewerber, die beide bei derselben Agentur suchen, dürfen nicht bemerken, dass sie sich einen Dienstleister teilen, geschweige denn, welche Kandidaten dort im Prozess sind. Vermischen sich die Daten, ist das nicht nur peinlich, sondern ein handfestes Datenschutz- und Vertrauensproblem. Ein <a href="/ats-fuer-recruiting-agenturen/">ATS für Recruiting-Agenturen</a> muss deshalb von Grund auf in Mandanten denken, nicht in einer einzigen Organisation.</p>

<h2>Was bedeutet saubere Datentrennung technisch?</h2>
<p>Saubere Trennung heißt: Jeder Datensatz gehört eindeutig zu einem Mandanten, und die Sichtbarkeit richtet sich nach der Rolle des Nutzers. Ein Recruiter, der nur Mandat X betreut, sieht auch nur die Kandidaten, Jobs und Nachrichten von Mandat X. Diese Trennung darf nicht auf Disziplin beruhen, also darauf, dass alle brav den richtigen Filter setzen, sondern muss im System erzwungen sein.</p>
<p>Drei Ebenen sind entscheidend:</p>
<p><strong>Erstens die Datenebene.</strong> Kandidaten, Jobs, Bewerbungen und Aktivitäten sind pro Mandant isoliert gespeichert. Ein versehentlicher Klick öffnet nicht die falsche Kundenakte. Wenn derselbe Kandidat für zwei Kunden interessant ist, wird er bewusst und dokumentiert zugeordnet, nicht stillschweigend geteilt.</p>
<p><strong>Zweitens die Berechtigungsebene.</strong> Rollen entscheiden, wer was sieht und darf. Ein Recruiter, ein Teamleiter und ein Auftraggeber haben unterschiedliche Sichten. Ein durchdachtes Berechtigungskonzept ist kein Luxus, sondern die Voraussetzung dafür, dass die Trennung im Alltag hält. Mehr dazu, warum das auch rechtlich zählt, steht im Beitrag zum <a href="/recruiting-crm-dsgvo/">DSGVO-konformen Recruiting-CRM</a>.</p>
<p><strong>Drittens die Kommunikationsebene.</strong> E-Mails, Nachrichten und Statusmeldungen laufen pro Mandant. Ein Follow-up an einen Kandidaten von Kunde A landet nicht versehentlich im Verteiler von Kunde B, und die Kommunikationshistorie bleibt dem richtigen Mandat zugeordnet.</p>

<h2>Ein Login statt zehn: warum Zentralisierung schlägt Fragmentierung?</h2>
<p>Manche Agenturen lösen das Trennungsproblem, indem sie pro Kunde ein eigenes Tool oder einen eigenen Account führen. Das trennt zwar zuverlässig, verlagert aber die Last auf die Recruiter: zehn Logins, zehn Oberflächen, keine gemeinsame Auswertung, kein Gesamtblick auf die Auslastung. Wer gerade für welchen Kunden im Prozess ist, weiß niemand mehr zentral.</p>
<p>Ein echtes Multi-Mandanten-ATS dreht das um. Die Recruiter arbeiten in einem System und einer Oberfläche, wechseln den Mandanten mit einem Klick, und trotzdem bleiben die Daten getrennt. Die Trennung ist eine Frage der Rechte und der Zuordnung, nicht der Systemgrenze. So bekommt die Agenturleitung einen Gesamtblick über alle Mandate hinweg, während der einzelne Recruiter nur seinen Ausschnitt sieht.</p>
<p>Der praktische Gewinn: Ein Kandidat, der für Mandat X abgelehnt wurde, kann bewusst für Mandat Y vorgeschlagen werden, sofern die Einwilligung das deckt. Diese Wiederverwendung des eigenen Talentpools ist ein Kernvorteil der Agentur und funktioniert nur, wenn alle Mandate im selben System liegen, aber sauber getrennt bleiben.</p>

<h2>Wie hält man Auftraggeber informiert, ohne Daten zu öffnen?</h2>
<p>Auftraggeber wollen Transparenz. Sie zahlen und möchten sehen, was passiert: Wie viele Kandidaten sind im Prozess, wer ist auf der Shortlist, wann kommt der nächste Vorschlag? Die naive Lösung ist die PDF-Liste per Mail, die veraltet, sobald sie verschickt ist, und die Datenschutzfragen aufwirft.</p>
<p>Die saubere Lösung ist ein <a href="/produkt/client-portal/">Client-Portal</a>: ein kontrollierter Zugang, über den der Kunde genau den Ausschnitt seines eigenen Mandats sieht, den die Agentur freigibt, und nichts darüber hinaus. Kunde A sieht seine Shortlist, Kunde B seine, und keiner sieht den anderen. Das Portal ist damit die logische Fortsetzung der Mandantentrennung nach außen: Dieselbe Isolation, die intern zwischen Recruitern gilt, gilt auch zwischen Kunden.</p>
<p>Für die Agentur hat das zwei Effekte. Erstens sinkt der Abstimmungsaufwand, weil der Kunde selbst nachsehen kann, statt nachzufragen. Zweitens positioniert sich die Personalberatung als transparenter Partner, was aus einem einmaligen Auftrag ein Dauermandat machen kann. Für viele <a href="/fuer/personalvermittlung/">Personalvermittler</a> ist genau diese sichtbare Professionalität ein Verkaufsargument.</p>

<h2>Warum gehört das CRM zwingend dazu?</h2>
<p>Mandantentrennung endet nicht bei den Kandidaten. Eine Agentur pflegt zu jedem Kunden eine Geschäftsbeziehung: Ansprechpartner, offene und abgeschlossene Mandate, Konditionen, Platzierungshistorie, laufende Deals. Wer diese Kundenseite in einer Tabelle oder einem separaten Vertriebstool führt, reißt genau die Trennung wieder auf, die man im ATS aufgebaut hat.</p>
<p>Ein System, das <a href="/produkt/ats-crm/">ATS und CRM verbindet</a>, hält Kandidatendaten und Kundenbeziehung im selben Mandanten-Rahmen. Der Recruiter sieht beim Kunden nicht nur die aktuellen Kandidaten, sondern auch, welche Stellen dieser Kunde in der Vergangenheit besetzt hat und wer der Ansprechpartner ist. Vertrieb und Delivery arbeiten nicht mehr aneinander vorbei, weil sie auf dieselbe, sauber getrennte Datenbasis schauen. Das ist der Unterschied zwischen einem Werkzeug, das Bewerbungen verwaltet, und einem System, das das Geschäft einer Personalberatung abbildet.</p>

<h2>Worauf sollte man bei der Auswahl konkret achten?</h2>
<p>Wer ein Multi-Mandanten-ATS bewertet, sollte weniger auf die Länge der Feature-Liste schauen und mehr auf diese Fragen: Ist die Datentrennung im System erzwungen oder nur eine Filtereinstellung? Gibt es ein Rollen- und Berechtigungskonzept, das zur Agenturstruktur passt? Existiert ein Client-Portal, das dem Kunden genau seinen Ausschnitt zeigt? Ist das CRM Teil desselben Systems oder ein Anhängsel? Und lässt sich all das mit einem Login bedienen, oder zwingt die Software wieder zur Fragmentierung?</p>
<p>Beim Preis lohnt der Blick auf Planbarkeit. Agenturen kalkulieren pro Kopf, und ein Modell, das mit jedem Mandanten eine neue Kostenstufe aufmacht, macht die Kalkulation unmöglich. ShortSelect etwa führt einen Pro Plan zu 199 Euro pro User und Monat (oder 1.791 Euro pro Jahr mit drei geschenkten Monaten), unabhängig davon, wie viele Kunden ein Recruiter betreut.</p>

<h2>Häufige Fragen</h2>
<h3>Was ist der Unterschied zwischen einem Multi-Mandanten-ATS und mehreren getrennten Accounts?</h3>
<p>Getrennte Accounts trennen zwar die Daten, zersplittern aber die Arbeit: mehrere Logins, keine gemeinsame Auswertung, kein Gesamtblick. Ein Multi-Mandanten-ATS trennt die Daten über Rollen und Zuordnung innerhalb eines Systems, sodass Recruiter mit einem Login arbeiten und die Leitung trotzdem alle Mandate im Blick behält.</p>
<h3>Dürfen zwei Kunden denselben Kandidaten sehen?</h3>
<p>Nein, nicht ohne Weiteres. In einem sauberen System gehört jeder Kandidat zunächst zu einem Mandat und ist für andere Mandanten nicht sichtbar. Eine Wiederverwendung für einen zweiten Kunden ist möglich, muss aber bewusst zugeordnet werden und die Einwilligung des Kandidaten abdecken.</p>
<h3>Braucht eine kleine Agentur mit wenigen Kunden schon Mandantentrennung?</h3>
<p>Ja. Schon bei zwei Auftraggebern, die zueinander im Wettbewerb stehen, ist die saubere Trennung eine Vertrauens- und Datenschutzfrage. Und ein System, das von Anfang an in Mandanten denkt, wächst ohne Umbau mit, wenn die Zahl der Kunden steigt.</p>
`,
  },
  {
    slug: "dsgvo-recruiting-2026-pflichten-agenturen",
    title: "DSGVO im Recruiting 2026: Die wichtigsten Pflichten für Agenturen",
    seoTitle: "DSGVO im Recruiting 2026 für Agenturen | ShortSelect",
    date: "2026-05-09",
    author: "ShortSelect Team",
    authorRole: "Redaktion",
    category: "DSGVO & Compliance",
    tags: ["DSGVO", "Datenschutz", "Recruiting", "Compliance", "AVV", "Betroffenenrechte"],
    excerpt:
      "Personalberatungen verarbeiten fremde Bewerberdaten im großen Stil. Welche DSGVO-Pflichten 2026 zentral sind: Rechtsgrundlage, Auftragsverarbeitung, Löschfristen und Betroffenenrechte im Überblick.",
    seoDescription:
      "DSGVO im Recruiting 2026: Rechtsgrundlage nach Art. 6, AVV nach Art. 28, Löschfristen und Betroffenenrechte. Die wichtigsten Pflichten für Agenturen.",
    readTime: "9 Min.",
    content: `
<p>Die wichtigsten DSGVO-Pflichten für Recruiting-Agenturen im Jahr 2026 lassen sich auf vier Bereiche eindampfen: eine saubere Rechtsgrundlage für die Verarbeitung von Bewerberdaten, ein Auftragsverarbeitungsvertrag mit jedem eingesetzten Dienstleister, dokumentierte Löschfristen und ein funktionierender Prozess für Betroffenenrechte. Wer diese vier Punkte im Griff hat, hat den Kern der Datenschutz-Konformität abgedeckt. Dieser Beitrag ordnet die Pflichten qualitativ ein und ersetzt keine Rechtsberatung, sondern gibt Agenturen eine Orientierung, worauf es ankommt.</p>
<p><em>Hinweis: Dieser Artikel dient der Information und stellt keine Rechtsberatung dar. Für die konkrete Ausgestaltung im Einzelfall sollte eine Datenschutzbeauftragte oder eine spezialisierte Kanzlei hinzugezogen werden.</em></p>

<h2>Warum tragen Agenturen ein besonderes Datenschutzrisiko?</h2>
<p>Eine Personalberatung verarbeitet nicht ihre eigenen Mitarbeiterdaten, sondern die Daten fremder Bewerber, im Auftrag fremder Firmen, oft für viele Mandate gleichzeitig. Damit steigt das Risiko in drei Richtungen: Die Datenmenge ist groß, die Daten sind sensibel (Lebensläufe enthalten oft Angaben, die auf Gesundheit, Herkunft oder Weltanschauung schließen lassen), und die Verantwortlichkeiten sind verteilt zwischen Agentur und Auftraggeber.</p>
<p>Genau diese Konstellation macht Recruiting-Agenturen zu einem geprüften Feld für Aufsichtsbehörden. Ein sauberes Datenschutz-Setup ist deshalb kein Nice-to-have, sondern schützt die Agentur vor Bußgeldern, Abmahnungen und, fast wichtiger, vor dem Vertrauensverlust bei Kandidaten und Kunden. Wie sich das technisch abbilden lässt, zeigt der Überblick zu <a href="/produkt/compliance/">Compliance-Funktionen im ATS</a>.</p>

<h2>Auf welcher Rechtsgrundlage dürfen Bewerberdaten verarbeitet werden?</h2>
<p>Jede Verarbeitung personenbezogener Daten braucht eine Rechtsgrundlage nach Art. 6 DSGVO. Im Recruiting kommen praktisch zwei Grundlagen in Betracht: die Anbahnung eines Beschäftigungsverhältnisses und die Einwilligung der betroffenen Person.</p>
<p><strong>Für die konkrete Bewerbung</strong> auf eine ausgeschriebene Stelle stützt sich die Verarbeitung in der Regel auf die Anbahnung. Wer sich bewirbt, willigt implizit ein, dass seine Daten für dieses Verfahren genutzt werden. Das deckt aber nur genau diese Bewerbung ab.</p>
<p><strong>Für alles darüber hinaus</strong> braucht es meist eine ausdrückliche Einwilligung. Will die Agentur einen Kandidaten in ihren Talentpool aufnehmen, ihn also über das aktuelle Mandat hinaus für künftige Stellen vorhalten, ist dafür eine informierte, freiwillige und dokumentierte Einwilligung nötig. Dasselbe gilt, wenn ein Kandidat, der sich für Kunde A beworben hat, auch Kunde B vorgeschlagen werden soll. Diese Zweckbindung ist eine der häufigsten Fallen: Daten, die für einen Zweck erhoben wurden, dürfen nicht ungefragt für einen anderen genutzt werden. Wie ernst dieses Thema gerade bei KI-Auswertung wird, beleuchtet unser <a href="/recruiting-crm-dsgvo/">Leitfaden zum DSGVO-konformen Recruiting-CRM</a>.</p>

<h2>Was regelt der Auftragsverarbeitungsvertrag nach Art. 28?</h2>
<p>Sobald eine Agentur einen externen Dienstleister einsetzt, der in ihrem Auftrag personenbezogene Daten verarbeitet, etwa einen Software-Anbieter, der die Bewerberdaten hostet, braucht sie mit diesem einen Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO. Der AVV regelt, dass der Dienstleister die Daten nur nach Weisung verarbeitet, sie angemessen schützt und nach Auftragsende löscht oder zurückgibt.</p>
<p>Für die Agentur heißt das doppelt hinsehen: Einerseits ist sie selbst oft Auftragsverarbeiterin für ihre Kunden und muss mit diesen einen AVV schließen. Andererseits ist ihr Software-Anbieter ihre eigene Auftragsverarbeiterin, mit der wiederum ein AVV nötig ist. Diese Kette muss lückenlos sein. Ein seriöser <a href="/recruiting-crm-dsgvo/">DSGVO-konformer Recruiting-CRM-Anbieter</a> stellt einen AVV standardmäßig bereit und legt offen, wo die Daten gehostet werden. EU-Hosting ist dabei kein Detail, sondern erspart die aufwendige Rechtfertigung von Drittlandtransfers.</p>

<h2>Wie lange dürfen Bewerberdaten gespeichert werden?</h2>
<p>Der Grundsatz der Speicherbegrenzung verlangt, dass Daten nur so lange aufbewahrt werden, wie der Zweck es erfordert. Für abgelehnte Bewerber hat sich in der Praxis eine Aufbewahrung von einigen Monaten nach Abschluss des Verfahrens etabliert, um mögliche Ansprüche etwa nach dem Allgemeinen Gleichbehandlungsgesetz abwehren zu können. Nach diesem Zeitraum sind die Daten grundsätzlich zu löschen, sofern keine Einwilligung für eine längere Speicherung vorliegt.</p>
<p>Wichtig: Die genaue Frist ist kein starrer Wert, sondern eine Abwägung, die dokumentiert sein sollte. Wer einen Kandidaten mit dessen Einwilligung im Talentpool hält, muss diese Einwilligung regelmäßig überprüfen und die Daten löschen, wenn sie widerrufen wird oder der Zweck entfällt. Ein System, das Löschfristen automatisch überwacht und Kandidaten zur Auffrischung der Einwilligung anschreibt, nimmt der Agentur diese fehleranfällige Handarbeit ab. Der Grundsatz <a href="/produkt/compliance/">Datenschutz by Design</a> bedeutet genau das: Die Software sorgt im Hintergrund dafür, dass die Fristen eingehalten werden, statt sich auf Erinnerungen zu verlassen.</p>

<h2>Welche Betroffenenrechte muss eine Agentur bedienen?</h2>
<p>Jede betroffene Person hat Rechte, die die Agentur innerhalb der gesetzlichen Fristen erfüllen muss, in der Regel binnen eines Monats. Die wichtigsten im Recruiting-Kontext:</p>
<p><strong>Auskunft (Art. 15):</strong> Ein Kandidat darf erfragen, welche Daten über ihn gespeichert sind, zu welchem Zweck und wie lange. Die Agentur muss diese Auskunft vollständig und verständlich geben können, was nur funktioniert, wenn die Daten pro Person auffindbar an einem Ort liegen.</p>
<p><strong>Berichtigung (Art. 16):</strong> Falsche Daten müssen korrigiert werden.</p>
<p><strong>Löschung (Art. 17):</strong> Auf Verlangen und bei entfallenem Zweck sind Daten zu löschen. Das muss die Software zuverlässig und vollständig können, auch über verknüpfte Datensätze hinweg.</p>
<p><strong>Widerspruch und Widerruf:</strong> Eine erteilte Einwilligung kann jederzeit widerrufen werden, mit Wirkung für die Zukunft. Der Kandidat fliegt dann aus dem Talentpool.</p>
<p>Der praktische Kern all dieser Rechte ist derselbe: Die Agentur muss zu jeder Person schnell und vollständig Auskunft geben, korrigieren oder löschen können. Das gelingt nur mit einem System, in dem die Daten sauber strukturiert und pro Person zusammengeführt sind, nicht in verstreuten Tabellen, Postfächern und Notizzetteln. Welche technischen und organisatorischen Maßnahmen dahinterstehen, fasst die Übersicht zur <a href="/sicherheit/">Sicherheit und Datenverarbeitung</a> zusammen.</p>

<h2>Wie automatisierte Auswertung 2026 einzuordnen ist</h2>
<p>Mit dem breiten Einsatz von KI im Recruiting kommt eine zusätzliche Sorgfaltspflicht hinzu. Werden Kandidaten automatisiert bewertet oder vorsortiert, muss transparent bleiben, nach welchen Kriterien das geschieht, und ausschließlich automatisierte Entscheidungen mit rechtlicher Wirkung unterliegen besonderen Anforderungen. Praktisch heißt das für Agenturen: Eine KI darf vorschlagen und vorsortieren, aber der Mensch trifft die Entscheidung, und die Bewertung muss nachvollziehbar sein. Ein erklärbarer Score, den ein Recruiter dem Kandidaten und dem Kunden begründen kann, ist hier nicht nur gutes Handwerk, sondern eine Frage der Rechtssicherheit.</p>

<h2>Häufige Fragen</h2>
<h3>Braucht jede Recruiting-Agentur einen AVV mit ihrem Software-Anbieter?</h3>
<p>Ja. Sobald ein externer Anbieter Bewerberdaten im Auftrag der Agentur verarbeitet, etwa durch Hosting im ATS, ist ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO Pflicht. Seriöse Anbieter stellen ihn standardmäßig bereit und legen den Hosting-Standort offen.</p>
<h3>Wie lange dürfen Daten abgelehnter Bewerber gespeichert werden?</h3>
<p>Nur so lange, wie der Zweck es erfordert. In der Praxis werden Bewerberdaten häufig einige Monate nach Verfahrensende aufbewahrt, um mögliche Ansprüche abwehren zu können, und danach gelöscht, sofern keine Einwilligung für eine längere Speicherung vorliegt. Die konkrete Frist sollte dokumentiert und mit einer Datenschutzberatung abgestimmt werden.</p>
<h3>Darf ein Kandidat von Kunde A einfach Kunde B vorgeschlagen werden?</h3>
<p>Nicht ohne Weiteres. Die Daten wurden für einen bestimmten Zweck erhoben, und die Zweckbindung erlaubt keine freie Weiterverwendung. Für eine Vorstellung bei einem anderen Kunden oder die Aufnahme in den Talentpool ist in der Regel eine ausdrückliche, dokumentierte Einwilligung des Kandidaten nötig.</p>
`,
  },
];
