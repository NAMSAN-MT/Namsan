import ArrowLeftIcon from '@Images/arrow_left_th10.svg';
import ArrowLeftStrongIcon from '@Images/arrow_left_th10_strong.svg';
import ArrowRightIcon from '@Images/arrow_right_th10.svg';
import ArrowRightStrongIcon from '@Images/arrow_right_th10_strong.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { getPageList, getPageNationState, toQuery } from './Pagination.helper';
import { PaginationProps } from './Pagination.interface';
import * as S from './Pagination.style';

const Pagination = (props: PaginationProps) => {
  const router = useRouter();
  const locale = router.query.locale as string;
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
      router.push(
        toQuery(locale, props.newsType, newPage, props.sort),
        undefined,
        {
          shallow: true,
        },
      );
    }
  };

  const handleMoveNext = () => {
    if (booleanObj.isNext) {
      const newPage = 9 + page > nbPages ? nbPages : 9 + page;
      router.push(
        toQuery(locale, props.newsType, newPage, props.sort),
        undefined,
        {
          shallow: true,
        },
      );
    }
  };

  return (
    <S.Wrapper className="pagination">
      <S.ArrowNavigation disabled={!booleanObj.isPrev} onClick={handleMovePrev}>
        <img src={PrevIcon} alt="prev" />
      </S.ArrowNavigation>
      {booleanObj.isFirstPageArea && (
        <>
          <Link
            key={1}
            href={toQuery(locale, props.newsType, 1, props.sort)}
            shallow
            prefetch={false}
          >
            <S.PageNumber>1</S.PageNumber>
          </Link>
          <span className="ellipse"></span>
        </>
      )}
      {pageList.map(num => (
        <Link
          key={num}
          href={toQuery(locale, props.newsType, num, props.sort)}
          shallow
          prefetch={false}
        >
          <S.PageNumber isSelected={currentPage === num}>{num}</S.PageNumber>
        </Link>
      ))}
      {booleanObj.isLastPageArea && (
        <>
          <span className="ellipse"></span>
          <Link
            key={nbPages}
            href={toQuery(locale, props.newsType, nbPages, props.sort)}
            shallow
            prefetch={false}
          >
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
