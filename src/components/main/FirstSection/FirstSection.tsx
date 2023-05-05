import React, { useEffect } from 'react';
import useFirstSection from './FirstSection.hook';
import * as S from './FirstSection.style';
import { IFirstSectionProps } from './FirstSection.interface';
import { useInView } from 'react-intersection-observer';

const FirstSection = (props: IFirstSectionProps) => {
  const { mainVideo } = useFirstSection(props);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (props.isDesktop) return;

    if (inView) {
      props.eventBus(true);
    } else {
      props.eventBus(false);
    }
  }, [inView, props.isDesktop]);

  return (
    <S.FrirstWrapper ref={ref}>
      <video
        src={mainVideo}
        autoPlay
        loop
        muted
        width="100%"
        height="100%"
        playsInline
      />
    </S.FrirstWrapper>
  );
};

export default FirstSection;
