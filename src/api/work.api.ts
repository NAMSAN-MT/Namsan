import { Category } from '@Components/work/work.interface';
import {
  GetDataList,
  GetDataListQueryOrderBy,
  GetDataListQueryWhere,
  Parameter,
} from './index.api';

export const getWorkFields = async () => {
  const param = {
    queryType: 'orderby',
    fieldPath: 'categoryId',
    directionStr: 'asc',
  };

  return await GetDataListQueryOrderBy<Parameter, Category[]>({
    endPoint: 'work',
    param,
  });
};

export const getContainMember = async (businessFields: string) => {
  const param = {
    conditions: [
      {
        fieldPath: 'businessFields',
        opStr: 'array-contains',
        value: businessFields,
      },
    ],
  };
  return await GetDataListQueryWhere<Parameter, Category[]>({
    endPoint: 'members',
    param,
  });
};

export const getWorkField = async (code: string) => {
  const param = {
    conditions: [
      {
        fieldPath: 'categoryId',
        opStr: '==',
        value: code,
      },
    ],
  };

  return await GetDataListQueryWhere<Parameter, Category[]>({
    endPoint: 'work',
    param,
  });
};
