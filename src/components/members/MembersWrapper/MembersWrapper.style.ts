import styled from 'styled-components';
import { mediaQuery } from '../../../styles/mixin.style';
const Outer = styled.div`
  padding: 100px 90px;
  box-sizing: content-box;

  ${mediaQuery('tablet1024', `padding: 60px 40px;`)}

  ${mediaQuery(
    'mobile',
    `
  padding: 0px auto;
  padding: 32px 24px;
  `,
  )}
`;

const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;

  ${mediaQuery('pc1278', `width: 100%;`)}
`;

export { Outer, Inner };
