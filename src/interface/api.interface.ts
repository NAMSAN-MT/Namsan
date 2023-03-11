import { Timestamp } from 'firebase/firestore';

export interface News {
  title: string;
  content: string;
  date: Timestamp;
  agency: string;
  originalLink: string;
}

export interface Category {
  id: `C${number}`;
  name: string;
  category: SubCategory[];
}

export interface SubCategory {
  id: `S${number}`;
  name: string;
}
