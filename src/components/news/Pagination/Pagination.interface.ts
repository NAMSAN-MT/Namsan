import { NewsType } from '@Type/api.type';
import { TPagination } from '../Main/Main.interface';

export interface PaginationProps {
  newsType: NewsType;
  urlPage?: string;
  pageNationState: TPagination;
}
