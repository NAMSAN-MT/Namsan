import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';
import { Wrapper } from '../FirstSection/FirstSection.style';

const BackgroundWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.pointGrey};
`;

const ThirdWrapper = styled(Wrapper)``;

const InnerWrapper = styled.div`
  ${flex('space-between')};
  width: 100%;
  overflow: hidden;
  padding: 0 calc((100% - 1290px) / 2);
  min-height: 620px;

  ${mediaQuery(
    'tablet1024',
    `
    //  min-height: unset;
    `,
  )};

  ${mediaQuery(
    'mobile',
    `
     min-height: 730px;
     ${flex('start', 'start')};
     flex-direction: column;
     padding: 60px 0 72px;
    `,
  )};
`;

const LeftWrapper = styled.div`
  ${flex('center', 'start')};
  width: 50%;
  flex-direction: column;
  ${mediaQuery(
    'mobile',
    `
     padding: 0 24px 44px;
     width: 100%;
    `,
  )};
`;

const RightWrapper = styled.div`
  ${flex('end', 'center')};
  width: 50%;
  gap: 24px;
  ${mediaQuery(
    'mobile',
    `
     width: 100%;
     gap: 0;
    `,
  )};
  video {
    height: 100%;
    object-fit: cover;
    ${mediaQuery(
      'tablet1024',
      `
      object-fit: fill;
      `,
    )};

    ${mediaQuery(
      'mobile',
      `
      height: 100%;
      object-fit: contain;
      `,
    )};
  }
`;

const CardWrapper = styled.div<{ isDown?: boolean }>`
  ${flex()};
  flex-direction: column;
  gap: 24px;
  margin-top: ${({ isDown }) => (isDown ? '360px' : '0')};
`;

const Basic = styled.div`
  color: ${({ theme }) => theme.color.textBlackHigh};
`;

const SubTitle = styled(Basic)`
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.color.textBlackMedium};

  ${font('title26', 'medium')}
  ${lineHeight(26, 40)};
  ${mediaQuery(
    'mobile',
    `
      ${font('mobile16', 'bold')};
      ${lineHeight(16, 26)};
      letter-spacing: -0.2px;
    `,
  )};
`;

const Title = styled(Basic)`
  letter-spacing: -0.6px;
  margin-top: 12px;
  margin-bottom: 32px;

  ${font('display42', 'bold')}
  ${lineHeight(42, 60)};
  ${mediaQuery(
    'mobile',
    `
      ${font('mobile24', 'bold')};
      ${lineHeight(24, 36)};
      letter-spacing: -0.4px;
      margin-top: 10px;
      margin-bottom: 24px;
    `,
  )};
`;

export {
  BackgroundWrapper,
  ThirdWrapper,
  InnerWrapper,
  LeftWrapper,
  RightWrapper,
  CardWrapper,
  SubTitle,
  Title,
};
