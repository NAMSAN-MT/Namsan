import { Category } from '@Components/work/work.interface';
import { GetDataListQuery } from './index.api';

export const getWorkFields = async () => {
  return await GetDataListQuery<Category[]>({
    endPoint: 'work',
    queries: [
      {
        queryType: 'orderby',
        fieldPath: 'categoryId',
        directionStr: 'asc',
      },
    ],
  });
};

export const getContainMember = async (businessFields: string) => {
  return await GetDataListQuery<Category[]>({
    endPoint: 'members',
    queries: [
      {
        queryType: 'where',
        fieldPath: 'businessFields',
        opStr: 'array-contains',
        value: businessFields,
      },
    ],
  });
};

export const getWorkField = async (code: string) => {
  return await GetDataListQuery<Category[]>({
    endPoint: 'work',
    queries: [
      { queryType: 'where', fieldPath: 'categoryId', opStr: '==', value: code },
    ],
  });
};
