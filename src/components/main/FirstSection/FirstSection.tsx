import React, { useEffect, useState } from 'react';
import useFirstSection from './FirstSection.hook';
import * as S from './FirstSection.style';
import { IFirstSectionProps } from './FirstSection.interface';
import { useInView } from 'react-intersection-observer';

import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import { injectIntl } from 'gatsby-plugin-intl';

const FirstSection = (props: IFirstSectionProps) => {
  const {
    onLoadIntro0,
    zero,
    first,
    second,
    third,
    forth,
    seconds,
    intro0,
    intro1,
    intro2,
    intro3,
    intro4,
  } = useFirstSection(props);
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
        <AnimatePresence mode="wait">
          {!first && !second && !third && !forth && (
            <motion.div
              style={{
                width: '100%',
                height: '100%',
              }}
              animate={{ opacity: 1, transition: { duration: 1.5 } }}
            >
              <S.FrirstWrapper>
                <img
                  src={intro0}
                  alt="intro0"
                  onLoad={() => {
                    onLoadIntro0();
                  }}
                />
              </S.FrirstWrapper>
            </motion.div>
          )}
          <motion.div
            style={{
              width: '100%',
              height: '100%',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 3 },
              scale: 1.1,
            }}
            exit={{ opacity: 0, transition: { duration: 3 } }}
            key={seconds}
          >
            {first && (
              <motion.img
                width={'100%'}
                height={'100%'}
                src={intro1}
                alt="intro1"
              />
            )}
            {second && (
              <motion.img
                width={'100%'}
                height={'100%'}
                src={intro2}
                alt="intro2"
              />
            )}
            {third && (
              <motion.img
                width={'100%'}
                height={'100%'}
                src={intro3}
                alt="intro3"
              />
            )}
            {forth && (
              <motion.img
                width={'100%'}
                height={'100%'}
                src={intro4}
                alt="intro14"
              />
            )}
          </motion.div>
        </AnimatePresence>
        {!zero && (
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
        )}
      </S.FrirstWrapper>
    </>
  );
};

export default injectIntl(FirstSection);
