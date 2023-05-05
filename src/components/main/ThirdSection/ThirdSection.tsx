import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import useThirdSection from './ThirdSection.hook';
import * as S from './ThirdSection.style';
import { IThirdSectionProps } from './ThirdSection.interface';
import { injectIntl } from 'gatsby-plugin-intl';
import { WithFixedWrapper } from '../FirstSection/FirstSection.style';

const ThirdSection = (props: IThirdSectionProps) => {
  const { handleNavigateTo, mainVideo } = useThirdSection(props);
  const suffix = props.isMobile ? '_mobile' : '';

  return (
    <AnimationWrapper variantName="transition" initial="hidden" threshold={0.5}>
      <S.BackgroundWrapper>
        <WithFixedWrapper>
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
                <video autoPlay loop muted width="100%" height="100%">
                  <source src={mainVideo} type="video/mp4" />
                </video>
              </S.RightWrapper>
            </S.InnerWrapper>
          </S.ThirdWrapper>
        </WithFixedWrapper>
      </S.BackgroundWrapper>
    </AnimationWrapper>
  );
};

export default injectIntl(ThirdSection);
