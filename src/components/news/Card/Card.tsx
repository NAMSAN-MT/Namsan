import { News } from '@Interface/api.interface';
import React from 'react';
import * as S from '../Card/Card.style';

interface Props {
  list: News[];
}
const Card = ({ list }: Props) => {
  return (
    <S.CardBox>
      {list.map((item, i) => (
        <S.Card key={i} href="#" className="card-wrapper">
          <S.LabelBox type={item.newsType} className="card-label">
            <p>{item.newsType === 'media' ? item.agency : '최근 업무사례'}</p>
          </S.LabelBox>
          <S.Title className="card-title">{item.title}</S.Title>
          <S.Content className="card-content">{item.content}</S.Content>
          <S.Date className="card-date">
            <p>{item.dateYearMonth}</p>
            <div className="divider" />
          </S.Date>
        </S.Card>
      ))}
    </S.CardBox>
  );
};

export default Card;
