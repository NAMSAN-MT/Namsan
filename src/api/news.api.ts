import { News, Parameter } from '@Interface/api.interface';
import { NewsRequest, QueryWhereOptions } from '@Type/api.type';
import {
  GetData,
  GetDataListQueryOrderBy,
  GetDataListQuery,
  getTimestampToDate,
} from './index.api';

export const getNews = async (param: NewsRequest) => {
  return await GetData<Parameter, News>({ endPoint: 'news', param });
};

export const getNewsList = async (param?: NewsRequest) => {
  return await GetDataListQuery<Parameter, News[]>({
    endPoint: 'news',
    param,
  }).then(getResultNewsList);
};

export const getMainNewsList = async (limit: number) => {
  const param = {
    queryType: 'orderby',
    fieldPath: 'date',
    directionStr: 'asc',
    limit,
  };

  const result = await GetDataListQueryOrderBy<Parameter, News[]>({
    endPoint: 'news',
    param,
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

const getResultNewsList = (doc: News[]) =>
  doc.map(news => ({
    ...news,
    date: getTimestampToDate(news.date),
  }));

interface INewSearchListRequest {
  limit: number;
  conditions?: QueryWhereOptions[];
}
export const getNewsSearchList = async ({
  limit,
  conditions,
}: INewSearchListRequest) => {
  const param = {
    orderBy: {
      fieldPath: 'date',
      directionStr: 'desc',
      limit,
    },
    conditions,
  };

  const result = await GetDataListQuery<Parameter, News[]>({
    endPoint: 'news',
    param,
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
