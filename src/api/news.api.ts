import { News } from '@Interface/api.interface';
import { EndPointType, NewsType, TQuery } from '@Type/api.type';
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
}
export const getNewsSearchList = async (param: INewSearchListRequest) => {
  const endPoint: EndPointType = 'news';
  const queries: TQuery[] = [];
  if (param.newsType !== 'all') {
    queries.push({
      queryType: 'where',
      fieldPath: 'newsType',
      opStr: '==',
      value: param.newsType,
    });
  }

  queries.push({
    queryType: 'orderby',
    fieldPath: 'date',
    directionStr: 'desc',
    limit: 9,
  });

  const result = await GetDataListQuery<News>({
    endPoint,
    queries,
    fullTextSearch: param.searchValue,
  });

  return result.map(news => ({
    ...news,
    dateYearMonth: `${news.date.toDate().getFullYear()}.${
      news.date.toDate().getMonth() < 9
        ? `0${news.date.toDate().getMonth()}`
        : news.date.toDate().getMonth()
    }`,
  }));
};
