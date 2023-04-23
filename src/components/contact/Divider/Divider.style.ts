import { mediaQuery, size } from '@Styles/mixin.style';
import { defaultColors } from '@Styles/varialbes.style';
import styled from 'styled-components';

const DividerWrapper = styled.div`
  ${size('1px', '100%')}
  margin: 0 auto;
  background-color: ${defaultColors.grey200};
`;

export { DividerWrapper };
