import React, { useEffect } from 'react';
import useFirstSection from './FirstSection.hook';
import * as S from './FirstSection.style';
import { IFirstSectionProps } from './FirstSection.interface';
import { useInView } from 'react-intersection-observer';

import _ from 'lodash';
import { injectIntl } from 'gatsby-plugin-intl';
import { Carousel } from 'react-responsive-carousel';

const FirstSection = (props: IFirstSectionProps) => {
  const { startSlide, intro, pictures } = useFirstSection(props);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      props.eventBus(true);
    } else {
      props.eventBus(false);
    }
  }, [inView, props.isDesktop]);

  return (
    <S.FrirstWrapper ref={ref}>
      <div
        style={{
          width: '100%',
          height: !props.isMobile ? '760px' : '560px',
          position: !startSlide ? 'static' : 'absolute',
          opacity: !startSlide ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <S.FrirstWrapper>
          <img width={props.isMobile ? '100%' : 'auto'} src={intro} />
        </S.FrirstWrapper>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: startSlide ? 'static' : 'absolute',
          opacity: startSlide ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
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
      </div>
      <S.TextWrapper
        style={{
          visibility: startSlide ? 'visible' : 'hidden',
          position: 'absolute',
          opacity: startSlide ? 1 : 0,
          transition: 'opacity 1s ease-in',
        }}
      >
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
    </S.FrirstWrapper>
  );
};

export default injectIntl(FirstSection);
