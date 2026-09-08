import { getMainNewsList } from '@Api/news.api';
import { NewsMin } from '@Interface/api.interface';
import { NewsType } from '@Type/api.type';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { TNewsListItem, TPagination, TSort, TTab } from './main.interface';

const HITS_PER_PAGE = 9;

/**
 * Client-side news list driver. The full news index is shipped at build time
 * (getStaticProps) and handed in via `newsList`; tab-filter + text-search +
 * pagination all run in the browser. `newsType`/`page`/`sort` are read from
 * `useRouter().query` (hydration-safe — never read `window` during render),
 * and `searchValue` is owned by the component and threaded in.
 */
const useMain = (newsList: TNewsListItem[] = [], searchValue = '') => {
  const router = useRouter();

  const urlPage =
    typeof router.query.page === 'string' ? router.query.page : '';
  const newsType = (router.query.newsType as NewsType) ?? 'all';
  const tab: TTab = (newsType ?? 'all') as TTab;
  const page = Number(urlPage) > 0 ? Number(urlPage) : 1;
  // 내림차순(최신순)이 기본 — URL에는 asc일 때만 `sort=asc`가 붙는다.
  const sort: TSort = router.query.sort === 'asc' ? 'asc' : 'desc';

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

    // `newsList`는 빌드 시점에 `date` 내림차순으로 들어온다(getStaticProps →
    // Firestore orderBy('date','desc')). 아이템에 원본 날짜가 없고
    // `dateYearMonth`는 0-padding 없는 표시용 문자열이라 문자열 정렬이 불가하므로,
    // 검색 결과를 원본 배열 순서에 다시 투영해 날짜순을 복원한다(Fuse는 관련도순으로
    // 재정렬하기 때문에 이 단계가 없으면 정렬 토글이 검색 중에 무력해진다).
    const hits = new Set(searched);
    const ordered = newsList.filter(n => hits.has(n));
    if (sort === 'asc') ordered.reverse();

    const nbPages = Math.ceil(ordered.length / HITS_PER_PAGE);
    const start = (page - 1) * HITS_PER_PAGE;
    const items = ordered.slice(start, start + HITS_PER_PAGE);

    return { items, pageNationState: { nbPages, page } as TPagination };
  }, [newsList, newsType, searchValue, page, sort]);

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
    sort,
    newsList: cardList,
    pageNationState,
    isLoading: false,
    onCallMainNewsList,
  };
};

export default useMain;
