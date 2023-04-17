import React from 'react';
import useFirstSection from './FirstSection.hook';
import * as S from './FirstSection.style';
import { IFirstSectionProps } from './FirstSection.interface';

const FirstSection = (props: IFirstSectionProps) => {
  const { mainVideo } = useFirstSection(props);

  return (
    <S.FrirstWrapper>
      <video src={mainVideo} autoPlay loop muted width="100%" height="100%" />
    </S.FrirstWrapper>
  );
};

export default FirstSection;
