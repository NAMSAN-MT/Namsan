import { flex, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 90px;
`;

const FrirstWrapper = styled.div`
  ${flex()};
  flex-direction: column;
  width: 100%;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 5e-5) 50%
    ),
    ${({ theme }) => theme.color.blue100};
`;

const Basic = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.textWhiteHigh};
`;

const Title = styled(Basic)`
  letter-spacing: 5px;
  text-transform: uppercase;

  // FIXME: mixin으로 변경
  font-family: 'FHAlphaTestLight';
  font-size: 100px;
  font-weight: 300;
  ${lineHeight(100, 140)}};
`;
const SubTitle = styled(Basic)`
  // FIXME: mixin으로 변경
  font-size: 30px;
  font-weight: 274;
  ${lineHeight(30, 36)}};
`;
const Description = styled(Basic)`
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.color.textWhiteDisable};
  margin-top: 38px;

  // FIXME: mixin으로 변경
  font-size: 26px;
  font-weight: 500;
  ${lineHeight(26, 40)}};
`;

export { Wrapper, FrirstWrapper, Title, SubTitle, Description };
