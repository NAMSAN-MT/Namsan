import { mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const ContactWrapper = styled.div`
  margin: 100px 90px 242px 90px;

  ${mediaQuery('pc1380', `margin: 60px 40px 200px 40px;`)};
  ${mediaQuery('tablet1024', `margin: 16px 24px 100px 24px;`)};
`;

export { ContactWrapper };
