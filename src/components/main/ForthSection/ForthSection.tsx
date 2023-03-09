import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import SummaryNews from '../SummaryNews';
import { newsList } from './ForthSection.const';
import useForthSection from './ForthSection.hook';
import * as S from './ForthSection.style';

const ForthSection: React.FC = () => {
  const { handleNavigate } = useForthSection();

  return (
    <S.ForthWrapper>
      <S.InnerWrapper>
        <S.TopWrapper>
          <S.Title>남산소식</S.Title>
          <BaseButton className="more" onClick={handleNavigate}>
            더 보러가기
          </BaseButton>
        </S.TopWrapper>
        <S.BottomWrapper>
          {newsList
            .filter((_, index) => index < 3)
            .map((news, index) => (
              <SummaryNews
                lastIndex={index === 2}
                title={news.title}
                tag={news.tag}
                date={news.date}
              />
            ))}
        </S.BottomWrapper>
      </S.InnerWrapper>
    </S.ForthWrapper>
  );
};

export default ForthSection;
