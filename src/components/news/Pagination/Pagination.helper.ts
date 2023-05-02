import { PaginationProps } from './Pagination.interface';
import { NewsType } from '@Type/api.type';
import { isEmpty } from 'lodash';
import { URLSearchParams } from 'url';

export const getPageNationState = ({
  pageNationState,
  urlPage,
}: PaginationProps) => {
  const currentPage = Number(urlPage) || pageNationState.page || 1;
  return { ...pageNationState, currentPage };
};

export const getPageList = (length: number) => Array.from({ length });

export const toQuery = (newsType: NewsType, page?: number) => {
  const toNewsType =
    newsType === 'all' || isEmpty(newsType) ? '' : `newsType=${newsType}&`;
  const toPage = page ? `page=${page}` : '';
  return `?${toNewsType}${toPage}`;
};

export const getNewQueryString = (params: URLSearchParams, page: number) => {
  params.set('page', String(page));
  return String(params);
};
