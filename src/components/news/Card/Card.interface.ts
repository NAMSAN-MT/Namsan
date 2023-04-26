import { News } from '@Interface/api.interface';
import { NewsType } from '@Type/api.type';

export interface CardProps {
  newsList: News[];
  urlPage: number;
  newsType: NewsType;
  searchValue: string;
  onCallNewsList: (newsType: NewsType, searchValue?: string) => Promise<void>;
}
