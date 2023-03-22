import styled from 'styled-components';
import { mediaQuery } from '../../../styles/mixin.style';
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 101px auto;
  box-sizing: content-box;
  padding: 0 90px;

  ${mediaQuery(
    'mobile',
    `
  margin: 0px auto;
  padding: 0px 24px;
  `,
  )}
`;

export { Wrapper };
