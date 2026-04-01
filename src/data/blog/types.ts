export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  content: string;
}

export const blogCategories = [
  "Alle",
  "Recruiting-Wissen",
  "KI & Automatisierung",
  "Trends & Studien",
  "Praxis-Guides",
  "DSGVO & Compliance",
  "Employer Branding",
] as const;
