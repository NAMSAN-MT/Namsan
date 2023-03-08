import React from 'react';
import * as S from './FirstSection.style';

const FirstSection: React.FC = () => {
  return (
    <S.FrirstWrapper>
      <S.Title>Namsan</S.Title>
      <S.SubTitle>Lim, Chung & Suh</S.SubTitle>
      <S.Description>
        법무법인 남산은 세대를 넘어 고객과 함께 해왔습니다.
      </S.Description>
    </S.FrirstWrapper>
  );
};

export default FirstSection;
