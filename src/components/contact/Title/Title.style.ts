import { font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  ${font('display42', 'bold')}
  line-height: 60px;
  letter-spacing: -0.6px;

  ${mediaQuery(
    'mobile',
    `
  ${font('mobile24', 'bold')};
  ${lineHeight(24, 36)};
  letter-spacing: -0.4px;
  `,
  )}
`;

export { TitleWrapper };
