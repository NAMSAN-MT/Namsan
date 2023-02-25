import { flex, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${flex('space-between')};
  width: 100%;
  padding: 0 360px;
  min-height: 620px;
  background-color: ${({ theme }) => theme.color.pointGrey};
`;

const LeftWrapper = styled.div`
  ${flex('center', 'start')};
  flex-direction: column;
`;

const RightWrapper = styled.div`
  ${flex()};
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.dividerGrey200};
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
  margin-bottom: 36px;

  // FIXME: mixin으로 변경
  font-size: 42px;
  font-weight: 700;
  ${lineHeight(42, 60)}};
`;

export { Wrapper, LeftWrapper, RightWrapper, SubTitle, Title };
