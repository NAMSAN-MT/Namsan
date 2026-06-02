import { PaginationProps } from './Pagination.interface';
import { NewsType } from '@Type/api.type';
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
export const toQuery = (locale: string, newsType: NewsType, page?: number) => {
  const params = new URLSearchParams();
  if (!isEmpty(newsType) && newsType !== 'all')
    params.set('newsType', newsType);
  if (page) params.set('page', String(page));
  const qs = params.toString();
  return `/${locale}/news/${qs ? `?${qs}` : ''}`;
};
