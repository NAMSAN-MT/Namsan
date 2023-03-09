import { Timestamp } from 'firebase/firestore';

export interface News {
  title: string;
  content: string;
  date: Timestamp;
  agency: string;
  originalLink: string;
}
