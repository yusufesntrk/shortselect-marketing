// Zielliste: ATS-, Recruiting-CRM- und HR-Software-Anbieter mit Content-Marketing.
// gruppe: dach_agentur = direkte Rivalen im Agentur-/Headhunter-Segment DACH
//         dach_hr      = DACH-ATS/HR-Suiten
//         intl_agentur = internationale Staffing-/Agency-ATS
//         intl_ats     = internationale ATS mit starkem SEO-Output
//
// quelle: 'sitemap' (Standard) | 'listing' (HTML-Uebersicht durchblaettern)
// Pfade stammen aus der Sitemap-Inspektion, nicht aus Annahmen.

export const TARGETS = [
  // --- DACH, Agentur / Headhunter -----------------------------------------
  { key: 'starhunter', name: 'Starhunter', host: 'www.starhunter.de', gruppe: 'dach_agentur',
    quelle: 'listing', pfad: /^\/blog\/[^/]+$/,
    listing: { seed: 'https://www.starhunter.de/blog', seite: (i) => `https://www.starhunter.de/blog?start=${i * 10}`, maxSeiten: 25 },
    hinweis: 'Blog umfasst real nur ~10 Beitraege, keine Paginierung vorhanden' },

  { key: 'coveto', name: 'Coveto', host: 'www.coveto.de', gruppe: 'dach_agentur', pfad: /\/(blog|news|ratgeber)\// },

  { key: 'zvoove', name: 'zvoove', host: 'zvoove.com', gruppe: 'dach_agentur', pfad: /\/news\//,
    sitemaps: ['https://zvoove.com/sitemaps.xml'] },

  { key: 'erecruiter', name: 'eRecruiter', host: 'www.erecruiter.net', gruppe: 'dach_agentur', pfad: /\/(blog|news|wissen)\// },

  { key: 'yena', name: 'Yena', host: 'www.yena.ai', gruppe: 'dach_agentur', pfad: /\/(blog|resources|ressourcen)\// },

  { key: 'sprad', name: 'Sprad', host: 'sprad.io', gruppe: 'dach_agentur', pfad: /\/(blog|magazin|wissen)\// },

  { key: 'leonar', name: 'Leonar', host: 'www.leonar.app', gruppe: 'dach_agentur', pfad: /\/(blog|resources)\// },

  // --- DACH, ATS / HR-Suiten ----------------------------------------------
  { key: 'softgarden', name: 'softgarden', host: 'www.softgarden.com', gruppe: 'dach_hr', pfad: /\/(blog|hr-lexikon|ressourcen|wissen)\// },

  // onlyfy hat keine Sitemap und keine WP-REST-Route; der Ratgeber-Feed kann aber ?paged=N.
  { key: 'onlyfy', name: 'onlyfy by XING', host: 'onlyfy.com', gruppe: 'dach_hr',
    quelle: 'feed', pfad: /^\/de\/ratgeber\/[^/]+\/?$/,
    feed: { seite: (i) => `https://onlyfy.com/de/ratgeber/feed/?paged=${i}`, maxSeiten: 60 } },

  { key: 'personio', name: 'Personio', host: 'www.personio.de', gruppe: 'dach_hr', pfad: /\/(blog|hr-lexikon|artikel)\// },

  { key: 'dvinci', name: 'd.vinci', host: 'www.dvinci.de', gruppe: 'dach_hr', pfad: /\/(recruitingspot|news)\//,
    sitemaps: ['https://www.dvinci.de/sitemap_index.xml'] },

  { key: 'rexx', name: 'rexx systems', host: 'www.rexx-systems.com', gruppe: 'dach_hr', pfad: /\/(blog|hr-lexikon|wissen|news)\// },

  { key: 'recruitee', name: 'Recruitee', host: 'recruitee.com', gruppe: 'dach_hr', pfad: /\/(blog|artikel|articles)\// },

  { key: 'join', name: 'JOIN', host: 'join.com', gruppe: 'dach_hr', pfad: /\/(blog|recruitment-hr-blog|hr-lexikon)\// },

  // concludis ist zu Helix (Perbility) geworden; Inhalte liegen als Glossar, nicht als Blog.
  { key: 'helix', name: 'Helix (vormals concludis)', host: 'www.mein-helix.de', gruppe: 'dach_hr', pfad: /\/wiki\/glossar\//,
    sitemaps: ['https://www.mein-helix.de/de/sitemap.xml'], hinweis: 'Glossar statt Blog' },

  { key: 'talention', name: 'Talention', host: 'www.talention.de', gruppe: 'dach_hr', pfad: /\/(blog|ratgeber|wissen)\// },

  { key: 'guidecom', name: 'GuideCom', host: 'www.guidecom.de', gruppe: 'dach_hr', pfad: /\/hr-blog\// },

  { key: 'factorial', name: 'Factorial', host: 'factorialhr.de', gruppe: 'dach_hr', pfad: /\/(blog|hr-lexikon)\// },

  // --- International, Agentur / Staffing ----------------------------------
  { key: 'bullhorn', name: 'Bullhorn', host: 'www.bullhorn.com', gruppe: 'intl_agentur', pfad: /\/(blog|blogs)\// },

  { key: 'vincere', name: 'Vincere', host: 'www.vincere.io', gruppe: 'intl_agentur', pfad: /\/(blog|resources)\//,
    hinweis: 'Cloudflare-Challenge, Browser noetig' },

  { key: 'recruiterflow', name: 'Recruiterflow', host: 'recruiterflow.com', gruppe: 'intl_agentur', pfad: /\/blog\//,
    sitemaps: ['https://recruiterflow.com/blog/sitemap_index.xml'] },

  { key: 'manatal', name: 'Manatal', host: 'www.manatal.com', gruppe: 'intl_agentur', pfad: /\/(blog|resources)\// },

  { key: 'loxo', name: 'Loxo', host: 'loxo.co', gruppe: 'intl_agentur', pfad: /\/(blog|resources)\// },

  { key: 'jobadder', name: 'JobAdder', host: 'jobadder.com', gruppe: 'intl_agentur', pfad: /\/(blog|resources)\// },

  { key: 'crelate', name: 'Crelate', host: 'www.crelate.com', gruppe: 'intl_agentur', pfad: /\/(blog|resources)\// },

  { key: 'recruitcrm', name: 'Recruit CRM', host: 'recruitcrm.io', gruppe: 'intl_agentur', pfad: /\/(blog|blogs|resources)\// },

  // --- International, ATS mit starkem SEO-Output --------------------------
  { key: 'workable', name: 'Workable', host: 'resources.workable.com', gruppe: 'intl_ats', pfad: /\// },
  { key: 'greenhouse', name: 'Greenhouse', host: 'www.greenhouse.com', gruppe: 'intl_ats', pfad: /\/(blog|resources)\// },
  { key: 'lever', name: 'Lever', host: 'www.lever.co', gruppe: 'intl_ats', pfad: /\/(blog|resources)\// },
  { key: 'teamtailor', name: 'Teamtailor', host: 'www.teamtailor.com', gruppe: 'intl_ats', pfad: /\/(blog|learning-center|resources)\// },
  { key: 'smartrecruiters', name: 'SmartRecruiters', host: 'www.smartrecruiters.com', gruppe: 'intl_ats', pfad: /\/(blog|resources)\// },
  { key: 'ashby', name: 'Ashby', host: 'www.ashbyhq.com', gruppe: 'intl_ats', pfad: /\/(blog|resources)\// },
  { key: 'pinpoint', name: 'Pinpoint', host: 'www.pinpointhq.com', gruppe: 'intl_ats', pfad: /\/(insights|how-to-series|templates-and-tools|guides)\// },
  { key: 'breezy', name: 'Breezy HR', host: 'breezy.hr', gruppe: 'intl_ats', pfad: /\/blog\// },
];

export const GRUPPEN_LABEL = {
  dach_agentur: 'DACH, Agentur/Headhunter',
  dach_hr: 'DACH, ATS/HR-Suite',
  intl_agentur: 'International, Staffing/Agency',
  intl_ats: 'International, ATS',
};
