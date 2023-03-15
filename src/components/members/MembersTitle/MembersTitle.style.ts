import { font, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';
import { mediaQuery } from '../../../styles/mixin.style';

const MembersTitle = styled.h1`
  ${font('display40', 'bold')}
  ${lineHeight(40, 60)}
  margin-bottom: 48px;

  ${mediaQuery(
    'mobile',
    `
    ${font('mobile24', 'bold')}
    ${lineHeight(24, 36)}
    margin-top: 48px;
    margin-bottom: 28px;
    `,
  )}

  @media screen() {
  }
`;

export { MembersTitle };
