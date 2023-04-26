import ArrowLeftIcon from '@Images/arrow_left_th10.svg';
import ArrowLeftStrongIcon from '@Images/arrow_left_th10_strong.svg';
import ArrowRightIcon from '@Images/arrow_right_th10.svg';
import ArrowRightStrongIcon from '@Images/arrow_right_th10_strong.svg';
import { useLocation } from '@reach/router';
import { Link, navigate } from 'gatsby';
import React from 'react';
import {
  getNewQueryString,
  getPageList,
  getPageNationState,
  toQuery,
} from './Pagination.helper';
import { PaginationProps } from './Pagination.interface';
import * as S from './Pagination.style';

const Pagination = (props: PaginationProps) => {
  const params = new URLSearchParams(useLocation().search);
  const { currentPage, nbPages, page } = getPageNationState(props);

  // Pagination
  let pageList: number[] = [];
  let booleanObj = {
    isPrev: false,
    isNext: false,
    isFirstPageArea: false,
    isLastPageArea: false,
  };
  const front = page - 3 > 1;
  const end = page + 3 < nbPages;
  if (nbPages < 10) {
    pageList = getPageList(nbPages).map((_, i) => i + 1);
  } else if (front && end) {
    booleanObj = {
      isPrev: true,
      isNext: true,
      isFirstPageArea: true,
      isLastPageArea: true,
    };
    pageList = getPageList(5).map((_, i) => page - 2 + i + 1);
  } else if (!front && end) {
    booleanObj = {
      isPrev: false,
      isNext: true,
      isFirstPageArea: false,
      isLastPageArea: true,
    };
    pageList = getPageList(6).map((_, i) => i + 1);
  } else if (front && !end) {
    booleanObj = {
      isPrev: true,
      isNext: false,
      isFirstPageArea: true,
      isLastPageArea: false,
    };
    pageList = getPageList(6).map((_, i) => nbPages - 6 + i + 1);
  }

  const PrevIcon = booleanObj.isPrev ? ArrowLeftStrongIcon : ArrowLeftIcon;
  const NextsIcon = booleanObj.isNext ? ArrowRightStrongIcon : ArrowRightIcon;

  const handleMovePrev = () => {
    if (booleanObj.isPrev) {
      const newPage = page - 9 < 1 ? 1 : page - 9;
      navigate(`?${getNewQueryString(params, newPage)}`);
    }
  };

  const handleMoveNext = () => {
    if (booleanObj.isNext) {
      const newPage = 9 + page > nbPages ? nbPages : 9 + page;
      navigate(`?${getNewQueryString(params, newPage)}`);
    }
  };

  return (
    <S.Wrapper className="pagination">
      <S.ArrowNavigation disabled={!booleanObj.isPrev} onClick={handleMovePrev}>
        <img src={PrevIcon} alt="prev" />
      </S.ArrowNavigation>
      {booleanObj.isFirstPageArea && (
        <>
          <Link key={1} to={toQuery(props.newsType, 1)}>
            <S.PageNumber>1</S.PageNumber>
          </Link>
          <span className="ellipse"></span>
        </>
      )}
      {pageList.map(num => (
        <Link key={num} to={toQuery(props.newsType, num)}>
          <S.PageNumber isSelected={currentPage === num}>{num}</S.PageNumber>
        </Link>
      ))}
      {booleanObj.isLastPageArea && (
        <>
          <span className="ellipse"></span>
          <Link key={nbPages} to={toQuery(props.newsType, nbPages)}>
            <S.PageNumber>{nbPages}</S.PageNumber>
          </Link>
        </>
      )}
      <S.ArrowNavigation disabled={!booleanObj.isNext} onClick={handleMoveNext}>
        <img src={NextsIcon} alt="next" />
      </S.ArrowNavigation>
    </S.Wrapper>
  );
};

export default Pagination;
