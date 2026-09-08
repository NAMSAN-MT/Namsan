import Input from '@Components/common/Input';
import LineArrowIcon from '@Components/icons/LineArrowIcon';
import { withTranslations, WithIntlProps } from '@Hocs/withTranslations';
import { useRouter } from 'next/router';
import React, { lazy, useState } from 'react';
import * as SearchBar from '../../members/SearchBar/SearchBar.style';
import Pagination from '../Pagination';
import { toQuery } from '../Pagination/Pagination.helper';
import useMain from './Main.hook';
import * as S from './Main.style';
import { TNewsListItem, TSort, TTab } from './main.interface';
const Card = lazy(() => import('@Components/news/Card'));

interface Props extends WithIntlProps {
  newsList: TNewsListItem[];
}
const NewsMain = (props: Props) => {
  const intl = props.intl;
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const { isLoading, urlPage, newsType, tab, sort, newsList, pageNationState } =
    useMain(props.newsList, searchValue);

  // 탭/정렬 모두 같은 페이지 내 쿼리 이동 → locale이 치환된 구체 경로(toQuery) +
  // shallow. `[locale]` 템플릿 경로로 push하면 정적 export에서 static props 404가 난다.
  const move = (type: TTab, nextSort: TSort) => {
    // shallow 라우팅은 실패해도 화면 상태가 곧 URL이라 별도 처리가 없다 → void.
    void router.push(
      toQuery(props.intl.locale, type, undefined, nextSort),
      undefined,
      { shallow: true },
    );
  };

  const handleTab = (e: React.MouseEvent<HTMLAnchorElement>, type: TTab) => {
    e.preventDefault();
    setSearchValue('');
    // 정렬은 탭을 옮겨도 유지, 페이지는 1로 리셋(toQuery에서 page 생략).
    move(type, sort);
  };

  // 정렬 방향 토글. 순서가 바뀌면 현재 페이지 번호는 의미가 없으니 1페이지로.
  const handleSort = () => move(tab, sort === 'asc' ? 'desc' : 'asc');

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    // Search is reactive (searchValue → useMain re-filters); just block reload.
    e.preventDefault();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const isPagination = pageNationState.nbPages > 1;

  return (
    <>
      <S.TabSearchBox>
        <S.TabBox>
          <S.Tab isActive={tab === 'all'}>
            <a href="#" onClick={e => handleTab(e, 'all')}>
              {props.intl.formatMessage({
                id: 'news.total',
              })}
            </a>
          </S.Tab>
          <S.Tab isActive={tab === 'media'}>
            <a href="#" onClick={e => handleTab(e, 'media')}>
              {props.intl.formatMessage({
                id: 'news.pressRelease',
              })}
            </a>
          </S.Tab>
          <S.Tab isActive={tab === 'recent'}>
            <a href="#" onClick={e => handleTab(e, 'recent')}>
              {props.intl.formatMessage({
                id: 'news.RecentBusinessCases',
              })}
            </a>
          </S.Tab>
        </S.TabBox>

        <S.ControlBox>
          <SearchBar.ItemWrapper width="384px">
            <Input
              iconSize={{ width: '20px', height: '20px' }}
              placeholder={intl.formatMessage({
                id: 'news.search_placeholder',
              })}
              value={searchValue}
              handleSubmit={handleSubmit}
              handleChange={handleNameChange}
            />
          </SearchBar.ItemWrapper>

          {/* 정렬 토글: 화살표 아이콘 방향이 현재 정렬(위=오래된순, 아래=최신순)을 나타낸다.
              버튼 안의 텍스트가 곧 접근성 이름이라 별도 aria-label은 두지 않는다. */}
          <S.SortButton type="button" onClick={handleSort}>
            <LineArrowIcon
              direction={sort === 'asc' ? 'UP' : 'DOWN'}
              weight="BOLD"
              width="18px"
              height="18px"
            />
            <span>
              {intl.formatMessage({
                id: sort === 'asc' ? 'news.sort_oldest' : 'news.sort_newest',
              })}
            </span>
          </S.SortButton>
        </S.ControlBox>
      </S.TabSearchBox>
      <Card
        type="news"
        isLoading={isLoading}
        newsList={newsList}
        {...{ urlPage, newsType, searchValue }}
      />
      {isPagination && (
        <Pagination {...{ newsType, sort, urlPage, pageNationState }} />
      )}
    </>
  );
};

export default withTranslations(NewsMain);
