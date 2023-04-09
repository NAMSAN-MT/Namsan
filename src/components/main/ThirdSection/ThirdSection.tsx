import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import useThirdSection from './ThirdSection.hook';
import * as S from './ThirdSection.style';
import { IThirdSectionProps } from './ThirdSection.interface';
import { injectIntl } from 'gatsby-plugin-intl';

const ThirdSection = (props: IThirdSectionProps) => {
  const { handleNavigateTo, mainVideo } = useThirdSection();
  const suffix = props.isMobile ? '_mobile' : '';

  return (
    <AnimationWrapper variantName="transition" initial="hidden" threshold={0.5}>
      <S.BackgroundWrapper>
        <S.ThirdWrapper>
          <S.InnerWrapper>
            <S.LeftWrapper>
              <S.SubTitle>
                {props.intl.formatMessage({
                  id: 'main.title3_1',
                })}
              </S.SubTitle>
              <S.Title
                dangerouslySetInnerHTML={{
                  __html: props.intl.formatMessage({
                    id: `main.title3_2${suffix}`,
                  }),
                }}
              ></S.Title>
              <BaseButton className="primary" onClick={handleNavigateTo}>
                {props.intl.formatMessage({
                  id: 'main.button3_name',
                })}
              </BaseButton>
            </S.LeftWrapper>
            <S.RightWrapper>
              <video
                src={mainVideo}
                autoPlay
                loop
                muted
                width="100%"
                height="100%"
              />
            </S.RightWrapper>
          </S.InnerWrapper>
        </S.ThirdWrapper>
      </S.BackgroundWrapper>
    </AnimationWrapper>
  );
};

export default injectIntl(ThirdSection);
