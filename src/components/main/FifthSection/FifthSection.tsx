import React from 'react';
import Banner from '../Banner';
import { bannerList } from './FifthSection.const';
import useFifthSection from './FifthSection.hook';
import * as S from './FifthSection.style';
import { IFifthSectionProps } from './FifthSection.interface';

const FifthSection = (props: IFifthSectionProps) => {
  const { handleNavigateTo } = useFifthSection();

  return (
    <S.FifthWrapper>
      <S.InnerWrapper>
        {bannerList.map((banner, index) => (
          <Banner
            key={index}
            isMobile={props.isMobile}
            title={banner.title}
            tag={banner.tag}
            buttonTitle={banner.buttonName}
            onClick={handleNavigateTo}
            even={index % 2 === 0}
            index={index + 1}
          />
        ))}
      </S.InnerWrapper>
    </S.FifthWrapper>
  );
};

export default FifthSection;
