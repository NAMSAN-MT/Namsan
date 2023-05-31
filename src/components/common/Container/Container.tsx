import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { font, mediaQuery } from '@Styles/mixin.style';

export type ContainerType = {
  title: string;
};

export const ContainerWrapper = styled.div`
  margin: 0px auto 160px;
  max-width: 1200px;
  padding: 100px 0px 0px 0px;

  ${mediaQuery(
    'pc1278',
    `
    padding: 0px 24px;
    padding-top: 70px;
    margin-bottom: 100px;
      `,
  )};

  ${mediaQuery(
    'tablet1024',
    `
    padding: 0px 40px;
    padding-top: 60px;
    margin-bottom: 160px;
    `,
  )}

  ${mediaQuery(
    'mobile',
    `
    padding: 0px 24px;
    padding-top: 32px;
    margin-bottom: 100px;
      `,
  )}
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.color.textBlackHigh};
  ${font('display40', 'bold')}
  margin-bottom: 53px;
  line-height: 1.5;
  ${mediaQuery(
    'mobile',
    `
    ${font('mobile24', 'bold')}
    margin-bottom: 16px;
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
