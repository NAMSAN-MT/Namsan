import React from 'react';
import * as S from './Loading.style';
import ClipLoader from 'react-spinners/ClipLoader';
import { ILoadingProps } from './Loading.interface';
import { color } from '@Styles/varialbes.style';

const CustomLoading = (props: ILoadingProps) => {
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

export default CustomLoading;
