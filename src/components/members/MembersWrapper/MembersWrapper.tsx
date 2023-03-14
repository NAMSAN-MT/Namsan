import React from 'react';
import * as S from './MembersWrapper.style';
import { IMembersWrapperProps } from './MembersWrapper.interface';

const MembersWrapper = (props: IMembersWrapperProps) => {
  return <S.Wrapper>{props.children}</S.Wrapper>;
};

export default MembersWrapper;
