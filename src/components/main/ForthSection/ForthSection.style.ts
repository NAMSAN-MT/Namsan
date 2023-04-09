import { flex, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';
import { Wrapper } from '../FirstSection/FirstSection.style';

const ForthWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  margin-top: 140px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 calc((100% - 1290px) / 2);
`;

const TopWrapper = styled.div`
  width: 100%;
  ${flex('space-between', 'center')};
`;

const BottomWrapper = styled.div`
  ${flex()};
  margin-top: 43px;
  flex-direction: column;
`;

const Title = styled.div`
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.color.textBlackHigh};

  // FIXME: mixin으로 변경
  font-size: 42px;
  font-weight: 700;
  ${lineHeight(42, 60)};
`;

export { TopWrapper, InnerWrapper, ForthWrapper, BottomWrapper, Title };
