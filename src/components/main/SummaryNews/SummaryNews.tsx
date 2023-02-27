import React from 'react';
import * as S from './SummaryNews.style';
import { ISummaryNewsProps } from './SummaryNews.interface';

const SummaryNews: React.FC<ISummaryNewsProps> = (props: ISummaryNewsProps) => {
  console.log(props.lastIndex);

  return (
    <S.SummaryNewsWrapper>
      <S.InnerWrapper>
        <div>
          <S.Tag>{props.tag}</S.Tag>
          <S.Date>{props.date}</S.Date>
          <S.Title>{props.title}</S.Title>
        </div>
        <S.IconWrapper />
      </S.InnerWrapper>
      {props.lastIndex ? null : <S.Divider />}
    </S.SummaryNewsWrapper>
  );
};

export default SummaryNews;
