import Loading from '@Components/common/Loading';
import React, { useEffect } from 'react';
import * as S from '../Card/Card.style';
import { CardProps } from './Card.interface';

const Card = (props: CardProps) => {
  if (props.isLoading) {
    return (
      <div className="loading_cards">
        <Loading height="500px" />
      </div>
    );
  }
  if (props.type === 'main') {
    useEffect(() => {
      props.onCallMainNewsList?.(3);
    }, []);
  }

  return (
    <S.CardBox className="card-box">
      {props.newsList?.map((item, i) => (
        <S.Card
          key={i}
          href={`/news/${item.documentId}`}
          className="card-wrapper"
        >
          <S.LabelBox type={item.newsType} className="card-label">
            <p>{item.newsType === 'media' ? item.agency : '최근 업무사례'}</p>
          </S.LabelBox>
          <S.Title className="card-title">{item.title}</S.Title>
          <S.Content className="card-content">{item.summary}</S.Content>
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
