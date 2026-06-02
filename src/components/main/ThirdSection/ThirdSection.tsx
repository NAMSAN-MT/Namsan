import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import useThirdSection from './ThirdSection.hook';
import * as S from './ThirdSection.style';
import { IThirdSectionProps } from './ThirdSection.interface';
import { useTranslations } from 'next-intl';
import { WithFixedWrapper } from '../FirstSection/FirstSection.style';

const ThirdSection = (props: IThirdSectionProps) => {
  const { handleNavigateTo, mainVideo, mainPoster, isKakaoBrower } =
    useThirdSection(props);
  const t = useTranslations();
  const suffix = props.isMobile ? '_mobile' : '';
  const threshold = props.isMobile ? 0.1 : props.isTablet ? 0.2 : 0.2;

  return (
    <AnimationWrapper
      variantName="transition"
      initial="hidden"
      threshold={threshold}
    >
      <S.BackgroundWrapper>
        <WithFixedWrapper>
          <S.ThirdWrapper>
            <S.InnerWrapper>
              <S.LeftWrapper>
                <S.SubTitle>{t('main.title3_1')}</S.SubTitle>
                <S.Title
                  dangerouslySetInnerHTML={{
                    __html: t.raw(`main.title3_2${suffix}`),
                  }}
                ></S.Title>
                <BaseButton className="primary" onClick={handleNavigateTo}>
                  {t('main.button3_name')}
                </BaseButton>
              </S.LeftWrapper>
              <S.RightWrapper>
                <video
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                  src={!isKakaoBrower ? mainVideo : undefined}
                  width="100%"
                  height="100%"
                  poster={mainPoster}
                ></video>
              </S.RightWrapper>
            </S.InnerWrapper>
          </S.ThirdWrapper>
        </WithFixedWrapper>
      </S.BackgroundWrapper>
    </AnimationWrapper>
  );
};

export default ThirdSection;
