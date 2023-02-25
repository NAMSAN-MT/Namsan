import { flex } from '@Styles/mixin.style';
import { Link } from 'gatsby';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  ${flex()};
  flex-direction: column;
  width: 100%;
  padding: 0 90px;
  height: 224px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.grey200};
`;

const FirstSection = styled.div`
  ${flex('space-between')};
  width: 100%;
`;

const LogoWrapper = styled.div`
  width: 110px;
`;

const TermAndConditionLink = styled(Link)`
  text-align: center;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.color.grey500};

  // FIXME: mixin으로 변경
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;

  .divider {
    padding: 0 16px;
    font-size: 16px;
    width: 1px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.grey200};
  }
`;

const SecondSection = styled.div`
  width: 100%;
  padding-top: 24px;
  span {
    letter-spacing: -0.1px;
    color: ${({ theme }) => theme.color.grey500};
    margin-right: 10px;

    // FIXME: mixin으로 변경
    font-size: 14px;
    font-weight: 350;
    line-height: 22px;
  }
`;

export {
  FooterWrapper,
  FirstSection,
  LogoWrapper,
  SecondSection,
  TermAndConditionLink,
};
