export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  excerpt: string;
  seoDescription?: string;
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
