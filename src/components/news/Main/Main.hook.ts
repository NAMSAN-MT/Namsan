import { getMainNewsList, getNewsSearchList } from '@Api/news.api';
import { News } from '@Interface/api.interface';
import { useLocation } from '@reach/router';
import { NewsType } from '@Type/api.type';
import { navigate } from 'gatsby';
import { useState } from 'react';
import { TPagination, TTab } from './Main.interface';

const useMain = () => {
  const params = new URLSearchParams(useLocation().search);
  const urlPage = params.get('page') ?? '';
  const newsType = (params.get('newsType') as NewsType) ?? 'all';

  const [tab, setTab] = useState<TTab>('all');
  const [newsList, setNewsList] = useState<News[]>([]);
  const [pageNationState, setPageNation] = useState<TPagination>();

  const onCallNewsList = async (
    newsType: NewsType = 'all',
    searchValue?: string,
  ) => {
    try {
      const numberUrlPage = Number(urlPage);
      const { resultList, algoliaResult } = await getNewsSearchList({
        newsType,
        searchValue,
        page: numberUrlPage > 0 ? numberUrlPage - 1 : 0,
      });
      if (!algoliaResult) {
        navigate(`/news`);
        return;
      }
      const { nbPages, page } = algoliaResult;
      setPageNation({ nbPages, page: page + 1 });
      setNewsList(resultList);
      setTab(newsType);
    } catch (error) {
      console.error(error);
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
    onCallNewsList,
    onCallMainNewsList,
  };
};

export default useMain;
