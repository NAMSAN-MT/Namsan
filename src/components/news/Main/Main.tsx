import Input from '@Components/common/Input';
import { withTranslations, WithIntlProps } from '@Hocs/withTranslations';
import { useRouter } from 'next/router';
import React, { lazy, useState } from 'react';
import * as SearchBar from '../../members/SearchBar/SearchBar.style';
import Pagination from '../Pagination';
import useMain from './Main.hook';
import * as S from './Main.style';
import { TNewsListItem, TTab } from './main.interface';
const Card = lazy(() => import('@Components/news/Card'));

interface Props extends WithIntlProps {
  newsList: TNewsListItem[];
}
const NewsMain = (props: Props) => {
  const intl = props.intl;
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const { isLoading, urlPage, newsType, tab, newsList, pageNationState } =
    useMain(props.newsList, searchValue);

  const handleTab = (e: React.MouseEvent<HTMLAnchorElement>, type: TTab) => {
    e.preventDefault();
    setSearchValue('');
    router.push(
      `/${props.intl.locale}/news${type === 'all' ? '' : `?newsType=${type}`}`,
    );
  };

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
      </S.TabSearchBox>
      <Card
        type="news"
        isLoading={isLoading}
        newsList={newsList}
        {...{ urlPage, newsType, searchValue }}
      />
      {isPagination && (
        <Pagination {...{ newsType, urlPage, pageNationState }} />
      )}
    </>
  );
};

export default withTranslations(NewsMain);
