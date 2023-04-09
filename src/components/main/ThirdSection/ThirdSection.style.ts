import { flex, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';
import { Wrapper } from '../FirstSection/FirstSection.style';

const BackgroundWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.pointGrey};
`;

const ThirdWrapper = styled(Wrapper)`
  max-width: 1200px;
  margin: 0 auto;
`;

const InnerWrapper = styled.div`
  ${flex('space-between')};
  width: 100%;
  overflow: hidden;
  height: 620px;
  padding: 0 calc((100% - 1290px) / 2);
`;

const LeftWrapper = styled.div`
  ${flex('center', 'start')};
  flex-direction: column;
`;

const RightWrapper = styled.div`
  ${flex('end', 'center')};
  width: 670px;
  gap: 24px;
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

  // FIXME: mixin으로 변경
  font-size: 26px;
  font-weight: 500;
  ${lineHeight(26, 40)}};
`;

const Title = styled(Basic)`
  letter-spacing: -0.6px;
  margin-top: 12px;
  margin-bottom: 32px;

  // FIXME: mixin으로 변경
  font-size: 42px;
  font-weight: 700;
  ${lineHeight(42, 60)}};
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
