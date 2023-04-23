import { mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';

const ContentSectionWrapper = styled.div`
  margin: 0 auto;
  width: 1200px;
  position: relative;

  ${mediaQuery('pc1380', `width: 944px;`)}
  ${mediaQuery(
    'tablet1024',
    `
  width: 100%;

  & > .title {
    display: none;
  }
  `,
  )}
`;

const Map = styled.div`
  ${size('500px', '100%')};
  margin-top: 40px;
  margin-bottom: 60px;

  & > .map {
    width: 100%;
    height: 100%;
  }

  ${mediaQuery(
    'tablet1024',
    `
  margin-top: 16px;
  margin-bottom: 40px;
  height: 390px;
  width: 100vw;

  & > .map{
    position: absolute;
    top: 0;
    left: -24px;
  }
  `,
  )}
`;

export { ContentSectionWrapper, Map };
