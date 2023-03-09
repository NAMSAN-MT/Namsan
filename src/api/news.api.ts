import { News } from '../interface/api.interface';
import { NewsRequest } from '../type/api.type';
import {
  GetData,
  GetDataListQueryOrderBy,
  GetDataListQueryWhere,
  getTimestampToDate,
  Parameter,
} from './index.api';

export const getNews = async (param: NewsRequest) => {
  return await GetData<Parameter, News>({ endPoint: 'news', param });
};

export const getNewsList = async (param?: NewsRequest) => {
  return await GetDataListQueryWhere<Parameter, News[]>({
    endPoint: 'news',
    param,
  }).then(getResultNewsList);
};

export const getMainNewsList = async () => {
  const param = {
    queryType: 'orderby',
    fieldPath: 'date',
    directionStr: 'asc',
    limit: 3,
  };

  return await GetDataListQueryOrderBy<Parameter, News[]>({
    endPoint: 'news',
    param,
  });
};

const getResultNewsList = (doc: News[]) =>
  doc.map(news => ({
    ...news,
    date: getTimestampToDate(news.date),
  }));
