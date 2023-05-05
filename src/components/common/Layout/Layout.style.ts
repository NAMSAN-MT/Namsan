import { font } from './../../../styles/mixin.style';
import {
  flex,
  flexDirection,
  mediaQuery,
  size,
  lineHeight,
} from '@Styles/mixin.style';
import styled, { keyframes } from 'styled-components';

const LayoutWrapper = styled.div`
  height: 100%;
`;

const LayoutContent = styled.div<{ isMainPage: boolean }>`
  min-height: calc(100% - 84px - 224px);
  padding-top: 86px;
  ${mediaQuery(
    'tablet1024',
    `
     padding-top: 86px;
    `,
  )};
  ${({ isMainPage }) =>
    mediaQuery(
      'mobile',
      `${isMainPage ? 'padding-top: 0;' : 'padding-top: 56px;'}`,
    )};
`;

const TopButtonWrapper = styled.div`
  width: 100%;
  ${flex('flex-end', 'center ')};
  padding-right: 90px;
  padding-bottom: 60px;
  ${mediaQuery(
    'tablet1024',
    `
     padding-right: 40px;
     padding-bottom: 40px;
    `,
  )};
  ${mediaQuery(
    'mobile',
    `
     padding-right: 24px;
     padding-bottom: 24px;
    `,
  )};
`;

const FloatingWrapper = styled.div`
  width: 100%;
  ${flex('space-between', 'center ')};
  position: fixed;
  right: 90px;
  bottom: 284px;

  .blank {
  }
  .area {
    width: 60px;
    ${flexDirection('column')}
    gap: 12px;
  }

  ${mediaQuery(
    'tablet1024',
    `
     right: 40px;
     bottom: 276px;
    `,
  )};
  ${mediaQuery(
    'mobile',
    `
     right: 24px;
     bottom: 266px;
    `,
  )};
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ToastWrapper = styled.div<{ isVisible: boolean }>`
  ${flex()}
  ${size('48px', '100%')}
  position: fixed;
  bottom: 284px;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.45s ease-out;
  transition: visibility 0.45s ease-out;
`;

const Toast = styled.span`
  ${flex()}
  ${size('48px', '320px')}

  background: ${({ theme }) => theme.color.black};
  opacity: 0.85;
  border-radius: 10px;

  ${font('body16', 'regular')}
  ${lineHeight(16, 26)}
  text-align: center;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.color.white};
`;

export {
  LayoutWrapper,
  LayoutContent,
  TopButtonWrapper,
  FloatingWrapper,
  ToastWrapper,
  Toast,
};
