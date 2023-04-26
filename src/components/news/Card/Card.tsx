import { News } from '@Interface/api.interface';
import React from 'react';
import * as S from '../Main/Main.style';

const Card = (props: News) => {
  return (
    <S.Card href="#" className="card-wrapper">
      <S.LabelBox type={props.newsType} className="card-label">
        <p>{props.newsType === 'media' ? props.agency : '최근 업무사례'}</p>
      </S.LabelBox>
      <S.Title className="card-title">{props.title}</S.Title>
      <S.Content className="card-content">{props.content}</S.Content>
      <S.Date className="card-date">
        <p>{props.dateYearMonth}</p>
        <div className="divider" />
      </S.Date>
    </S.Card>
  );
};

export default Card;
