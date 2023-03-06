import { QueryWhereOptions, QueryOrderByOptions } from '../api/index.api';

export type NewsRequest = Partial<{
  id: string;
  page: number;
  offset: number;
  conditions: QueryWhereOptions[];
  orderby: QueryOrderByOptions;
}>;
