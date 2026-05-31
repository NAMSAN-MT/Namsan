import { IMember, News } from '@Interface/api.interface';
import { EndPointType, TQuery } from '@Type/api.type';
import { documentId } from 'firebase/firestore';
import { getTimestampToDate } from '../utils/date';
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
          const { imagePath, name, position } =
            await getData<IMember>(memberSnapshot);
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
