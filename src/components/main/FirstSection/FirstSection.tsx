import React, { useEffect, useState } from 'react';
import useFirstSection from './FirstSection.hook';
import * as S from './FirstSection.style';
import { IFirstSectionProps } from './FirstSection.interface';
import { useInView } from 'react-intersection-observer';

import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import { injectIntl } from 'gatsby-plugin-intl';
import { Carousel } from 'react-responsive-carousel';

const FirstSection = (props: IFirstSectionProps) => {
  const { startSlide, intro, pictures, startIntro } = useFirstSection(props);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      props.eventBus(true);
    } else {
      props.eventBus(false);
    }
  }, [inView, props.isDesktop]);

  return (
    <>
      <S.FrirstWrapper ref={ref}>
        {!startSlide ? (
          <S.FrirstWrapper>
            <img
              width={props.isMobile ? '100%' : 'auto'}
              src={intro}
              alt="intro0"
            />
          </S.FrirstWrapper>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1 },
                }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                key={`intro`}
              >
                <Carousel
                  animationHandler="fade"
                  showArrows={false}
                  showStatus={false}
                  showIndicators={false}
                  showThumbs={false}
                  autoPlay={true}
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
              </motion.div>
            </AnimatePresence>
            <S.TextWrapper
              animate={{
                opacity: 1,
                translateY: [20, 0],
                transition: {
                  duration: 3,
                },
              }}
            >
              <S.Title>Namsan</S.Title>
              <S.SubTitle>Lim, Chung & Suh</S.SubTitle>
              <S.Description>
                {props.intl.formatMessage({
                  id: `main.title1`,
                })}
              </S.Description>
            </S.TextWrapper>
          </>
        )}
      </S.FrirstWrapper>
    </>
  );
};

export default injectIntl(FirstSection);
