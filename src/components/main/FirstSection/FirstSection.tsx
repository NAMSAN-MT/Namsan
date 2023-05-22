import React, { useEffect } from 'react';
import useFirstSection from './FirstSection.hook';
import * as S from './FirstSection.style';
import { IFirstSectionProps } from './FirstSection.interface';
import { useInView } from 'react-intersection-observer';

const FirstSection = (props: IFirstSectionProps) => {
  const { mainVideo } = useFirstSection(props);
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
      <video
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        src={mainVideo}
        width="100%"
        height="100%"
      />
    </S.FrirstWrapper>
  );
};

export default FirstSection;
