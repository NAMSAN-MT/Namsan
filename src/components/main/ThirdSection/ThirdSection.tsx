import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import ImageCard from '../ImageCard';
import { ImageCardList1, ImageCardList2 } from '../ImageCard/ImageCard.const';
import useThirdSection from './ThirdSection.hook';
import * as S from './ThirdSection.style';

const ThirdSection: React.FC = () => {
  const { handleNavigateTo, mainVideo } = useThirdSection();

  return (
    <AnimationWrapper variantName="transition" initial="hidden" threshold={0.5}>
      <S.ThirdWrapper>
        <S.InnerWrapper>
          <S.LeftWrapper>
            <S.SubTitle>법무법인 남산은</S.SubTitle>
            <S.Title>
              고객에게 최적화된 <br />
              맞춤형 법률서비스를 <br />
              제공하고 있습니다.
            </S.Title>
            <BaseButton className="primary" onClick={handleNavigateTo}>
              업무분야 바로가기
            </BaseButton>
          </S.LeftWrapper>
          <S.RightWrapper>
            {/* <video
              src={mainVideo}
              autoPlay
              loop
              muted
              width="100%"
              height="100%"
            /> */}
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
    </AnimationWrapper>
  );
};

export default ThirdSection;
