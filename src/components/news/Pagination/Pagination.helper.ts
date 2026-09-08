import { PaginationProps } from './Pagination.interface';
import { NewsType } from '@Type/api.type';
import { TSort } from '../Main/main.interface';
import { isEmpty } from 'lodash';

export const getPageNationState = ({
  pageNationState,
  urlPage,
}: PaginationProps) => {
  const currentPage = Number(urlPage) || pageNationState.page || 1;
  return { ...pageNationState, currentPage };
};

export const getPageList = (length: number) => Array.from({ length });

// Build a fully-resolved path (locale substituted, trailingSlash honored) so the
// Next client router never tries to load static props for the un-substituted
// `[locale]` route template. Pair with shallow routing on the consumer side.
// `sort`는 기본값(desc = 최신순)일 때 URL에 넣지 않는다 — 공유 링크가 깔끔하고,
// Main.hook이 `sort !== 'asc'`를 desc로 읽으므로 왕복해도 동일하게 해석된다.
export const toQuery = (
  locale: string,
  newsType: NewsType,
  page?: number,
  sort?: TSort,
) => {
  const params = new URLSearchParams();
  if (!isEmpty(newsType) && newsType !== 'all')
    params.set('newsType', newsType);
  if (page) params.set('page', String(page));
  if (sort === 'asc') params.set('sort', sort);
  const qs = params.toString();
  return `/${locale}/news/${qs ? `?${qs}` : ''}`;
};
