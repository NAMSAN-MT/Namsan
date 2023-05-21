import { font, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';
import { mediaQuery } from '../../../styles/mixin.style';

const MembersTitle = styled.h1`
  ${font('display40', 'bold')}
  ${lineHeight(40, 60)}
  letter-spacing: -0.6px;
  margin-bottom: 48px;

  ${mediaQuery('tablet1024', `margin-bottom: 40px`)}

  ${mediaQuery(
    'mobile',
    `
    ${font('mobile24', 'bold')}
    ${lineHeight(24, 36)}
    margin-top: 0;
    margin-bottom: 16px;
    `,
  )}
`;

export { MembersTitle };
