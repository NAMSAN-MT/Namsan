import { flex, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  height: 100%;

  ${mediaQuery('tablet1024', `margin-top: 84px;`)};
  ${mediaQuery('mobile', `margin-top: 56px;`)};
`;

const LayoutContent = styled.div`
  min-height: calc(100% - 84px - 224px);
`;

const TopButtonWrapper = styled.div`
  width: 100%;
  ${flex('flex-end', 'center ')};
  padding-right: 60px;
  padding-bottom: 60px;
  ${mediaQuery(
    'mobile',
    `
     padding-right: 24px;
     padding-bottom: 24px;
    `,
  )};
`;

export { LayoutWrapper, LayoutContent, TopButtonWrapper };
