export interface Category {
  categoryId: `C${number}`;
  name: string;
  category: SubCategory[];
}

export interface SubCategory {
  categoryId: `S${number}`;
  name: string;
}
