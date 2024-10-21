import { getMainNewsList, getNewsSearchList } from '@Api/news.api';
import { NewsMin } from '@Interface/api.interface';
import { useLocation } from '@reach/router';
import { NewsType } from '@Type/api.type';
import { useState } from 'react';
import { TPagination, TTab } from './main.interface';

const useMain = () => {
  const params = new URLSearchParams(useLocation().search);
  const urlPage = params.get('page') ?? '';
  const newsType = (params.get('newsType') as NewsType) ?? 'all';

  const [tab, setTab] = useState<TTab>('all');
  const [newsList, setNewsList] = useState<NewsMin[]>([]);
  const [pageNationState, setPageNation] = useState<TPagination>();
  const [isLoading, setIsLoading] = useState(false);

  const onCallNewsList = async (
    newsType: NewsType = 'all',
    searchValue?: string,
  ) => {
    try {
      setIsLoading(true);
      const numberUrlPage = Number(urlPage);
      const { resultList, algoliaResult } = await getNewsSearchList({
        newsType,
        searchValue,
        page: numberUrlPage > 0 ? numberUrlPage - 1 : 0,
      });

      setNewsList(resultList);
      setTab(newsType);
      if (!algoliaResult) {
        setPageNation({ nbPages: 0, page: 0 });
      } else {
        const { nbPages, page } = algoliaResult;
        setPageNation({ nbPages, page: page + 1 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCallMainNewsList = () => {
    getMainNewsList(3).then(setNewsList).catch(console.error);
  };

  return {
    urlPage,
    newsType,
    tab,
    newsList,
    pageNationState,
    isLoading,
    onCallNewsList,
    onCallMainNewsList,
  };
};

export default useMain;
