import React from 'react';
import { Link } from 'gatsby';
import * as S from './Pagination.style';
import ArrowLeftIcon from '@Images/arrow_left_th10.svg';
import ArrowLeftStrongIcon from '@Images/arrow_left_th10_strong.svg';
import ArrowRightIcon from '@Images/arrow_right_th10.svg';
import ArrowRightStrongIcon from '@Images/arrow_right_th10_strong.svg';
import { TPagination } from '../Main/main.interface';
import { NewsType } from '@Type/api.type';
import { toQuery } from './Pagination.helper';

interface Props {
  newsType: NewsType;
  urlPage?: number;
  pageNationState: TPagination;
}

const Pagination = (props: Props) => {
  const { nbPages, page } = props.pageNationState;
  const currentPage = props.urlPage || page || 1;

  // 첫 번째 페이지 라인
  const firstPage = nbPages > 0 ? 1 : undefined;
  let isFirstPageArea = currentPage < 10 && firstPage;

  // 마지막 페이지 라인
  const lastPage = nbPages;
  let isLastPageArea =
    nbPages === currentPage ||
    (nbPages > currentPage && nbPages - 10 < currentPage);
  console.log(lastPage, isLastPageArea);

  let pageList: number[] = [];
  console.log(nbPages, props.urlPage);

  // TODO: 세부로직 작업 필요 작업중
  if (nbPages <= 10 || currentPage <= 10) {
    if (nbPages > 7 && nbPages <= 10 && currentPage > 4) {
      console.log('2>>');
      isFirstPageArea = false;
      isLastPageArea = true;
      const length = 6;
      pageList = Array.from({ length }).map((_, index) => index - 1 + length);
    } else {
      if (nbPages > 7) {
        console.log('3>>');
        isLastPageArea = false;
        pageList = Array.from({ length: 7 }).map((_, index) => index + 1);
      } else {
        console.log('4>>');
        pageList = Array.from({ length: nbPages }).map((_, index) => index + 1);
      }
    }
  } else if (nbPages > currentPage && nbPages - 10 < currentPage) {
    console.log('5>>');
    const length = nbPages - 7;
    pageList = Array.from({ length }).map((_, index) => index + length);
  } else {
    console.log('6>>');
    const length = nbPages - 5;
    pageList = Array.from({ length: nbPages }).map((_, index) => index + 1);
  }

  const isPrev = !isFirstPageArea,
    isNext = !isLastPageArea;
  const PrevIcon = isPrev ? ArrowLeftStrongIcon : ArrowLeftIcon;
  const NextsIcon = isNext ? ArrowRightStrongIcon : ArrowRightIcon;
  return (
    <S.Wrapper className="pagination">
      <S.ArrowNavigation disabled={isPrev}>
        <img src={PrevIcon} alt="prev" />
      </S.ArrowNavigation>
      {!isFirstPageArea && (
        <>
          <Link key={firstPage} to={toQuery(props.newsType, firstPage)}>
            <S.PageNumber>{firstPage}</S.PageNumber>
          </Link>
          <span className="ellipse"></span>
        </>
      )}
      {pageList.map(num => (
        <Link key={num} to={toQuery(props.newsType, num)}>
          <S.PageNumber isSelected={currentPage === num}>{num}</S.PageNumber>
        </Link>
      ))}
      {!isLastPageArea && (
        <>
          <span className="ellipse"></span>
          <Link key={lastPage} to={toQuery(props.newsType, lastPage)}>
            <S.PageNumber>{lastPage}</S.PageNumber>
          </Link>
        </>
      )}
      <S.ArrowNavigation disabled={isNext}>
        <img src={NextsIcon} alt="next" />
      </S.ArrowNavigation>
    </S.Wrapper>
  );
};

export default Pagination;
