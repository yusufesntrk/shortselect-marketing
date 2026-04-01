import type { BlogPost } from "./types";

export const batch11: BlogPost[] = [
  {
    slug: "arbeitsrecht-recruiting-fehler",
    title:
      "Arbeitsrecht im Recruiting: Die 7 häufigsten Fehler und wie Sie sie vermeiden",
    date: "2024-12-09",
    author: "ShortSelect Team",
    authorRole: "Redaktion",
    category: "DSGVO & Compliance",
    tags: [
      "Arbeitsrecht",
      "AGG",
      "Compliance",
      "Stellenanzeigen",
      "Diskriminierung",
    ],
    excerpt:
      "Eine falsch formulierte Stellenanzeige kann 3 Monatsgehälter Entschädigung kosten. Diese 7 Fehler passieren täglich.",
    readTime: "9 Min.",
    content: `
<h2>Arbeitsrecht im Recruiting: Warum es jedes HR-Team betrifft</h2>

<p>Recruiting ist mehr als Stellenanzeigen schalten und Vorstellungsgespräche führen. Es ist ein Rechtsgebiet. Jede Formulierung in einer Stellenanzeige, jede Frage im Interview und jede Absage kann rechtliche Konsequenzen haben. Das Problem: Die meisten HR-Teams kennen die Grundlagen, aber nicht die Details. Und genau in den Details lauern die teuren Fehler.</p>

<p>In Deutschland regeln das Allgemeine Gleichbehandlungsgesetz (AGG), das Bundesdatenschutzgesetz (BDSG), die DSGVO, das Teilzeit- und Befristungsgesetz (TzBfG) und das Entgelttransparenzgesetz den rechtlichen Rahmen des Recruitings. Verstöße sind kein Kavaliersdelikt: AGG-Entschädigungen von bis zu drei Monatsgehältern, DSGVO-Bußgelder von bis zu 20 Millionen Euro und Schadensersatzforderungen wegen fehlerhafter Befristungen sind reale Risiken.</p>

<p>Dieser Artikel zeigt Ihnen die sieben häufigsten arbeitsrechtlichen Fehler im Recruiting, erklärt die gesetzliche Grundlage, gibt Praxis-Beispiele und zeigt, wie Sie es richtig machen.</p>

<h2>Fehler 1: Diskriminierende Stellenanzeigen</h2>

<h3>Gesetzliche Grundlage</h3>

<p>Das AGG (§ 11 in Verbindung mit § 1 AGG) verbietet die Benachteiligung von Bewerbern aufgrund von Alter, Geschlecht, ethnischer Herkunft, Religion, Behinderung, sexueller Identität oder Weltanschauung. Eine Stellenanzeige muss grundsätzlich neutral formuliert sein. Seit der Einführung des AGG im Jahr 2006 hat sich eine umfangreiche Rechtsprechung entwickelt, die sehr klar definiert, was erlaubt ist und was nicht.</p>

<h3>Praxis-Beispiele</h3>

<ul>
  <li><strong>Alter:</strong> Formulierungen wie "junges, dynamisches Team", "Berufseinsteiger gesucht" oder "Digital Native" können als Altersdiskriminierung gewertet werden. Das Bundesarbeitsgericht hat mehrfach bestätigt, dass solche Formulierungen eine Benachteiligung älterer Bewerber indizieren.</li>
  <li><strong>Geschlecht:</strong> "Verkäufer gesucht" ohne den Zusatz (m/w/d) verstößt gegen das Gebot der geschlechtsneutralen Ausschreibung. Seit dem Urteil des Bundesverfassungsgerichts zur dritten Geschlechtsoption ist der Zusatz (m/w/d) zum Standard geworden.</li>
  <li><strong>Herkunft:</strong> "Deutsch als Muttersprache" ist diskriminierend, weil es Bewerber mit Migrationshintergrund ausschließt. Stattdessen: "Verhandlungssichere Deutschkenntnisse (C1/C2)" formulieren.</li>
  <li><strong>Behinderung:</strong> "Belastbarkeit" oder "körperliche Fitness" ohne sachliche Rechtfertigung kann Bewerber mit Behinderungen benachteiligen.</li>
</ul>

<h3>Konsequenzen</h3>

<p>Abgelehnte Bewerber können eine Entschädigung nach § 15 Abs. 2 AGG verlangen. Diese beträgt in der Regel bis zu drei Bruttomonatsgehälter. Besonders brisant: Es gibt sogenannte AGG-Hopper, die gezielt nach diskriminierenden Anzeigen suchen und systematisch Entschädigungen einklagen. Gerichte erkennen diese Klagen zunehmend an, wenn die Diskriminierung objektiv vorliegt.</p>

<h3>Wie Sie es richtig machen</h3>

<ul>
  <li>Verwenden Sie immer den Zusatz (m/w/d) bei Jobtiteln</li>
  <li>Ersetzen Sie "jung" durch "motiviert" oder "engagiert"</li>
  <li>Formulieren Sie Sprachanforderungen als Kompetenzniveau (B2, C1, C2)</li>
  <li>Prüfen Sie jede Anzeige mit einer Checkliste vor der Veröffentlichung</li>
  <li>Nutzen Sie ein ATS mit integrierten Compliance-Prüfungen</li>
</ul>

<h2>Fehler 2: Verbotene Fragen im Vorstellungsgespräch</h2>

<h3>Gesetzliche Grundlage</h3>

<p>Das Fragerecht des Arbeitgebers wird durch das AGG, das Grundgesetz (Art. 1 und 2 GG) und die Rechtsprechung des Bundesarbeitsgerichts begrenzt. Grundsätzlich sind nur Fragen zulässig, die einen direkten Bezug zur ausgeschriebenen Stelle haben. Das Recht auf Lüge schützt Bewerber bei unzulässigen Fragen: Eine unwahre Antwort hat keine arbeitsrechtlichen Konsequenzen.</p>

<h3>Praxis-Beispiele</h3>

<ul>
  <li><strong>Familienplanung:</strong> "Sind Sie schwanger?" oder "Planen Sie Kinder?" — absolut unzulässig, unabhängig vom Geschlecht des Bewerbers</li>
  <li><strong>Religion:</strong> "Welcher Konfession gehören Sie an?" — unzulässig, außer bei Tendenzbetrieben (Kirchen, konfessionelle Einrichtungen)</li>
  <li><strong>Gesundheit:</strong> "Haben Sie chronische Erkrankungen?" — nur zulässig, wenn die Gesundheit unmittelbar für die Tätigkeit relevant ist (z. B. Piloten)</li>
  <li><strong>Gewerkschaftszugehörigkeit:</strong> "Sind Sie Mitglied einer Gewerkschaft?" — grundsätzlich unzulässig</li>
  <li><strong>Vorstrafen:</strong> Nur zulässig, wenn ein direkter Bezug zur Tätigkeit besteht (z. B. Vermögensdelikte bei Kassiertätigkeiten)</li>
</ul>

<h3>Konsequenzen</h3>

<p>Unzulässige Fragen im Vorstellungsgespräch können als Indiz für eine Diskriminierung nach dem AGG gewertet werden. Wird ein Bewerber abgelehnt, der zuvor unzulässig befragt wurde, kehrt sich die Beweislast um: Der Arbeitgeber muss beweisen, dass die Ablehnung nicht auf der unzulässigen Frage basierte. In der Praxis ist das schwer nachzuweisen.</p>

<h3>Wie Sie es richtig machen</h3>

<ul>
  <li>Erstellen Sie einen standardisierten Fragenkatalog für jede Position</li>
  <li>Schulen Sie alle Interviewer zu den Grenzen des Fragerechts</li>
  <li>Dokumentieren Sie alle gestellten Fragen und Antworten</li>
  <li>Nutzen Sie strukturierte Interviews mit vordefinierten Bewertungskriterien</li>
</ul>

<h2>Fehler 3: Fehlende oder zu späte Absagen</h2>

<h3>Gesetzliche Grundlage</h3>

<p>Eine gesetzliche Pflicht zur Absage existiert nicht. Allerdings kann eine unterlassene Absage in Verbindung mit einem AGG-Verstoß problematisch werden. Wenn ein Bewerber, der ein AGG-Merkmal trägt, weder eine Absage noch eine Begründung erhält, kann dies als Indiz für eine Diskriminierung gewertet werden. Die Frist zur Geltendmachung von AGG-Ansprüchen beträgt zwei Monate ab Zugang der Ablehnung (§ 15 Abs. 4 AGG).</p>

<h3>Praxis-Beispiel</h3>

<p>Ein Bewerber mit türkischem Namen bewirbt sich auf eine Stelle und erhält keine Reaktion. Drei Monate später klagt er auf Entschädigung wegen ethnischer Diskriminierung. Der Arbeitgeber kann nicht nachweisen, warum er abgelehnt wurde, weil keine Dokumentation existiert. Das Gericht spricht dem Bewerber 2,5 Monatsgehälter zu.</p>

<h3>Konsequenzen</h3>

<p>Ohne dokumentierte Absagegründe kann sich der Arbeitgeber bei einer AGG-Klage kaum verteidigen. Die fehlende Absage wird zum Indiz für Diskriminierung. Zudem schadet das "Ghosting" von Bewerbern massiv der Arbeitgebermarke: 72 Prozent der Kandidaten berichten anderen von negativen Bewerbungserfahrungen.</p>

<h3>Wie Sie es richtig machen</h3>

<ul>
  <li>Senden Sie innerhalb von zwei Wochen eine Absage — automatisiert über Ihr ATS</li>
  <li>Formulieren Sie Absagen neutral: "Wir haben uns für einen Kandidaten entschieden, dessen Profil noch besser zu den Anforderungen passt"</li>
  <li>Dokumentieren Sie die Absagegründe intern — sachlich und nachvollziehbar</li>
  <li>Nennen Sie niemals AGG-relevante Gründe in der Absage</li>
</ul>

<h2>Fehler 4: Background-Checks ohne Einwilligung</h2>

<h3>Gesetzliche Grundlage</h3>

<p>Die DSGVO (Art. 6 und Art. 9) und das BDSG (§ 26) regeln, welche personenbezogenen Daten im Bewerbungsverfahren erhoben und verarbeitet werden dürfen. Grundsätzlich gilt: Nur Daten, die für die Entscheidung über die Begründung des Beschäftigungsverhältnisses erforderlich sind. Darüber hinausgehende Recherchen erfordern eine ausdrückliche, informierte Einwilligung des Bewerbers.</p>

<h3>Praxis-Beispiele</h3>

<ul>
  <li><strong>Social-Media-Screening:</strong> Das systematische Durchsuchen privater Social-Media-Profile (Facebook, Instagram) ohne Einwilligung ist unzulässig. Berufliche Netzwerke wie LinkedIn oder Xing sind ein Graubereich, da die Informationen öffentlich zugänglich sind.</li>
  <li><strong>Schufa-Anfragen:</strong> Eine Bonitätsprüfung ist nur bei Positionen mit finanzieller Verantwortung zulässig — und erfordert eine Einwilligung des Bewerbers.</li>
  <li><strong>Referenz-Checks:</strong> Beim aktuellen Arbeitgeber dürfen ohne Einwilligung des Bewerbers keine Auskünfte eingeholt werden. Das gilt auch für informelle Anrufe.</li>
  <li><strong>Polizeiliches Führungszeugnis:</strong> Darf nur verlangt werden, wenn eine gesetzliche Grundlage besteht oder die Art der Tätigkeit es rechtfertigt.</li>
</ul>

<h3>Konsequenzen</h3>

<p>Verstöße gegen die DSGVO im Bewerbungsprozess können zu Bußgeldern führen. Zudem hat der Bewerber einen Anspruch auf Schadensersatz nach Art. 82 DSGVO. Besonders heikel: Wenn der Bewerber nach Einstellung von den unerlaubten Recherchen erfährt, kann er das Arbeitsverhältnis anfechten und Schadensersatz fordern.</p>

<h3>Wie Sie es richtig machen</h3>

<ul>
  <li>Holen Sie vor jedem Background-Check eine schriftliche Einwilligung ein</li>
  <li>Informieren Sie den Bewerber, welche Daten erhoben werden und warum</li>
  <li>Beschränken Sie Recherchen auf beruflich relevante Informationen</li>
  <li>Dokumentieren Sie die Einwilligung in Ihrem ATS</li>
  <li>Löschen Sie Bewerberdaten nach der gesetzlichen Aufbewahrungsfrist (6 Monate nach Absage)</li>
</ul>

<h2>Fehler 5: Falsche Befristung von Arbeitsverträgen</h2>

<h3>Gesetzliche Grundlage</h3>

<p>Das Teilzeit- und Befristungsgesetz (TzBfG) regelt die Befristung von Arbeitsverträgen. Eine sachgrundlose Befristung ist nach § 14 Abs. 2 TzBfG bis zu zwei Jahre zulässig, mit maximal drei Verlängerungen innerhalb dieser Zeit. Eine Befristung mit Sachgrund (§ 14 Abs. 1 TzBfG) erfordert einen der gesetzlich genannten Gründe: vorübergehender Bedarf, Vertretung, Erprobung, Eigenart der Arbeitsleistung oder gerichtlicher Vergleich.</p>

<h3>Praxis-Beispiele</h3>

<ul>
  <li><strong>Vorbeschäftigungsverbot:</strong> Wurde der Mitarbeiter bereits zuvor beim selben Arbeitgeber beschäftigt (auch als Praktikant oder Werkstudent), ist eine sachgrundlose Befristung grundsätzlich unzulässig. Das Bundesarbeitsgericht hat diese Regelung zwar gelockert (nach 3 Jahren Pause möglich), aber die Rechtslage bleibt komplex.</li>
  <li><strong>Kettenbefristung:</strong> Wiederholte Befristungen mit Sachgrund (z. B. immer wieder "Vertretung") können als rechtsmissbräuchlich angesehen werden, wenn sie über Jahre fortgesetzt werden.</li>
  <li><strong>Schriftformerfordernis:</strong> Eine Befristung ist nur wirksam, wenn sie vor Arbeitsbeginn schriftlich vereinbart wurde. Ein mündlich befristeter Vertrag gilt als unbefristet.</li>
</ul>

<h3>Konsequenzen</h3>

<p>Eine unwirksame Befristung führt automatisch zu einem unbefristeten Arbeitsverhältnis (§ 16 TzBfG). Der Arbeitgeber kann dann nur noch ordentlich kündigen — mit allen Konsequenzen des Kündigungsschutzgesetzes. Bei Betrieben ab 10 Mitarbeitern bedeutet das: Sozialauswahl, Kündigungsgründe und unter Umständen Abfindungszahlungen.</p>

<h3>Wie Sie es richtig machen</h3>

<ul>
  <li>Prüfen Sie vor jeder Befristung die Vorbeschäftigung des Kandidaten</li>
  <li>Stellen Sie sicher, dass der befristete Vertrag vor dem ersten Arbeitstag unterschrieben wird</li>
  <li>Dokumentieren Sie den Sachgrund bei sachgrundloser Befristung nicht — es sei denn, es liegt tatsächlich einer vor</li>
  <li>Lassen Sie Befristungsklauseln von einem Arbeitsrechtler prüfen</li>
</ul>

<h2>Fehler 6: Unvollständige Stellenanzeigen — Entgelttransparenzgesetz</h2>

<h3>Gesetzliche Grundlage</h3>

<p>Die EU-Entgelttransparenzrichtlinie (2023/970) verpflichtet alle EU-Mitgliedstaaten zur Umsetzung bis Juni 2026. In Deutschland wird das bestehende Entgelttransparenzgesetz (EntgTranspG) entsprechend erweitert. Die wichtigste Neuerung: Arbeitgeber müssen bereits in der Stellenanzeige das Einstiegsgehalt oder die Gehaltsspanne angeben. Diese Pflicht gilt für alle Unternehmen, unabhängig von der Größe.</p>

<h3>Praxis-Beispiel</h3>

<p>Ein mittelständisches Unternehmen mit 80 Mitarbeitern veröffentlicht eine Stellenanzeige für einen Marketing Manager ohne Gehaltsangabe. Ab Mitte 2026 ist das ein Rechtsverstoß. Der Bewerber hat Anspruch auf Auskunft über die Gehaltsspanne — und das Unternehmen riskiert Bußgelder und Reputationsschäden.</p>

<blockquote>
  <strong>Wichtig:</strong> Auch wenn die Pflicht erst ab 2026 greift, sollten Sie bereits jetzt Gehaltsbänder in Ihre Anzeigen aufnehmen. Studien zeigen, dass Stellenanzeigen mit Gehaltsangabe 30 Prozent mehr qualifizierte Bewerbungen generieren.
</blockquote>

<h3>Konsequenzen</h3>

<p>Neben möglichen Bußgeldern hat die fehlende Gehaltsangabe auch praktische Folgen: Bewerber, die keine Gehaltsinformation sehen, bewerben sich häufiger gar nicht oder brechen den Prozess ab. Das gilt besonders für qualifizierte Fachkräfte, die mehrere Optionen haben und ihre Zeit nicht mit intransparenten Prozessen verschwenden wollen.</p>

<h3>Wie Sie es richtig machen</h3>

<ul>
  <li>Definieren Sie Gehaltsbänder für jede Position</li>
  <li>Geben Sie die Spanne in der Stellenanzeige an (z. B. "55.000 bis 70.000 Euro brutto/Jahr")</li>
  <li>Bereiten Sie sich jetzt auf die Transparenzpflicht vor — warten Sie nicht bis 2026</li>
  <li>Nutzen Sie ein ATS, das Gehaltsfelder in Stellenanzeigen unterstützt</li>
</ul>

<h2>Fehler 7: Fehlerhafte Probezeit-Regelungen</h2>

<h3>Gesetzliche Grundlage</h3>

<p>Die Probezeit wird durch § 622 Abs. 3 BGB geregelt. Sie darf maximal sechs Monate betragen. Während der Probezeit gilt eine verkürzte Kündigungsfrist von zwei Wochen (ohne festen Termin). Ein häufiger Irrtum: Die Probezeit ist kein rechtsfreier Raum. Auch während der Probezeit gelten Kündigungsschutzvorschriften — insbesondere der besondere Kündigungsschutz für Schwangere (§ 17 MuSchG), Schwerbehinderte (§ 168 SGB IX) und Betriebsratsmitglieder (§ 15 KSchG).</p>

<h3>Praxis-Beispiele</h3>

<ul>
  <li><strong>Probezeit über 6 Monate:</strong> Eine vertraglich vereinbarte Probezeit von 9 Monaten ist unwirksam. Es gelten dann die regulären Kündigungsfristen.</li>
  <li><strong>Probezeit bei Befristung:</strong> Bei befristeten Verträgen muss die Probezeit in einem angemessenen Verhältnis zur Vertragsdauer stehen. Bei einem 12-Monats-Vertrag sind 6 Monate Probezeit noch zulässig, bei einem 6-Monats-Vertrag dagegen nicht mehr.</li>
  <li><strong>Kündigung in der Probezeit ohne Grund:</strong> Grundsätzlich kann in der Probezeit ohne Angabe von Gründen gekündigt werden — aber nicht wegen eines AGG-Merkmals. Wird eine schwangere Mitarbeiterin in der Probezeit gekündigt, ist die Kündigung regelmäßig unwirksam.</li>
  <li><strong>Verlängerung der Probezeit:</strong> Eine nachträgliche Verlängerung über sechs Monate hinaus ist unwirksam, selbst wenn beide Seiten zustimmen.</li>
</ul>

<h3>Konsequenzen</h3>

<p>Fehlerhafte Probezeit-Regelungen führen dazu, dass die regulären Kündigungsfristen gelten. Statt zwei Wochen muss der Arbeitgeber dann vier Wochen zum Monatsende einhalten. Bei Verstößen gegen den besonderen Kündigungsschutz drohen Unwirksamkeit der Kündigung und Weiterbeschäftigungsansprüche.</p>

<h3>Wie Sie es richtig machen</h3>

<ul>
  <li>Begrenzen Sie die Probezeit auf maximal 6 Monate</li>
  <li>Passen Sie die Probezeit bei kurzen Befristungen an</li>
  <li>Prüfen Sie vor jeder Probezeit-Kündigung, ob besonderer Kündigungsschutz besteht</li>
  <li>Dokumentieren Sie Leistungsprobleme von Anfang an — auch in der Probezeit</li>
  <li>Nutzen Sie strukturierte Onboarding-Pläne mit festen Feedback-Terminen</li>
</ul>

<h2>Checkliste: Arbeitsrechtliche Compliance im Recruiting</h2>

<p>Verwenden Sie diese Checkliste, um die häufigsten Fehler systematisch zu vermeiden:</p>

<ol>
  <li><strong>Stellenanzeigen:</strong> AGG-konform, geschlechtsneutral, keine Altersindikatoren, Sprachniveau statt Muttersprache, Gehaltsangabe</li>
  <li><strong>Vorstellungsgespräche:</strong> Standardisierter Fragenkatalog, geschulte Interviewer, Dokumentation aller Fragen</li>
  <li><strong>Absagen:</strong> Automatisierte Absagen innerhalb von 14 Tagen, neutrale Formulierung, interne Dokumentation der Gründe</li>
  <li><strong>Datenschutz:</strong> Einwilligung vor Background-Checks, Löschung nach 6 Monaten, Informationspflichten erfüllt</li>
  <li><strong>Befristung:</strong> Vorbeschäftigung geprüft, Schriftform vor Arbeitsbeginn, Sachgrund dokumentiert</li>
  <li><strong>Gehalt:</strong> Gehaltsbänder definiert, Spanne in der Anzeige, Entgelttransparenzgesetz beachtet</li>
  <li><strong>Probezeit:</strong> Maximal 6 Monate, besonderer Kündigungsschutz geprüft, Leistung dokumentiert</li>
</ol>

<h2>Fazit: Compliance ist kein Hindernis, sondern ein Wettbewerbsvorteil</h2>

<p>Arbeitsrechtliche Compliance im Recruiting wird oft als bürokratische Last empfunden. In Wahrheit ist sie ein Wettbewerbsvorteil. Unternehmen, die ihre Stellenanzeigen AGG-konform formulieren, strukturierte Interviews führen und transparente Prozesse haben, gewinnen nicht nur rechtliche Sicherheit — sie gewinnen bessere Kandidaten. Denn Professionalität im Bewerbungsprozess ist das erste Signal, das Sie als Arbeitgeber senden.</p>

<p>Ein modernes ATS wie ShortSelect hilft Ihnen dabei, diese Compliance-Anforderungen systematisch umzusetzen: automatisierte Absagen, dokumentierte Prozesse, DSGVO-konforme Datenhaltung und standardisierte Bewertungskriterien. So schützen Sie sich vor rechtlichen Risiken und bieten gleichzeitig eine professionelle Candidate Experience.</p>
`,
  },
  {
    slug: "karriereseite-erstellen-guide",
    title:
      "Karriereseite erstellen: Der komplette Guide für Unternehmen",
    date: "2025-03-10",
    author: "ShortSelect Team",
    authorRole: "Redaktion",
    category: "Praxis-Guides",
    tags: ["Karriereseite", "Employer Branding", "Jobportal", "SEO"],
    excerpt:
      "Ihre Karriereseite ist das Schaufenster Ihres Recruitings. 67% der Bewerber prüfen sie vor der Bewerbung. So machen Sie sie perfekt.",
    readTime: "8 Min.",
    content: `
<h2>Warum eine eigene Karriereseite unverzichtbar ist</h2>

<p>67 Prozent der Bewerber besuchen die Karriereseite eines Unternehmens, bevor sie sich bewerben. Nicht die LinkedIn-Seite, nicht das StepStone-Profil — die Karriereseite auf Ihrer eigenen Website. Sie ist das digitale Schaufenster Ihres Recruitings und oft der erste ausführliche Kontakt, den ein Kandidat mit Ihrem Unternehmen hat. Und genau hier entscheidet sich, ob er sich bewirbt oder weiterklickt.</p>

<p>Trotzdem behandeln viele Unternehmen ihre Karriereseite als Nebenprojekt. Eine Liste offener Stellen, ein generisches Foto vom Bürogebäude, ein Kontaktformular — fertig. Das reicht nicht. In einem Markt, in dem Fachkräfte sich ihren Arbeitgeber aussuchen können, ist Ihre Karriereseite ein strategisches Werkzeug. Und wie jedes Werkzeug muss es richtig eingesetzt werden.</p>

<h3>Karriereseite vs. Jobbörsen: Warum nicht nur auf externe Plattformen setzen?</h3>

<p>Jobbörsen wie Indeed, StepStone und LinkedIn sind wichtige Reichweitenkanäle. Aber sie haben entscheidende Nachteile:</p>

<ul>
  <li><strong>Keine Kontrolle über die Darstellung:</strong> Auf Jobbörsen sieht jede Stellenanzeige gleich aus. Ihr Employer Branding geht in der Masse unter.</li>
  <li><strong>Hohe Kosten:</strong> Einzelanzeigen kosten zwischen 500 und 1.400 Euro. Bei 20 offenen Stellen summiert sich das schnell auf fünfstellige Beträge pro Monat.</li>
  <li><strong>Abhängigkeit:</strong> Algorithmus-Änderungen bei Indeed oder LinkedIn können Ihre Sichtbarkeit über Nacht halbieren.</li>
  <li><strong>Kein Retargeting:</strong> Besucher Ihrer Karriereseite können Sie mit Retargeting-Kampagnen erneut ansprechen. Besucher auf Jobbörsen nicht.</li>
  <li><strong>Keine Daten:</strong> Auf Ihrer eigenen Seite sehen Sie genau, welche Stellen geklickt werden, wo Bewerber abspringen und welche Kanäle die besten Kandidaten bringen.</li>
</ul>

<blockquote>
  <strong>Faustregel:</strong> Jobbörsen bringen Reichweite, Ihre Karriereseite bringt Conversion. Beides zusammen ergibt eine erfolgreiche Recruiting-Strategie.
</blockquote>

<h2>Must-Have-Elemente einer professionellen Karriereseite</h2>

<h3>1. Aktuelle Stellenanzeigen</h3>

<p>Das Kernstück jeder Karriereseite. Ihre offenen Stellen müssen prominent, aktuell und leicht auffindbar sein. Jede Stelle sollte eine eigene Detailseite haben mit Aufgabenbeschreibung, Anforderungsprofil, Benefits und einem klaren Call-to-Action. Veraltete Stellenanzeigen sind Gift: Wenn ein Bewerber sich auf eine Stelle bewirbt, die längst besetzt ist, verlieren Sie sein Vertrauen.</p>

<ul>
  <li>Stellen nach Abteilung, Standort und Beschäftigungsart filterbar machen</li>
  <li>Suchfunktion anbieten</li>
  <li>Gehaltsangabe integrieren (ab 2026 Pflicht, aber schon jetzt ein Wettbewerbsvorteil)</li>
  <li>Stellen automatisch synchronisieren — manuelles Kopieren von Anzeigen führt zu Fehlern</li>
</ul>

<h3>2. Über uns: Wer Sie sind und wofür Sie stehen</h3>

<p>Bewerber wollen wissen, bei wem sie sich bewerben. Ein kurzer Abschnitt über Ihre Unternehmensgeschichte, Mission und Werte ist Pflicht. Aber bitte authentisch — generische Sätze wie "Wir sind ein innovatives Unternehmen mit flachen Hierarchien" sagen nichts aus. Zeigen Sie konkret, was Sie anders machen.</p>

<h3>3. Team und Kultur</h3>

<p>Menschen bewerben sich bei Menschen, nicht bei Unternehmen. Zeigen Sie Ihr Team: echte Fotos, keine Stock-Bilder. Stellen Sie einzelne Teammitglieder vor, lassen Sie sie in kurzen Zitaten erzählen, warum sie gerne bei Ihnen arbeiten. Ein Video, in dem Mitarbeiter ihren Arbeitsalltag zeigen, wirkt stärker als jede Hochglanz-Broschüre.</p>

<h3>4. Benefits und Arbeitgeberleistungen</h3>

<p>Gehalt ist wichtig, aber nicht alles. Listen Sie Ihre Benefits klar und konkret auf:</p>

<ul>
  <li>Flexible Arbeitszeiten und Home-Office-Regelungen</li>
  <li>Weiterbildungsbudget (konkreter Betrag, nicht "Weiterbildungsmöglichkeiten")</li>
  <li>Gesundheitsangebote</li>
  <li>Betriebliche Altersvorsorge</li>
  <li>Zuschüsse (ÖPNV, Fitnessstudio, Kinderbetreuung)</li>
  <li>Teamevents und Firmenfeiern</li>
</ul>

<p>Wichtig: Seien Sie konkret. "30 Tage Urlaub" sagt mehr als "attraktive Urlaubsregelung". "2.000 Euro Weiterbildungsbudget pro Jahr" wirkt glaubwürdiger als "vielfältige Entwicklungsmöglichkeiten".</p>

<h3>5. Der Bewerbungsprozess</h3>

<p>Transparenz schafft Vertrauen. Erklären Sie in drei bis fünf Schritten, wie Ihr Bewerbungsprozess abläuft: Von der Bewerbung bis zur Vertragsunterschrift. Geben Sie Zeitrahmen an ("Sie erhalten innerhalb von 5 Werktagen eine Rückmeldung"). Bewerber, die wissen, was sie erwartet, brechen seltener ab.</p>

<h3>6. Kontakt und Ansprechpartner</h3>

<p>Benennen Sie einen konkreten Ansprechpartner mit Foto, Name, Telefonnummer und E-Mail-Adresse. Ein anonymes "bewerbung@firma.de" wirkt unpersönlich. Ein Gesicht und ein Name senken die Hemmschwelle zur Kontaktaufnahme erheblich.</p>

<h2>SEO für Karriereseiten: Gefunden werden bei Google</h2>

<h3>Google for Jobs</h3>

<p>Seit 2019 zeigt Google Stellenanzeigen direkt in den Suchergebnissen an — in einem eigenen Widget oberhalb der organischen Ergebnisse. Um dort zu erscheinen, müssen Ihre Stellenanzeigen strukturierte Daten im JSON-LD-Format enthalten. Die wichtigsten Felder:</p>

<ul>
  <li><strong>title:</strong> Jobtitel</li>
  <li><strong>description:</strong> Vollständige Stellenbeschreibung in HTML</li>
  <li><strong>datePosted:</strong> Veröffentlichungsdatum</li>
  <li><strong>validThrough:</strong> Ablaufdatum der Anzeige</li>
  <li><strong>employmentType:</strong> Vollzeit, Teilzeit, Minijob etc.</li>
  <li><strong>hiringOrganization:</strong> Name, URL und Logo des Unternehmens</li>
  <li><strong>jobLocation:</strong> Standort mit Adresse</li>
  <li><strong>baseSalary:</strong> Gehaltsangabe (optional, aber empfohlen)</li>
</ul>

<p>Ein ATS wie ShortSelect generiert diese strukturierten Daten automatisch für jede Stelle, die Sie veröffentlichen. So erscheinen Ihre Anzeigen ohne manuellen Aufwand bei Google for Jobs.</p>

<h3>On-Page-SEO</h3>

<p>Neben den strukturierten Daten gelten die klassischen SEO-Regeln:</p>

<ul>
  <li><strong>Title Tags:</strong> Jede Stellenanzeige braucht einen individuellen Title Tag mit Jobtitel und Standort (z. B. "Marketing Manager (m/w/d) in München | Firma GmbH")</li>
  <li><strong>Meta Description:</strong> 150 bis 160 Zeichen mit den wichtigsten Informationen und einem Call-to-Action</li>
  <li><strong>URL-Struktur:</strong> Sprechende URLs wie /karriere/marketing-manager-muenchen statt /jobs?id=4823</li>
  <li><strong>Überschriften:</strong> H1 für den Jobtitel, H2 für Abschnitte wie Aufgaben, Anforderungen, Benefits</li>
  <li><strong>Interne Verlinkung:</strong> Von der Karriereseite auf relevante Unterseiten verlinken (Team, Benefits, Standorte)</li>
</ul>

<h2>Mobile-Optimierung: Pflicht, nicht Kür</h2>

<p>Über 60 Prozent der Jobsuchenden nutzen ihr Smartphone für die Stellensuche. Wenn Ihre Karriereseite auf dem Handy nicht funktioniert, verlieren Sie die Mehrheit Ihrer potenziellen Bewerber. Mobile-Optimierung bedeutet:</p>

<ul>
  <li><strong>Responsive Design:</strong> Die Seite passt sich automatisch an jede Bildschirmgröße an</li>
  <li><strong>Schnelle Ladezeiten:</strong> Unter 3 Sekunden auf mobilem Netz. Komprimierte Bilder, minimales JavaScript</li>
  <li><strong>Touch-freundliche Buttons:</strong> Mindestens 44x44 Pixel für alle klickbaren Elemente</li>
  <li><strong>Mobiles Bewerbungsformular:</strong> Maximal 3 bis 5 Felder auf dem Smartphone. Kein Anschreiben-Upload auf dem Handy erzwingen</li>
  <li><strong>Click-to-Call:</strong> Telefonnummer als klickbarer Link</li>
</ul>

<blockquote>
  <strong>Test:</strong> Öffnen Sie Ihre Karriereseite auf dem Smartphone und versuchen Sie, sich in unter 2 Minuten zu bewerben. Wenn das nicht möglich ist, haben Sie ein Problem.
</blockquote>

<h2>Karriereseite vs. ATS-Widget vs. iFrame</h2>

<p>Es gibt verschiedene technische Ansätze, um Stellenanzeigen auf Ihrer Website zu integrieren. Jeder hat Vor- und Nachteile:</p>

<h3>Eigene Karriereseite (Custom Build)</h3>

<ul>
  <li><strong>Vorteile:</strong> Volle Kontrolle über Design und UX, optimales SEO, nahtlose Integration in die Website</li>
  <li><strong>Nachteile:</strong> Hoher Entwicklungsaufwand, manuelle Pflege der Stellenanzeigen, keine automatische Synchronisation</li>
  <li><strong>Geeignet für:</strong> Große Unternehmen mit eigener IT-Abteilung</li>
</ul>

<h3>ATS-Widget (empfohlen)</h3>

<ul>
  <li><strong>Vorteile:</strong> Automatische Synchronisation aller Stellen, integriertes Bewerbungsformular, SEO-optimiert, einfache Einbindung per JavaScript-Snippet, Design anpassbar an die Unternehmens-CI</li>
  <li><strong>Nachteile:</strong> Design-Anpassungen sind begrenzt (aber ausreichend für die meisten Unternehmen)</li>
  <li><strong>Geeignet für:</strong> Kleine und mittlere Unternehmen, Personalvermittler</li>
</ul>

<h3>iFrame</h3>

<ul>
  <li><strong>Vorteile:</strong> Einfachste Einbindung</li>
  <li><strong>Nachteile:</strong> Schlecht für SEO (Google indexiert iFrame-Inhalte nicht zuverlässig), Probleme mit responsivem Design, kein Deep-Linking auf einzelne Stellen, Sicherheitsbedenken</li>
  <li><strong>Geeignet für:</strong> Notlösung, wenn keine andere Option möglich ist</li>
</ul>

<p>ShortSelect bietet ein Job-Widget, das Sie per JavaScript-Snippet in jede Website einbinden können. Es synchronisiert automatisch alle offenen Stellen, passt sich an Ihr Design an und liefert strukturierte Daten für Google for Jobs mit.</p>

<h2>Content, der überzeugt</h2>

<h3>Echte Fotos statt Stock-Bilder</h3>

<p>Bewerber erkennen Stock-Bilder sofort. Ein lächelndes Team vor einem MacBook in einem lichtdurchfluteten Büro — das wirkt nicht authentisch, das wirkt austauschbar. Investieren Sie einen halben Tag in ein professionelles Fotoshooting. Zeigen Sie echte Arbeitsplätze, echte Kollegen, echte Situationen. Auch Smartphone-Fotos können funktionieren, wenn sie authentisch sind.</p>

<h3>Mitarbeiterstimmen und Testimonials</h3>

<p>Nichts überzeugt mehr als die Perspektive der eigenen Mitarbeiter. Kurze Zitate, Video-Interviews oder "Ein Tag bei uns"-Formate geben Bewerbern einen echten Einblick. Wichtig: Lassen Sie die Mitarbeiter in ihren eigenen Worten sprechen. Gescriptete Testimonials wirken unnatürlich.</p>

<h3>Videos</h3>

<p>Videos auf Karriereseiten erhöhen die Verweildauer um durchschnittlich 80 Prozent. Sie müssen nicht perfekt produziert sein. Ein authentisches 60-Sekunden-Video, in dem ein Teammitglied seinen Arbeitsalltag zeigt, wirkt stärker als ein hochglanzpoliertes Imagefilm. Mögliche Formate:</p>

<ul>
  <li>Büro-Tour (30 bis 60 Sekunden)</li>
  <li>Mitarbeiter-Interview (2 bis 3 Minuten)</li>
  <li>"Ein Tag bei uns" (3 bis 5 Minuten)</li>
  <li>Kurze Reels für Social Media (15 bis 30 Sekunden)</li>
</ul>

<h2>Fehler, die Sie vermeiden sollten</h2>

<ol>
  <li><strong>Veraltete Stellenanzeigen:</strong> Nichts ist schlimmer als eine Bewerbung auf eine Stelle, die längst besetzt ist. Automatisieren Sie die Synchronisation.</li>
  <li><strong>Kein mobiles Design:</strong> Über 60 Prozent der Jobsuchenden nutzen das Smartphone. Testen Sie jede Änderung auf dem Handy.</li>
  <li><strong>Stock-Bilder:</strong> Bewerber erkennen sie sofort. Investieren Sie in echte Fotos.</li>
  <li><strong>Zu viele Klicks bis zur Bewerbung:</strong> Die Bewerbung sollte von jeder Stellenanzeige aus mit maximal einem Klick erreichbar sein.</li>
  <li><strong>Fehlendes Tracking:</strong> Ohne Analytics wissen Sie nicht, welche Stellen funktionieren und welche nicht.</li>
  <li><strong>Kein SEO:</strong> Ohne strukturierte Daten und saubere Meta Tags verschenken Sie organische Reichweite.</li>
  <li><strong>Generische Texte:</strong> "Wir sind innovativ und haben flache Hierarchien" sagt jeder. Zeigen Sie, was Sie wirklich anders machen.</li>
</ol>

<h2>Conversion-Optimierung: Vom Besucher zum Bewerber</h2>

<h3>Bewerbungsformular kürzen</h3>

<p>Jedes zusätzliche Feld im Bewerbungsformular reduziert die Conversion Rate um 5 bis 10 Prozent. Die Pflichtfelder sollten sich auf das Wesentliche beschränken:</p>

<ul>
  <li>Name</li>
  <li>E-Mail</li>
  <li>Telefon (optional)</li>
  <li>Lebenslauf-Upload</li>
  <li>Kurznachricht (optional)</li>
</ul>

<p>Verzichten Sie auf Anschreiben-Pflicht. 78 Prozent der Bewerber empfinden Anschreiben als überflüssig, und immer mehr Unternehmen — darunter die Deutsche Bahn und Siemens — haben sie abgeschafft.</p>

<h3>One-Click-Bewerbung</h3>

<p>Die Zukunft der Bewerbung ist der One-Click-Apply: Der Bewerber verbindet sein LinkedIn- oder Xing-Profil, die Daten werden automatisch übernommen, und mit einem Klick ist die Bewerbung abgeschickt. Das reduziert die Abbruchrate drastisch — besonders auf dem Smartphone, wo das Ausfüllen langer Formulare eine Qual ist.</p>

<h3>Weitere Conversion-Hebel</h3>

<ul>
  <li><strong>Prominenter CTA:</strong> Der "Jetzt bewerben"-Button muss auf jeder Stellenanzeige sofort sichtbar sein — ohne Scrollen</li>
  <li><strong>Ladezeit:</strong> Jede Sekunde Verzögerung kostet 7 Prozent Conversion</li>
  <li><strong>Social Proof:</strong> Bewertungen auf kununu oder Glassdoor verlinken, Auszeichnungen anzeigen</li>
  <li><strong>Jobagent:</strong> Besucher, die keine passende Stelle finden, können sich für einen Job-Alert registrieren</li>
  <li><strong>Initiativbewerbung:</strong> Bieten Sie immer die Möglichkeit einer Initiativbewerbung an — so verlieren Sie keine Talente, nur weil gerade keine passende Stelle offen ist</li>
</ul>

<h2>Fazit: Ihre Karriereseite als strategisches Recruiting-Tool</h2>

<p>Eine professionelle Karriereseite ist kein Nice-to-have, sondern ein strategisches Werkzeug im Recruiting. Sie gibt Ihnen die Kontrolle über Ihre Arbeitgebermarke, senkt die Abhängigkeit von teuren Jobbörsen und bietet Bewerbern ein Erlebnis, das Vertrauen schafft. Die Investition lohnt sich: Unternehmen mit optimierten Karriereseiten berichten von 40 Prozent mehr qualifizierten Bewerbungen und einer um 25 Prozent kürzeren Time-to-Hire.</p>

<p>Beginnen Sie mit den Grundlagen — aktuelle Stellen, echte Fotos, mobiles Design — und optimieren Sie dann schrittweise: SEO, strukturierte Daten, Conversion-Optimierung. Mit einem ATS wie ShortSelect können Sie Ihre Karriereseite über ein einfaches Job-Widget einbinden und alle Bewerbungen zentral verwalten. So wird Ihre Website zum stärksten Recruiting-Kanal.</p>
`,
  },
];
