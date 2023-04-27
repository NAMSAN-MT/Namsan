import React from 'react';
import { NewsWrapperProps } from './NewsWrapper.interface';
import * as S from './NewsWrapper.style';

const NewsWrapper = (props: NewsWrapperProps) => {
  return (
    <S.Outer>
      <S.Inner>
        {/* <S.Header> */}
        <S.Title>남산소식</S.Title>
        {/* </S.Header> */}
        {props.children}
      </S.Inner>
    </S.Outer>
  );
};

export default NewsWrapper;
