import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import React, { useState } from 'react';
import useForthSection from './ForthSection.hook';
import * as S from './ForthSection.style';
import { IForthSectionProps } from './ForthSection.interface';
import { injectIntl } from 'gatsby-plugin-intl';
import Card from '@Components/news/Card/Card';
import { WithFixedWrapper } from '../FirstSection/FirstSection.style';
import useMain from '@Components/news/Main/Main.hook';

const ForthSection = (props: IForthSectionProps) => {
  const { handleNavigateTo } = useForthSection();
  const { urlPage, newsType, newsList, onCallNewsList } = useMain();
  const [searchValue, setSearchValue] = useState('');

  const threshold = props.isMobile ? 0.2 : props.isTablet ? 0 : 0.5;
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
              <Card
                newsList={newsList.slice(0, 3)}
                {...{ urlPage, newsType, onCallNewsList, searchValue }}
              />
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
