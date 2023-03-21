import { Category, CategoryPageProps } from '@Components/work/work.interface';
import { documentId } from 'firebase/firestore';
import { GetDataListQuery } from './index.api';

export const getWorkFields = async (searchFields?: string[]) => {
  return await GetDataListQuery<Category>({
    endPoint: 'work',
    queries: [
      {
        queryType: 'orderby',
        fieldPath: documentId(),
        directionStr: 'asc',
      },
    ],
    searchFields: searchFields,
  });
};

export const getContainMember = async (businessFields: string) => {
  return await GetDataListQuery<Category>({
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
  return await GetDataListQuery<CategoryPageProps>({
    endPoint: 'work',
    queries: [
      { queryType: 'where', fieldPath: documentId(), opStr: '==', value: code },
    ],
  });
};
