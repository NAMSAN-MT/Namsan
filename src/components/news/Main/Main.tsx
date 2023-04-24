import { getNewsSearchList } from '@Api/news.api';
import Input from '@Components/common/Input';
import Loading from '@Components/common/Loading';
import { News } from '@Interface/api.interface';
import { useLocation } from '@reach/router';
import { NewsType } from '@Type/api.type';
import { navigate } from 'gatsby';
import { isEmpty } from 'lodash';
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  Suspense,
  useEffect,
  useState,
} from 'react';
import * as SearchBar from '../../members/SearchBar/SearchBar.style';
const Card = React.lazy(() => import('@Components/news/Card'));

import Pagination from '../Pagination';
import { TPagination, TTab } from './main.interface';
import * as S from './Main.style';

const NewsMain = () => {
  const [tab, setTab] = useState<TTab>('all');
  const [list, setList] = useState<News[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [pageNationState, setPageNation] = useState<TPagination>();
  const params = new URLSearchParams(useLocation().search);
  const urlPage = Number(params.get('page') || '0');
  const newsType = (params.get('newsType') as NewsType) || 'all';
  console.log(newsType);
  const url = new URL(useLocation().href);
  useEffect(() => {
    onCallNewsList(newsType);
  }, [urlPage]);

  const onCallNewsList = async (
    newsType: NewsType = 'all',
    searchValue?: string,
  ) => {
    const { resultList, algoliaResult } = await getNewsSearchList({
      newsType,
      searchValue,
      page: urlPage > 0 ? urlPage - 1 : 0,
    });

    if (!algoliaResult) {
      navigate(`/news`);
      return;
    }

    const { nbPages, page } = algoliaResult;
    setPageNation({ nbPages, page: page + 1 });
    setList(resultList);
    setTab(newsType);
  };

  const handleTab = (e: MouseEvent<HTMLAnchorElement>, type: TTab) => {
    e.preventDefault();
    setSearchValue('');
    onCallNewsList(type);

    const navigateUrl = type === 'all' ? '' : `?newsType=${type}`;
    navigate(`/news${navigateUrl}`);
  };

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    onCallNewsList(tab, searchValue);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const isPagination = !isEmpty(pageNationState);

  return (
    <>
      <S.TabSearchBox>
        {/* 탭리스트 */}
        <S.TabBox>
          <S.Tab isActive={tab === 'all'}>
            <a href="#" onClick={e => handleTab(e, 'all')}>
              전체
            </a>
          </S.Tab>
          <S.Tab isActive={tab === 'media'}>
            <a href="#" onClick={e => handleTab(e, 'media')}>
              언론보도
            </a>
          </S.Tab>
          <S.Tab isActive={tab === 'recent'}>
            <a href="#" onClick={e => handleTab(e, 'recent')}>
              최근 업무사례
            </a>
          </S.Tab>
        </S.TabBox>

        {/* TODO: searchBar common 영역으로 옮겨갈때 반영(feat. @ttumzzi) */}
        <SearchBar.ItemWrapper width="384px">
          <Input
            handleSubmit={handleSubmit}
            placeholder={'검색'} // TODO: 다국어
            value={searchValue}
            handleChange={handleNameChange}
          />
        </SearchBar.ItemWrapper>
      </S.TabSearchBox>
      {/* 카드 리스트 영역 */}
      <Suspense
        fallback={
          <div className="loading_cards">
            <Loading height="" />
          </div>
        }
      >
        <S.CardBox>
          {list.map((item, i) => (
            <Card key={i} {...{ ...item, i }} />
          ))}
        </S.CardBox>
      </Suspense>
      {isPagination && (
        <Pagination
          newsType={newsType}
          urlPage={urlPage}
          pageNationState={pageNationState}
        />
      )}
    </>
  );
};

export default NewsMain;
