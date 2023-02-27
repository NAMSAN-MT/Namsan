import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import useForthSection from './ForthSection.hook';
import * as S from './ForthSection.style';

const ForthSection: React.FC = () => {
  const { handleNavigate } = useForthSection();

  return (
    <S.ForthWrapper>
      <S.InnerWrapper>
        <S.TopWrapper>
          <S.Title>남산소식</S.Title>
          <BaseButton className="text" onClick={handleNavigate}>
            더 보러가기
          </BaseButton>
        </S.TopWrapper>
        <S.BottomWrapper></S.BottomWrapper>
      </S.InnerWrapper>
    </S.ForthWrapper>
  );
};

export default ForthSection;
