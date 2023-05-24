import { News, NewsMin } from '@Interface/api.interface';
import { NewsType } from '@Type/api.type';

export interface CardProps {
  type: 'main' | 'news';
  isLoading: boolean;
  newsList: NewsMin[];
  urlPage?: string;
  newsType?: NewsType;
  searchValue?: string;
  onCallNewsList?: (newsType?: NewsType, searchValue?: string) => Promise<void>;
  onCallMainNewsList?: (limit: number) => void;
}
