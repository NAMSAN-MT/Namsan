import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import useDateFns from '@Hooks/useDateFns';
import React from 'react';
import SummaryNews from '../SummaryNews';
import useForthSection from './ForthSection.hook';
import * as S from './ForthSection.style';
import { IForthSectionProps } from './ForthSection.interface';
import { injectIntl } from 'gatsby-plugin-intl';
import Card from '@Components/news/Card/Card';
import { WithFixedWrapper } from '../FirstSection/FirstSection.style';

const ForthSection = (props: IForthSectionProps) => {
  const { handleNavigateTo, newsList } = useForthSection();
  const { convertToDateString } = useDateFns();
  const threshold = props.isMobile ? 0.2 : props.isTablet ? 0 : 0.5;

  console.log(props, '--');

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
              {newsList
                ? newsList.map((news, index) => (
                    <Card
                      key={index}
                      title={news.title}
                      newsType={news.newsType}
                      content={news.content}
                      agency={news.agency}
                      originalLink={news.originalLink}
                      date={news.date}
                      dateYearMonth={convertToDateString(
                        news.date.toDate(),
                        'yyyy.MM',
                      )}
                    />
                  ))
                : null}
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
