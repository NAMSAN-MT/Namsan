import { NewsType } from '@Type/api.type';
import { isEmpty } from 'lodash';

export const toQuery = (newsType: NewsType, page?: number) => {
  const toNewsType =
    newsType === 'all' || isEmpty(newsType) ? '' : `newsType=${newsType}&`;
  const toPage = page ? `page=${page}` : '';
  return `?${toNewsType}${toPage}`;
};
