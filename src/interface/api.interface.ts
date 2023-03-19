import { Timestamp } from 'firebase/firestore';

export interface News {
  title: string;
  content: string;
  date: Timestamp;
  agency: string;
  originalLink: string;
}

export interface IMemberAttribute {
  value: string;
  time?: string;
}

export interface IMember {
  id: number;
  language: 'ko' | 'en';
  name: string;
  position: string;
  email: string;
  businessFields: string[];
  description?: string;
  educations?: IMemberAttribute[];
  careers: IMemberAttribute[];
  papers?: IMemberAttribute[];
  awards?: IMemberAttribute[];
  imagePath: string;
}
