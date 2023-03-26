import { flex } from '@Styles/mixin.style';
import { Link } from 'gatsby';
import styled from 'styled-components';

const GNBWrapper = styled.div`
  ${flex('space-between')};
  width: 100%;
  padding: 0 90px;
  height: 84px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.grey100};
`;

const LogoWrapper = styled.div`
  width: 84px;
`;

const MainLinkWrapper = styled.div`
  ${flex()};
  .link {
    margin: 0 34px;
    color: ${({ theme }) => theme.color.textBlackMedium};
    text-align: center;
    letter-spacing: -0.2px;

    // FIXME: mixin으로 변경
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
  }
`;

const LanguageWrapper = styled.div`
  ${flex()};
  position: relative;
  .divider {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    width: 1px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.grey200};
  }
`;

const LanguageLink = styled(Link)<{ $isActive: boolean }>`
  padding: 0 16px;
  text-align: center;
  letter-spacing: -0.1px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.textBlackHigh : theme.color.textBlackMedium};

  // FIXME: mixin으로 변경
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`;

export {
  GNBWrapper,
  LogoWrapper,
  MainLinkWrapper,
  LanguageWrapper,
  LanguageLink,
};
