import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { TTab } from './main.interface';
import * as S from './Main.style';

const NewsMain = () => {
  let searchRef = useRef<HTMLInputElement | null>(null);
  const [tab, setTab] = useState<TTab>('all');

  useEffect(() => {
    searchRef.current?.focus();
    return () => {
      searchRef.current = null;
    };
  }, []);

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
      <div></div>
    </>
  );
};

export default NewsMain;
