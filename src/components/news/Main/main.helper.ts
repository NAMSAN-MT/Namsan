import { QueryWhereOptions } from '@Api/index.api';
import { NewsType } from '@Type/api.type';

export const getListConditions = (newsType: NewsType) => {
  const conditions: QueryWhereOptions[] =
    newsType === 'all'
      ? []
      : [
          {
            fieldPath: 'newsType',
            opStr: '==',
            value: newsType,
          },
        ];
  return conditions;
};
