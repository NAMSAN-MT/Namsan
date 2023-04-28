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
  description: { key: `C${number}` | `S${number}`; val: string }[];
  imagePath: string;
  member: {
    main: string[];
    sub: string[];
  };
}
