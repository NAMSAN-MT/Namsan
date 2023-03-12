import { Timestamp } from 'firebase/firestore';

export interface News {
  title: string;
  content: string;
  date: Timestamp;
  agency: string;
  originalLink: string;
  newsType: 'media' | 'recent';
  dateYearMonth?: string;
}

export interface MemberAttribute {
  value: string;
  time?: string;
}

export interface Member {
  id: number;
  language: 'ko' | 'en';
  name: string;
  position: string;
  email: string;
  businessFields: string[];
  description?: string;
  educations?: MemberAttribute[];
  careers: MemberAttribute[];
  papers?: MemberAttribute[];
  awards?: MemberAttribute[];
  imagePath: string;
}
