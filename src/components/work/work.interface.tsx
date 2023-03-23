import { CommonPage } from '@Interface/api.interface';

export interface Category extends CommonPage {
  categoryId: `C${number}`;
  name: string;
  subCategory: SubCategory[];
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
  categoryInfo: Category;
  description: Record<string, string>;
}
