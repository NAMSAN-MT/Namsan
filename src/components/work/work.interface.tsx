export interface Category {
  names: string[];
}

export interface SubCategory {
  categoryId: `S${number}`;
  name: string;
}

export interface CategoryDescription {
  categoryId: `C${number}` | `S${number}`;
  name: string;
  description: string;
}

export interface CategoryPageProps {
  categoryId: string;
  imagePath: string;
  description: string[];
  language: 'ko' | 'en';
  member: { sub: string[]; main: string[] };
  categoryInfo: string[];
}
