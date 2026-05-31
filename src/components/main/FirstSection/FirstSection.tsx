import React, { useEffect } from 'react';
import useFirstSection from './FirstSection.hook';
import * as S from './FirstSection.style';
import { IFirstSectionProps } from './FirstSection.interface';
import { useInView } from 'react-intersection-observer';

import { withTranslations } from '@Hocs/withTranslations';
import { Carousel } from 'react-responsive-carousel';

const FirstSection = (props: IFirstSectionProps) => {
  const { startSlide, intro, pictures } = useFirstSection(props);
  const [ref, inView] = useInView();

  useEffect(() => {
    props.eventBus(inView);
  }, [inView, props.eventBus]);

  return (
    <S.FirstWrapper ref={ref}>
      <S.Layer $active={!startSlide}>
        <S.IntroImg src={intro} alt="intro" />
      </S.Layer>
      <S.Layer $active={startSlide}>
        <Carousel
          animationHandler="fade"
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          autoPlay={startSlide}
          infiniteLoop={true}
          stopOnHover={false}
          swipeable={false}
          dynamicHeight={false}
          width={'100%'}
          emulateTouch={false}
          interval={5000}
          transitionTime={1000}
        >
          {pictures.map((picture, index) => (
            <S.ScaleWrapper key={index}>
              <img
                height={!props.isMobile ? '100%' : 'auto'}
                src={picture}
                alt={`intro ${index}`}
              />
            </S.ScaleWrapper>
          ))}
        </Carousel>
      </S.Layer>
      <S.TextWrapper $visible={startSlide}>
        {props.isMobile ? (
          <>
            <S.Title>
              {props.intl.formatMessage({
                id: `main.title1`,
              })}
            </S.Title>
            <S.SubTitle>Lim, Chung & Suh</S.SubTitle>
          </>
        ) : (
          <>
            <S.Title>Namsan</S.Title>
            <S.SubTitle>Lim, Chung & Suh</S.SubTitle>
            <S.Description>
              {props.intl.formatMessage({
                id: `main.title1`,
              })}
            </S.Description>
          </>
        )}
      </S.TextWrapper>
    </S.FirstWrapper>
  );
};

export default withTranslations(FirstSection);
