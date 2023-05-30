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

const LayoutContent = styled.div<{
  isMainPage: boolean;
  isNewsDetailPage: boolean;
}>`
  min-height: calc(100% - 84px - 224px);
  padding-top: 86px;
  ${mediaQuery(
    'tablet1024',
    `
     padding-top: 86px;
    `,
  )};
  ${({ isMainPage, isNewsDetailPage }) =>
    mediaQuery(
      'mobile',
      `${
        isMainPage && !isNewsDetailPage
          ? 'padding-top: 0;'
          : 'padding-top: 56px;'
      }`,
    )};
`;

const TopButtonWrapper = styled.div<{ isTransparent?: boolean }>`
  width: 100%;
  ${({ isTransparent }) =>
    isTransparent ? 'display: none;' : flex('flex-end', 'center ')};
  position: fixed;
  right: 90px;
  bottom: 60px;

  flex-direction: column;
  align-items: flex-end;
  row-gap: 12px;

  ${mediaQuery(
    'tablet1024',
    `
     right: 40px;
    `,
  )};
  ${mediaQuery(
    'mobile',
    `
     right: 24px;
     bottom: 24px;
    `,
  )};
`;

const TopButtonInner = styled.div`
  cursor: pointer;
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
  bottom: 52px;
  display: ${({ isVisible }) => (isVisible ? 'center' : 'none')};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.45s ease-out;
  transition: visibility 0.45s ease-out;
`;

const Toast = styled.span`
  ${flex()}
  ${size('48px', '100%')}
  max-width: 327px;
  margin: 0px 24px;

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
  TopButtonInner,
  FloatingWrapper,
  ToastWrapper,
  Toast,
};
