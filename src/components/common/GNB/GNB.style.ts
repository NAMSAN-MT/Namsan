import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GNBWrapper = styled.div<{ isTransparent?: boolean }>`
  ${flex('space-between')};
  width: 100%;
  padding: 0 90px;
  height: 86px;
  position: fixed;
  z-index: 999;
  background: ${({ isTransparent, theme }) =>
    !isTransparent ? 'rgba(255, 255, 255, 0.5)' : theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grey100};
  backdrop-filter: ${({ isTransparent }) =>
    !isTransparent ? 'blur(20px)' : 'blur(0px)'};
  ${({ theme }) =>
    mediaQuery(
      'tablet1024',
      `
      z-index: 100;
      top: 0;
      padding: 0 40px;
      width: 100%;
      &.open{
        background-color: ${theme.color.white};
      }`,
    )};

  ${({ isTransparent, theme }) =>
    mediaQuery(
      'mobile',
      `
      z-index: 100;
      height: 55px;
      top: 0;
      border: ${isTransparent ? 'none' : `1px solid ${theme.color.grey100}`};;
      padding: 0 24px;
      background-color: ${
        isTransparent ? theme.color.transparent : 'rgba(255, 255, 255, 0.5)'
      };
      width: 100%;
      &.open{
        background-color: ${theme.color.white};
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
    &:hover {
      // color: ${({ theme }) => theme.color.blue200};
    }

    text-align: center;
    letter-spacing: -0.2px;

    ${font('body16', 'bold')};
    ${lineHeight(16, 26)}

    ${mediaQuery(
      'tablet1024',
      `
    display: none;`,
    )};
  }
`;

const LinkNameWrapper = styled(motion.div)<{ selected: boolean }>`
  color: ${({ theme, selected }) =>
    selected ? theme.color.blue200 : theme.color.textBlackMedium};
`;
const LinkUnderline = styled(motion.div)`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.color.blue200};
  border-radius: 15px;
`;

const LanguageWrapper = styled.ul`
  ${flex()};
  position: relative;
  ${mediaQuery('tablet1024', `display: none;`)};
`;

const LanguageLink = styled.li<{ $isActive: boolean }>`
  cursor: pointer;
  text-align: center;
  letter-spacing: -0.1px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.textBlackHigh : theme.color.textBlackMedium};

  ${font('body14', 'bold')}
  ${lineHeight(14, 22)};
  letter-spacing: -0.1px;

  &::after {
    content: '|';
    color: ${({ theme }) => theme.color.textBlackDisable};
    margin: 0 20px;
  }

  &:last-child::after {
    content: '';
  }
`;

const MobileMenuWrapper = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  margin: 0;
  height: 100vh;
  padding: 0;
  padding-top: 55px;
`;

const MobileMenuItemList = styled.ul`
  ${flex('flex-start', 'flex-start')};
  flex-direction: column;
  gap: 24px;
`;

const MobileMenuItem = styled.li`
  ${font('mobile26', 'bold')};
  ${lineHeight(26, 36)};
  letter-spacing: -0.4px;
  margin-left: 24px;

  & a {
    color: ${({ theme }) => theme.color.textBlackHigh};
    ${flex()}
  }

  & a.on {
    &::after {
      content: '';
      display: block;
      width: 44px;
      height: 8px;
      background-color: ${({ theme }) => theme.color.blue100};
      margin-left: 20px;
    }
  }
`;

const MobileLanguageWrapper = styled.ul`
  ${flex('flex-start', 'flex-start')};
  ${font('mobile16', 'bold')};
  ${lineHeight(16, 26)};
  margin-top: 62px;
  margin-left: 24px;

  li {
    cursor: pointer;
  }
`;

const MobileLanguageLink = styled.li<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.color.textBlackHigh : theme.color.textBlackDisable};

  &::after {
    content: '|';
    color: ${({ theme }) => theme.color.textBlackDisable};
    margin: 0 12px;
  }

  &:last-child::after {
    content: '';
  }
`;

const MobileMenuButton = styled.div`
  display: none;

  ${mediaQuery('tablet1024', `display: block;`)};
`;

export {
  GNBWrapper,
  LogoWrapper,
  MainLinkWrapper,
  LinkNameWrapper,
  LinkUnderline,
  LanguageWrapper,
  LanguageLink,
  MobileMenuWrapper,
  MobileMenuItemList,
  MobileMenuItem,
  MobileMenuButton,
  MobileLanguageWrapper,
  MobileLanguageLink,
};
