import { mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';

const ContentSectionWrapper = styled.div`
  margin: 0 auto;
  width: 1200px;
  position: relative;

  ${mediaQuery(
    'pc1380',
    `
    width: 100%;`,
  )}
  ${mediaQuery(
    'mobile',
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

  & * {
    z-index: 0;
  }

  & > .map {
    width: 100%;
    height: 100%;

    & div {
      border-radius: 6px;
    }
  }

  ${mediaQuery(
    'mobile',
    `
  margin-top: 0px;
  margin-bottom: 40px;
  height: 390px;
  width: calc(100vw - 40px);

  & > .map{
    position: absolute;
    top: 0;
    left: -24px;
    width: 100vw;
    border-radius: 6px;


  }
  `,
  )}
`;

export { ContentSectionWrapper, Map };
