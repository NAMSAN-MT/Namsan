import { News } from '@Interface/api.interface';
import { EndPointType, NewsType, TQuery } from '@Type/api.type';
import { documentId } from 'firebase/firestore';
import { index } from './algolia';
import { GetDataListQuery } from './index.api';

export const getMainNewsList = async (limit: number) => {
  const endPoint: EndPointType = 'news';
  const queries: TQuery[] = [];

  queries.push({
    queryType: 'orderby',
    fieldPath: 'date',
    directionStr: 'desc',
    limit: 3,
  });

  const result = await GetDataListQuery<News>({ endPoint, queries });

  return result.map(news => ({
    ...news,
    dateYearMonth: `${news.date.toDate().getFullYear()}.${
      news.date.toDate().getMonth() < 9
        ? `0${news.date.toDate().getMonth()}`
        : news.date.toDate().getMonth()
    }`,
  }));
};

interface INewSearchListRequest {
  newsType: NewsType;
  searchValue?: string;
  page?: number;
}
export const getNewsSearchList = (param: INewSearchListRequest) => {
  const { searchValue = '', page } = param;
  const newsTypeFilter =
    param.newsType !== 'all' ? { filters: `newsType:${param.newsType}` } : {};

  return index
    .search(searchValue, {
      ...newsTypeFilter,
      page,
      hitsPerPage: 9,
    })
    .then(async algoliaResult => {
      const ids = algoliaResult.hits.map(
        (hit: any) => hit.documentId as string,
      );
      const newDataList = await getNewsIdDataList(ids);
      const resultList = newDataList.map(news => ({
        ...news,
        dateYearMonth: `${news.date.toDate().getFullYear()}.${
          news.date.toDate().getMonth() < 9
            ? `0${news.date.toDate().getMonth()}`
            : news.date.toDate().getMonth()
        }`,
      }));
      return { resultList, algoliaResult };
    })
    .catch(err => {
      console.error('## search error:', err);
      return { resultList: [], algoliaResult: undefined };
    });
};

export const getNewsIdDataList = async (ids: string[]) => {
  const endPoint: EndPointType = 'news';
  const queries: TQuery[] = [
    {
      queryType: 'where',
      fieldPath: documentId(),
      opStr: 'in',
      value: ids,
    },
  ];

  return await GetDataListQuery<News>({
    endPoint,
    queries,
  });
};
