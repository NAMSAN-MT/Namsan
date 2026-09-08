import { NewsMin } from '@Interface/api.interface';

export type TTab = 'all' | 'media' | 'recent';
/** 목록 정렬 방향. `date` 기준 내림차순(최신순)이 기본. */
export type TSort = 'asc' | 'desc';
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
