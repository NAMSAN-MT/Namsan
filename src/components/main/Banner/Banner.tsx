import React from 'react';
import * as S from './Banner.style';
import { IBannerProps } from './Banner.interface';
import BaseButton from '@Components/common/BaseButton';

const SummaryNews: React.FC<IBannerProps> = (props: IBannerProps) => {
  return (
    <S.BannerWrapper even={props.even}>
      <S.Tag>{props.tag}</S.Tag>
      <S.ContentsWrapper>
        <S.Title>{props.title}</S.Title>
        <BaseButton className="outline" onClick={props.onClick}>
          {props.buttonTitle}
        </BaseButton>
      </S.ContentsWrapper>
    </S.BannerWrapper>
  );
};

export default SummaryNews;
