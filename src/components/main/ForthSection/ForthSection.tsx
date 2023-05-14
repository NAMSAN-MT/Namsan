import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import Loading from '@Components/common/Loading';
import Card from '@Components/news/Card/Card';
import useMain from '@Components/news/Main/Main.hook';
import { injectIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { WithFixedWrapper } from '../FirstSection/FirstSection.style';
import useForthSection from './ForthSection.hook';
import { IForthSectionProps } from './ForthSection.interface';
import * as S from './ForthSection.style';

const ForthSection = (props: IForthSectionProps) => {
  const { handleNavigateTo } = useForthSection();
  const { newsList, onCallMainNewsList } = useMain();

  const threshold = props.isMobile ? 0.2 : props.isTablet ? 0 : 0.2;
  return (
    <AnimationWrapper
      variantName="transition"
      initial="hidden"
      threshold={threshold}
    >
      <WithFixedWrapper>
        <S.ForthWrapper>
          <S.InnerWrapper>
            <S.TopWrapper>
              <S.Title>
                {props.intl.formatMessage({
                  id: `main.button4_title`,
                })}
              </S.Title>
              {!props.isMobile ? (
                <BaseButton className="more" onClick={handleNavigateTo}>
                  {props.intl.formatMessage({
                    id: `main.button4_name1`,
                  })}
                </BaseButton>
              ) : null}
            </S.TopWrapper>
            <S.BottomWrapper>
              <React.Suspense fallback={<Loading height="500px" />}>
                <Card
                  type="main"
                  newsList={newsList.slice(0, 3)}
                  onCallMainNewsList={onCallMainNewsList}
                />
              </React.Suspense>
              {props.isMobile ? (
                <S.ButtonWrapper>
                  <BaseButton
                    className="support-line"
                    onClick={handleNavigateTo}
                  >
                    {props.intl.formatMessage({
                      id: `main.button4_name2`,
                    })}
                  </BaseButton>
                </S.ButtonWrapper>
              ) : null}
            </S.BottomWrapper>
          </S.InnerWrapper>
        </S.ForthWrapper>
      </WithFixedWrapper>
    </AnimationWrapper>
  );
};

export default injectIntl(ForthSection);
