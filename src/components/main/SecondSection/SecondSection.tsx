import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import useSecondSection from './SecondSection.hook';
import * as S from './SecondSection.style';

const SecondSection: React.FC = () => {
  const { handleNavigateTo } = useSecondSection();

  return (
    <AnimationWrapper variantName="transition" initial="hidden" threshold={0.5}>
      <S.SecondWrapper>
        <S.Title>“40년 전통의 팀워크”</S.Title>
        <S.Description>
          법무법인 남산은 깊이 있는 역량과 정성으로 <br />
          고객에게 개별적이고도 충실한 맞춤형 서비스를 제공합니다.
        </S.Description>
        <BaseButton className="primary" onClick={handleNavigateTo}>
          소개 바로가기
        </BaseButton>
      </S.SecondWrapper>
    </AnimationWrapper>
  );
};

export default SecondSection;
