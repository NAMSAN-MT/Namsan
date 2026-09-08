import Input from '@Components/common/Input';
import { withTranslations, WithIntlProps } from '@Hocs/withTranslations';
import sortAscIcon from '@Images/ic_sort_asc.svg';
import sortDescIcon from '@Images/ic_sort_desc.svg';
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
  const sortLabel = intl.formatMessage({
    id: sort === 'asc' ? 'news.sort_oldest' : 'news.sort_newest',
  });

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

          {/* 정렬 토글(아이콘 전용). 막대 길이와 화살표 방향이 현재 정렬을 나타낸다
              (아래=최신순, 위=오래된순). 보이는 텍스트가 없으므로 aria-label로
              접근성 이름을 주고, title로 호버 툴팁까지 같은 문구를 노출한다.
              img는 alt=""로 둬서 스크린리더가 이름을 두 번 읽지 않게 한다. */}
          <S.SortButton
            type="button"
            onClick={handleSort}
            aria-label={sortLabel}
            title={sortLabel}
          >
            {/* next/image-types/global이 `*.svg`를 any로 선언해 svg import는 전부
                any다(레포 전역 동일 — Pagination.tsx도 같은 지적을 안고 있다). */}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <img src={sort === 'asc' ? sortAscIcon : sortDescIcon} alt="" />
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
