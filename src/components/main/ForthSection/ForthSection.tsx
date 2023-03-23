import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import useDateFns from '@Hooks/useDateFns';
import React from 'react';
import SummaryNews from '../SummaryNews';
import useForthSection from './ForthSection.hook';
import * as S from './ForthSection.style';

const ForthSection: React.FC = () => {
  const { handleNavigateTo, newsList } = useForthSection();
  const { convertToDateString } = useDateFns();

  return (
    <AnimationWrapper variantName="transition" initial="hidden" threshold={0.5}>
      <S.ForthWrapper>
        <S.InnerWrapper>
          <S.TopWrapper>
            <S.Title>남산소식</S.Title>
            <BaseButton className="more" onClick={handleNavigateTo}>
              더 보러가기
            </BaseButton>
          </S.TopWrapper>
          <S.BottomWrapper>
            {newsList
              ? newsList.map((news, index) => (
                  <SummaryNews
                    key={index}
                    lastIndex={index === 2}
                    title={news.title}
                    tag={news.agency}
                    date={convertToDateString(news.date.toDate(), 'yyyy.MM')}
                  />
                ))
              : null}
          </S.BottomWrapper>
        </S.InnerWrapper>
      </S.ForthWrapper>
    </AnimationWrapper>
  );
};

export default ForthSection;
