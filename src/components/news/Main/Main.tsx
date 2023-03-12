import { getMainNewsList, getNewsList } from '@Api/news.api';
import { News } from '@Interface/api.interface';
import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { TTab } from './Main.interface';
import * as S from './Main.style';

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

  const onCallNewsList = async () => {
    setList(await getMainNewsList(9));
  };

  const handleTab = (e: MouseEvent<HTMLAnchorElement>, type: TTab) => {
    e.preventDefault();
    setTab(type);
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
          <S.Tab isActive={tab === 'agency'}>
            <a href="#" onClick={e => handleTab(e, 'agency')}>
              언론보도
            </a>
          </S.Tab>
          <S.Tab isActive={tab === 'last'}>
            <a href="#" onClick={e => handleTab(e, 'last')}>
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
        {list.map(item => (
          <S.Card href="#">
            <S.LabelBox type={item.newsType === 'media'}>
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
