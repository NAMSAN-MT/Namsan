import React from 'react';
import * as S from './MembersWrapper.style';
import { IMembersWrapperProps } from './MembersWrapper.interface';

const MembersWrapper = (props: IMembersWrapperProps) => {
  return (
    <S.Outer>
      <S.Inner>{props.children}</S.Inner>
    </S.Outer>
  );
};

export default MembersWrapper;
