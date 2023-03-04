import React from 'react';
import { ITitleProps } from './Title.interface';
import * as S from './Title.style';

const Title = ({ title }: ITitleProps) => {
  return <S.TitleWrapper>{title}</S.TitleWrapper>;
};

export default Title;
