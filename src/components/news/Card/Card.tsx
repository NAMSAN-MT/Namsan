import { News } from '@Interface/api.interface';
import React from 'react';
import * as S from '../Main/Main.style';

const Card = (props: News) => {
  return (
    <S.Card href="#">
      <S.LabelBox type={props.newsType}>
        <p>{props.newsType === 'media' ? props.agency : '최근 업무사례'}</p>
      </S.LabelBox>
      <S.Title>{props.title}</S.Title>
      <S.Content>{props.content}</S.Content>
      <S.Date>
        <p>{props.dateYearMonth}</p>
        <div className="divider" />
      </S.Date>
    </S.Card>
  );
};

export default Card;
