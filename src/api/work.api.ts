import { Category } from '@Interface/api.interface';
import { GetDataListQueryOrderBy, Parameter } from './index.api';

export const getWorkFields = async () => {
  const param = {
    queryType: 'orderby',
    fieldPath: 'id',
    directionStr: 'asc',
  };

  return await GetDataListQueryOrderBy<Parameter, Category[]>({
    endPoint: 'businessFields',
    param,
  });
};
