import React from 'react';
import * as S from './ImageCard.style';
import { IImageCardProps } from './ImageCard.interface';

const SecondSection: React.FC<IImageCardProps> = (props: IImageCardProps) => {
  return <S.CardWrapper url={props.imageUrl}>{props.children}</S.CardWrapper>;
};

export default SecondSection;
