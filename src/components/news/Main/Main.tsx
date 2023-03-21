import { getNewsSearchList } from '@Api/news.api';
import Input from '@Components/common/Input';
import { News } from '@Interface/api.interface';
import { NewsType } from '@Type/api.type';
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import * as SearchBar from '../../members/SearchBar/SearchBar.style';
import Card from '../Card';
import { TTab } from './main.interface';
import * as S from './Main.style';

const NewsMain = () => {
  const [tab, setTab] = useState<TTab>('all');
  const [list, setList] = useState<News[]>([]);
  const [searchValue, setSearchValue] = useState('');

  // TODO:  검색 영역은 ref 처리가 나을 듯 하나 논의 필요
  // let searchRef = useRef<HTMLInputElement | null>(null);
  // useEffect(() => {
  //   searchRef.current?.focus();
  //   onCallNewsList();
  //   return () => {
  //     searchRef.current = null;
  //   };
  // }, []);

  useEffect(() => {
    onCallNewsList();
  }, []);

  const onCallNewsList = async (newsType: NewsType = 'all') => {
    setList(await getNewsSearchList({ newsType }));
    setTab(newsType);
  };

  const handleTab = (e: MouseEvent<HTMLAnchorElement>, type: TTab) => {
    e.preventDefault();
    onCallNewsList(type);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setList(await getNewsSearchList({ newsType: tab, searchValue }));
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
      <S.CardBox>
        {list.map((item, i) => (
          <Card key={i} {...{ ...item, i }} />
        ))}
      </S.CardBox>
      {/* TODO: 페이지네이션 */}
    </>
  );
};

export default NewsMain;
