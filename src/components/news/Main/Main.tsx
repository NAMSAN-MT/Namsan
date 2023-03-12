import { getNewsSearchList } from '@Api/news.api';
import { News } from '@Interface/api.interface';
import { NewsType } from '@Type/api.type';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import * as Helper from './main.helper';
import { TTab } from './main.interface';
import * as S from './main.style';

const NewsMain = () => {
  let searchRef = useRef<HTMLInputElement | null>(null);
  const [tab, setTab] = useState<TTab>('all');
  const [list, setList] = useState<News[]>([]);

  useEffect(() => {
    searchRef.current?.focus();
    onCallNewsList();
    return () => {
      searchRef.current = null;
    };
  }, []);

  const onCallNewsList = async (newsType: NewsType = 'all') => {
    const conditions = Helper.getListConditions(newsType);
    setList(
      await getNewsSearchList({
        limit: 9,
        conditions,
      }),
    );
    setTab(newsType);
  };

  const handleTab = (e: MouseEvent<HTMLAnchorElement>, type: TTab) => {
    e.preventDefault();
    onCallNewsList(type);
  };

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

        {/* 검색 */}
        <S.SearchBox>
          <input ref={searchRef} type="text" placeholder="검색" />
        </S.SearchBox>
      </S.TabSearchBox>
      {/* 카드 리스트 영역 */}
      <S.CardBox>
        {list.map((item, i) => (
          <S.Card href="#" key={i}>
            <S.LabelBox type={item.newsType}>
              <p>{item.newsType === 'media' ? item.agency : '최근 업무사례'}</p>
            </S.LabelBox>
            <S.Title>{item.title}</S.Title>
            <S.Content>{item.content}</S.Content>
            <S.Date>
              <p>{item.dateYearMonth}</p>
              <div className="divider" />
            </S.Date>
          </S.Card>
        ))}
      </S.CardBox>
      {/* TODO: 페이지네이션 */}
    </>
  );
};

export default NewsMain;
