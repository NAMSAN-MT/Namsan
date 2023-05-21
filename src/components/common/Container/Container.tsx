import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { font, mediaQuery } from '@Styles/mixin.style';

export type ContainerType = {
  title: string;
};

export const ContainerWrapper = styled.div`
  margin: 104px auto 160px;
  max-width: 1200px;
  padding: 0px 90px;

  ${mediaQuery(
    'pc1278',
    `
    padding: 0px 24px;
    margin-top: 70px;
    margin-bottom: 100px;
      `,
  )};

  ${mediaQuery(
    'tablet1024',
    `
    padding: 0px 40px;
    margin-top: 36px;
    `,
  )}

  ${mediaQuery(
    'mobile',
    `
    padding: 0px 24px;
    margin-top: 38px;
    margin-bottom: 100px;
      `,
  )}
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.color.textBlackHigh};
  ${font('display40', 'bold')}
  margin-bottom: 73px;

  ${mediaQuery(
    'mobile',
    `
    ${font('mobile24', 'bold')}
    margin-bottom: 28px;
  `,
  )}
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
