import { mediaQuery, size } from '@Styles/mixin.style';
import { defaultColors } from '@Styles/varialbes.style';
import styled from 'styled-components';

const DividerWrapper = styled.div`
  ${size('1px', '1200px')}
  margin: 0 auto;
  background-color: ${defaultColors.grey200};

  ${mediaQuery('tablet1024', `${size('1px', '944px')}`)}
`;

export { DividerWrapper };
