import { getMainNewsList } from '@Api/news.api';
import { NewsMin } from '@Interface/api.interface';
import { NewsType } from '@Type/api.type';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { TNewsListItem, TPagination, TTab } from './main.interface';

const HITS_PER_PAGE = 9;

/**
 * Client-side news list driver. The full news index is shipped at build time
 * (getStaticProps) and handed in via `newsList`; tab-filter + text-search +
 * pagination all run in the browser. `newsType`/`page` are read from
 * `useRouter().query` (hydration-safe — never read `window` during render),
 * and `searchValue` is owned by the component and threaded in.
 */
const useMain = (newsList: TNewsListItem[] = [], searchValue = '') => {
  const router = useRouter();

  const urlPage = typeof router.query.page === 'string' ? router.query.page : '';
  const newsType = (router.query.newsType as NewsType) ?? 'all';
  const tab: TTab = (newsType ?? 'all') as TTab;
  const page = Number(urlPage) > 0 ? Number(urlPage) : 1;

  const { items, pageNationState } = useMemo(() => {
    const filtered =
      newsType === 'all' || !newsType
        ? newsList
        : newsList.filter(n => n.newsType === newsType);

    const searched = searchValue
      ? new Fuse(filtered, {
          keys: ['title', 'summary', 'content'],
          threshold: 0.4,
          ignoreLocation: true,
        })
          .search(searchValue)
          .map(r => r.item)
      : filtered;

    const nbPages = Math.ceil(searched.length / HITS_PER_PAGE);
    const start = (page - 1) * HITS_PER_PAGE;
    const items = searched.slice(start, start + HITS_PER_PAGE);

    return { items, pageNationState: { nbPages, page } as TPagination };
  }, [newsList, newsType, searchValue, page]);

  // Card consumes NewsMin; the build index adds `content` for search only.
  const cardList = items as unknown as NewsMin[];

  // Home widget (ForthSection) path — runtime Firestore, not Algolia. Untouched.
  const onCallMainNewsList = () => {
    getMainNewsList(3).then().catch(console.error);
  };

  return {
    urlPage,
    newsType,
    tab,
    newsList: cardList,
    pageNationState,
    isLoading: false,
    onCallMainNewsList,
  };
};

export default useMain;
