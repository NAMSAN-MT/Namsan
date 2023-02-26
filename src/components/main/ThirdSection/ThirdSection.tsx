import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import ImageCard from '../ImageCard';
import { ImageCardList1, ImageCardList2 } from '../ImageCard/ImageCard.const';
import useSecondSection from './ThirdSection.hook';

import * as S from './ThirdSection.style';

const SecondSection: React.FC = () => {
  const { handleNavigate } = useSecondSection();

  return (
    <S.ThirdWrapper>
      <S.InnerWrapper>
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
        <S.RightWrapper>
          <S.CardWrapper>
            {ImageCardList1.map(item => (
              <ImageCard imageUrl={item.url}>{item.title}</ImageCard>
            ))}
          </S.CardWrapper>
          <S.CardWrapper isDown>
            {ImageCardList2.map(item => (
              <ImageCard imageUrl={item.url}>{item.title}</ImageCard>
            ))}
          </S.CardWrapper>
        </S.RightWrapper>
      </S.InnerWrapper>
    </S.ThirdWrapper>
  );
};

export default SecondSection;
