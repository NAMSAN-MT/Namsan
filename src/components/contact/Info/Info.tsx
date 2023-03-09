import React from 'react';
import {
  IInfoColumnProps,
  IInfoProps,
  IInfoWrapperProps,
} from './Info.interface';
import * as S from './Info.style';

const Info = ({ title, content }: IInfoProps) => {
  return (
    <S.Info>
      <S.Title>{title}</S.Title>
      <S.Content>{content}</S.Content>
    </S.Info>
  );
};

Info.Wrapper = ({ children }: IInfoWrapperProps) => {
  return <S.InfoWrapper>{children}</S.InfoWrapper>;
};

Info.Column = ({ children }: IInfoColumnProps) => {
  return <S.InfoColumn>{children}</S.InfoColumn>;
};

export default Info;
