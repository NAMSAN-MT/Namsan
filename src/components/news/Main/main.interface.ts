import { NewsMin } from '@Interface/api.interface';

export type TTab = 'all' | 'media' | 'recent';
export type TPagination = { nbPages: number; page: number };

/**
 * Build-time news index item. Mirrors `NewsMin` (the shape Card renders) plus a
 * `content` field used only for client-side Fuse.js search. `dateYearMonth` is a
 * pre-formatted string so the index serializes into `__NEXT_DATA__` (no Timestamp).
 */
export type TNewsListItem = Omit<NewsMin, 'date'> & {
  documentId: string;
  content: string;
};
