import { NewsType } from '@Type/api.type';
import { TPagination } from '../Main/main.interface';

export interface PaginationProps {
  newsType: NewsType;
  urlPage?: string;
  pageNationState: TPagination;
}
