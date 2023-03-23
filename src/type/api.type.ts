import { TLanguage } from './intl.type';
import { Member } from '@Interface/api.interface';
Intl;
import { FieldPath, WhereFilterOp, OrderByDirection } from 'firebase/firestore';

/* endpoint type */
export type EndPointType = 'news' | 'work' | 'profile' | 'members';

/* query parameter type */
export type QueryType = 'where' | 'orderby';

export type QueryWhereOptions = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: any;
};
export type QueryOrderByOptions = {
  fieldPath: string | FieldPath;
  directionStr?: OrderByDirection;
  limit?: number;
};

export type NewsRequest = Partial<{
  id: string;
  page: number;
  offset: number;
  conditions: QueryWhereOptions[];
  orderby: QueryOrderByOptions;
}>;

export type MembersSearchRequest = Partial<{
  name: string;
  position: string;
  businessField: string;
}> & { language: TLanguage };

export type TMemberSearchField = keyof Member;
export type NewsType = 'all' | 'media' | 'recent';

export type TQuery =
  | ({
      queryType: 'where';
    } & QueryWhereOptions)
  | ({ queryType: 'orderby' } & QueryOrderByOptions);
