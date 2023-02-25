import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import useSecondSection from './ThirdSection.hook';
import * as S from './ThirdSection.style';

const SecondSection: React.FC = () => {
  const { handleNavigate } = useSecondSection();

  return (
    <S.Wrapper>
      <S.LeftWrapper>
        <S.SubTitle>법무법인 남산은</S.SubTitle>
        <S.Title>
          고객에게 최적화된 <br />
          맞춤형 법률서비스를 <br />
          제공하고 있습니다.
        </S.Title>
        <BaseButton className="primary" onClick={handleNavigate}>
          업무분야 바로가기
        </BaseButton>
      </S.LeftWrapper>
      <S.RightWrapper></S.RightWrapper>
    </S.Wrapper>
  );
};

export default SecondSection;
