import { mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';

const ContentSectionWrapper = styled.div`
  margin: 0 auto;
  width: 1200px;

  ${mediaQuery('tablet1024', `width: 944px;`)}
`;

const Map = styled.div`
  ${size('500px', '100%')};
  margin-top: 40px;
  margin-bottom: 60px;
`;

export { ContentSectionWrapper, Map };
