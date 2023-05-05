import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';
import { Wrapper } from '../FirstSection/FirstSection.style';

const SecondWrapper = styled(Wrapper)`
  ${flex()};
  flex-direction: column;
  width: 100%;
  min-height: 560px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};

  ${mediaQuery(
    'mobile',
    `
      min-height: 304px;
    `,
  )};
`;

const Basic = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.textBlackHigh};
`;

const Title = styled(Basic)`
  letter-spacing: -0.6px;

  ${font('display42', 'bold')}
  ${lineHeight(42, 60)};

  ${mediaQuery(
    'mobile',
    `
      ${font('mobile24', 'bold')},
       letter-spacing: -0.4px;,
       ${lineHeight(24, 36)};
    `,
  )};
`;

const Description = styled(Basic)`
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.color.textBlackMedium};
  margin-top: 12px;
  margin-bottom: 36px;

  ${font('title26', 'medium')}
  ${lineHeight(26, 40)};

  ${mediaQuery(
    'mobile',
    `
      ${font('mobile16', 'regular')};
       letter-spacing: -0.4px;
       ${lineHeight(16, 26)};
       margin-top: 8px;
       margin-bottom: 20px;
    `,
  )};
`;

export { SecondWrapper, Title, Description };
