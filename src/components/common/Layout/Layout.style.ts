import { flex, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  height: 100%;
`;

const LayoutContent = styled.div<{ isMainPage: boolean }>`
  min-height: calc(100% - 84px - 224px);
  padding-top: 86px;
  ${mediaQuery(
    'tablet1024',
    `
     padding-top: 86px;
    `,
  )};
  ${({ isMainPage }) =>
    mediaQuery(
      'mobile',
      `${isMainPage ? 'padding-top: 0;' : 'padding-top: 56px;'}`,
    )};
`;

const TopButtonWrapper = styled.div`
  width: 100%;
  ${flex('flex-end', 'center ')};
  padding-right: 90px;
  padding-bottom: 90px;
  ${mediaQuery(
    'tablet1024',
    `
     padding-right: 40px;
     padding-bottom: 40px;
    `,
  )};
  ${mediaQuery(
    'mobile',
    `
     padding-right: 24px;
     padding-bottom: 24px;
    `,
  )};
`;

export { LayoutWrapper, LayoutContent, TopButtonWrapper };
