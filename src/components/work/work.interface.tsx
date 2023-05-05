export interface Category {
  names: string[];
}

export interface SubCategory {
  categoryId: `S${number}`;
  name: string;
}

export interface CategoryDescription {
  categoryTitle: string;
  description: string;
  isOpen?: boolean;
}

export interface CategoryPageProps {
  categoryId: string;
  imagePath: string;
  description: string[];
  language: 'ko' | 'en';
  member: { sub: string[]; main: string[] };
  categoryInfo: string[];
}
