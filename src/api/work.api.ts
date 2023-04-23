import { Category, CategoryPageProps } from '@Components/work/work.interface';
import { documentId } from 'firebase/firestore';
import { GetDataListQuery } from './index.api';
import { isEmpty } from 'lodash';
import { IMember } from '@Interface/api.interface';

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

export const getWorkField = async (code: string) => {
  return GetDataListQuery<CategoryPageProps>({
    endPoint: 'work',
    queries: [
      {
        queryType: 'where',
        fieldPath: documentId(),
        opStr: '==',
        value: code,
      },
    ],
  }).then(result => result[0]);
};
