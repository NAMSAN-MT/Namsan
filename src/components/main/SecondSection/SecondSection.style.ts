import { flex, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${flex()};
  flex-direction: column;
  width: 100%;
  min-height: 560px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
`;

const Basic = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.textBlackHigh};
`;

const Title = styled(Basic)`
  letter-spacing: -0.6px;

  // FIXME: mixin으로 변경
  font-size: 42px;
  font-weight: 700;
  ${lineHeight(42, 60)}};
`;

const Description = styled(Basic)`
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.color.textBlackMedium};
  margin-top: 12px;
  margin-bottom: 36px;

  // FIXME: mixin으로 변경
  font-size: 26px;
  font-weight: 500;
  ${lineHeight(26, 40)}};
`;

export { Wrapper, Title, Description };
