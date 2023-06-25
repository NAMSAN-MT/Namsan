import React from 'react';
import { NewsWrapperProps } from './NewsWrapper.interface';
import * as S from './NewsWrapper.style';

const NewsWrapper = (props: NewsWrapperProps) => {
  return (
    <S.Outer outerPadding={props.outerPadding}>
      <S.Inner innerWidth={props.innerWidth}>
        {props.title && <S.Title>{props.title}</S.Title>}
        {props.children}
      </S.Inner>
    </S.Outer>
  );
};

export default NewsWrapper;
