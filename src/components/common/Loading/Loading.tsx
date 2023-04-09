import React from 'react';
import * as S from './Loading.style';
import 'react-loading-skeleton/dist/skeleton.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { ILoadingProps } from './Loading.interface';
import { color } from '@Styles/varialbes.style';

const CustomSkeleton = (props: ILoadingProps) => {
  return (
    <S.LoadingWrapper height={props.height}>
      <ClipLoader
        color={color.blue300}
        size={35}
        aria-label="Loading"
        data-testid="loader"
      />
    </S.LoadingWrapper>
  );
};

export default CustomSkeleton;
