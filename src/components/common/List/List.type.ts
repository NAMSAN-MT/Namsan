import { SubCategory } from './List';

export type MainCategoryType = {
  id: string;
  name: string;
  children?: ReturnType<typeof SubCategory>[];
  language?: string;
};

export type SubCategoryType = {
  sub_id: string;
  name: string;
};
