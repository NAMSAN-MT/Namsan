import { NewsType } from '@Type/api.type';
import { TPagination, TSort } from '../Main/main.interface';

export interface PaginationProps {
  newsType: NewsType;
  sort: TSort;
  urlPage?: string;
  pageNationState: TPagination;
}
