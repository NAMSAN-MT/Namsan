import { News, NewsMin } from '@Interface/api.interface';
import { EndPointType, NewsType, TQuery } from '@Type/api.type';
import { documentId } from 'firebase/firestore';
import { isEmpty } from 'lodash';
import { getTimestampToDate } from '../utils/date';
import { index } from './algolia';
import { getData, GetDataListQuery, getFileFromStorage } from './index.api';

export const getMainNewsList = async (limit: number) => {
  const endPoint: EndPointType = 'news';
  const queries: TQuery[] = [];

  queries.push({
    queryType: 'orderby',
    fieldPath: 'date',
    directionStr: 'desc',
    limit,
  });

  const result = await GetDataListQuery<News>({ endPoint, queries });

  return result.map(news => ({
    ...news,
    dateYearMonth: getTimestampToDate(news.date).fullDate,
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
      if (isEmpty(algoliaResult.hits)) {
        return { resultList: [] };
      }

      const ids = algoliaResult.hits.map(
        (hit: any) => hit.documentId as string,
      );
      const newDataList = await getNewsIdDataList(ids);
      const resultList: NewsMin[] = newDataList
        .sort((a, b) => b.order - a.order)
        .map(
          (news, index) =>
            ({
              title: news.title,
              summary: news.summary,
              agency: news.agency,
              newsType: news.newsType,
              documentId: ids[index],
              dateYearMonth: getTimestampToDate(news.date).fullDate,
              order: news.order,
            } as NewsMin),
        );

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

export const getNewsData = async (_documentId: string) => {
  return GetDataListQuery<News>({
    endPoint: 'news',
    queries: [
      {
        queryType: 'where',
        fieldPath: documentId(),
        opStr: '==',
        value: _documentId,
      },
    ],
  }).then(result => {
    const data = result[0];
    return {
      ...data,
      dateYearMonthDate: getTimestampToDate(data.date).fullDate,
    };
  });
};

export const getNewsMember = async (_documentId: string) => {
  return GetDataListQuery<News>({
    endPoint: 'news',
    queries: [
      {
        queryType: 'where',
        fieldPath: documentId(),
        opStr: '==',
        value: _documentId,
      },
    ],
  }).then(async result => {
    const data = result[0];
    if (!data.memberId) return;
    if (data.memberId?.length === 0) return;

    try {
      const results = await Promise.all(
        data.memberId.map(async memberId => {
          const memberSnapshot = await memberId.get();
          const { imagePath, name, position } = await getData(memberSnapshot);
          const profileImage = await getFileFromStorage(imagePath);
          return {
            profileImage,
            name,
            position,
          };
        }),
      );
      return results ?? [];
    } catch (error) {
      return;
    }
  });
};
