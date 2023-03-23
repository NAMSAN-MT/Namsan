import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { font } from '../../../styles/mixin.style';

export type ContainerType = {
  title: string;
};

export const ContainerWrapper = styled.div`
  margin: 180px 180px 386px 180px;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.color.textBlackHigh};
  ${font('display40', 'bold')}
  margin-bottom: 60px;
`;

export const Container = ({
  title,
  children,
}: PropsWithChildren<ContainerType>) => {
  return (
    <ContainerWrapper>
      <Title>{title}</Title>
      {children}
    </ContainerWrapper>
  );
};
