import React from 'react';
import useFirstSection from './FirstSection.hook';
import * as S from './FirstSection.style';

const FirstSection: React.FC = () => {
  const { mainVideo } = useFirstSection();

  return (
    <S.FrirstWrapper>
      <video src={mainVideo} autoPlay loop muted width="100%" height="100%" />
    </S.FrirstWrapper>
  );
};

export default FirstSection;
