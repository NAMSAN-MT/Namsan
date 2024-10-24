import { Category, CategoryPageProps } from '@Components/work/work.interface';
import { documentId } from 'firebase/firestore';
import { GetDataListQuery } from './index.api';
import { isEmpty } from 'lodash';
import { IMember } from '@Interface/api.interface';

export const getWorkFields = async <T>(
  searchFields?: string[],
  language?: string,
) => {
  return await GetDataListQuery<T>({
    endPoint: 'work',
    queries: [
      {
        queryType: 'where',
        fieldPath: 'language',
        opStr: '==',
        value: language ?? 'ko',
      },
      {
        queryType: 'orderby',
        fieldPath: 'categoryId',
        directionStr: 'asc',
      },
    ],
    searchFields: searchFields,
  });
};

export const getContainMember = async (businessFields: string) => {
  return await GetDataListQuery<IMember>({
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

export const getMemberByName = async (names: string[]) => {
  return await GetDataListQuery<IMember>({
    endPoint: 'members',
    queries: [
      {
        queryType: 'where',
        fieldPath: 'name',
        opStr: 'in',
        value: names,
      },
    ],
  });
};

export const getWorkField = async (code: string, lang?: string) => {
  return GetDataListQuery<CategoryPageProps>({
    endPoint: 'work',
    queries: [
      {
        queryType: 'where',
        fieldPath: 'language',
        opStr: '==',
        value: lang ?? 'ko',
      },
      {
        queryType: 'where',
        fieldPath: 'categoryId',
        opStr: '==',
        value: code,
      },
    ],
  }).then(result => {
    if (isEmpty(result)) throw new Error('no data');
    return result[0];
  });
};
