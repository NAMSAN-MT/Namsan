import React from 'react';
import Banner from '../Banner';
import { bannerList } from './FifthSection.const';
import useFifthSection from './FifthSection.hook';
import * as S from './FifthSection.style';

const FifthSection: React.FC = () => {
  const { handleNavigate } = useFifthSection();

  return (
    <S.FifthWrapper>
      <S.InnerWrapper>
        {bannerList.map((banner, index) => (
          <Banner
            title={banner.title}
            tag={banner.tag}
            buttonTitle={banner.buttonName}
            onClick={handleNavigate}
            even={index % 2 === 0}
          />
        ))}
      </S.InnerWrapper>
    </S.FifthWrapper>
  );
};

export default FifthSection;
