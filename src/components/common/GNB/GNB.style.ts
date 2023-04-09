import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import { Link } from 'gatsby';
import styled from 'styled-components';

const GNBWrapper = styled.div`
  ${flex('space-between')};
  width: 100%;
  padding: 0 90px;
  height: 84px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.grey100};

  ${mediaQuery(
    'tablet',
    `
  position: fixed;
  z-index: 100;
  height: 55px;
  top: 0;
  border: none;
  padding: 0 24px;
  background-color: rgba(255, 255, 255, 0.6);)};
  width: 100%;
  
  &.open{
    background-color: rgba(255, 255, 255);)}
  }`,
  )};
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

    ${font('body16', 'bold')};
    ${lineHeight(16, 26)}

    ${mediaQuery(
      'tablet',
      `
    display: none;`,
    )};
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
  ${mediaQuery('tablet', `display: none;`)};
`;

const LanguageLink = styled(Link)<{ $isActive: boolean }>`
  padding: 0 16px;
  text-align: center;
  letter-spacing: -0.1px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.textBlackHigh : theme.color.textBlackMedium};

  ${font('body14', 'bold')}
  ${lineHeight(14, 22)};
  letter-spacing: -0.1px;
`;

const MenuItemList = styled.ul`
  position: absolute;
  top: 55px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  margin: 0;
  height: 100vh;
  padding: 0;
  padding-top: 55px;
  ${flex('flex-start', 'flex-start')};
  flex-direction: column;
  gap: 24px;
`;

const MenuItem = styled.li`
  ${font('mobile26', 'bold')};
  ${lineHeight(26, 36)};
  letter-spacing: -0.4px;
  margin-left: 24px;

  & a {
    color: ${({ theme }) => theme.color.textBlackHigh};
  }
`;

const MobileMenuButton = styled.div`
  display: none;

  ${mediaQuery('tablet', `display: block;`)};
`;

export {
  GNBWrapper,
  LogoWrapper,
  MainLinkWrapper,
  LanguageWrapper,
  LanguageLink,
  MenuItemList,
  MenuItem,
  MobileMenuButton,
};
