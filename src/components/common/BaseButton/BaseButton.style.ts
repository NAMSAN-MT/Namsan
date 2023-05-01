import { font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import { flex } from '@Styles/mixin.style';
import styled from 'styled-components';
import ArrowUpIcon from '@Images/ic_arrow_top.svg';
import CopyIcon from '@Images/ic_copy.svg';
import HambergurIcon from '@Images/ic_hamburger.svg';
import ShareIcon from '@Images/ic_share.svg';
import MoreIcon from '@Images/ic_more.svg';
import MoreHoverIcon from '@Images/ic_more_hover.svg';
import DownloadIcon from '@Images/ic_download.svg';
import DirectIcon from '@Images/ic_direct.svg';

const Base = styled.button`
  ${flex()}
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  ${lineHeight(16, 26)};
  ${font('body16', 'medium')}
  letter-spacing: -0.2px;
  border-radius: 50px;
  ${mediaQuery(
    'mobile',
    `
      ${font('mobile14', 'bold')},
       letter-spacing: -0.1px;,
       ${lineHeight(14, 22)};
    `,
  )};
`;

const Primary = styled(Base)`
  color: ${({ theme }) => theme.color.textWhiteHigh};
  padding: 13px 30px;
  min-width: 104px;
  background-color: ${({ theme }) => theme.color.textBlue};
  &:hover {
    background-color: ${({ theme }) => theme.color.blue300};
  }
  ${mediaQuery(
    'mobile',
    `
      padding: 12px 20px;
    `,
  )};
`;

const Support = styled(Base)`
  color: ${({ theme }) => theme.color.textBlackHigh};
  padding: 11px 30px;
  min-width: 104px;

  font-weight: 700;
  text-align: center;

  background-color: ${({ theme }) => theme.color.dividerGrey100};
  &:hover {
    background-color: ${({ theme }) => theme.color.grey200};
  }
  ${mediaQuery(
    'mobile',
    `
      padding: 12px 20px;
    `,
  )};
`;

const SupportLine = styled(Base)`
  color: ${({ theme }) => theme.color.textBlackHigh};
  padding: 11px 30px;
  min-width: 104px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.grey300};
  &:hover {
    background-color: ${({ theme }) => theme.color.blue50};
  }
  ${mediaQuery(
    'mobile',
    `
      padding: 12px 20px;
    `,
  )};
`;

const Outline = styled(Base)`
  color: ${({ theme }) => theme.color.textBlue};
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1.5px solid ${({ theme }) => theme.color.textBlue};
  border-radius: 24px;
  padding: 11px 20px;
  min-width: 84px;
  font-weight: 700;
  &:hover {
    background-color: ${({ theme }) => theme.color.blue50};
  }
  ${mediaQuery(
    'mobile',
    `
      padding: 12px 20px;
    `,
  )};
`;

const Tag = styled(Base)`
  color: ${({ theme }) => theme.color.blue100};
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.textBlue};
  border-radius: 2px;
  padding: 4px 8px;
  letter-spacing: -0.1px;
  min-width: 68px;
  ${font('body14', 'medium')}
  ${lineHeight(14, 22)};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

const IconBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  min-height: 60px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ArrowTop = styled(IconBase)`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.backgroundGrey50};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
  .icon {
    background: ${`url(${ArrowUpIcon}) no-repeat center center`};
    width: 60px;
    height: 60px;
  }
`;

const Copy = styled(IconBase)`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.backgroundGrey50};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
  .icon {
    background: ${`url(${CopyIcon}) no-repeat center center`};
    width: 60px;
    height: 60px;
  }
`;

const Hamburger = styled(IconBase)`
  border-radius: 32px;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.dividerGrey200};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
  .icon {
    background: ${`url(${HambergurIcon}) no-repeat center center`};
    width: 56px;
    height: 56px;
  }
`;

const HamburgerNews = styled(IconBase)`
  border-radius: 32px;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.dividerGrey200};
  &:hover {
    background-color: ${({ theme }) => theme.color.blue50};
  }
  .icon {
    background: ${`url(${HambergurIcon}) no-repeat center center`};
    width: 56px;
    height: 56px;
  }
`;

const Share = styled(IconBase)`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.backgroundGrey50};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
  .icon {
    background: ${`url(${ShareIcon}) no-repeat center center`};
    width: 60px;
    height: 60px;
  }
`;

const More = styled(IconBase)`
  color: ${({ theme }) => theme.color.textBlackHigh};
  background-color: transparent;
  border: 1px solid transparent;
  letter-spacing: -0.2px;

  ${lineHeight(18, 28)};
  ${font('title18', 'bold')}
  &:hover {
    color: ${({ theme }) => theme.color.blue200};
  }
  .icon {
    background: ${`url(${MoreIcon}) no-repeat center center`};
    width: 28px;
    height: 28px;
    margin-left: 8px;
    &:hover {
      background: ${`url(${MoreHoverIcon}) no-repeat center center`};
    }
  }
`;

const Download = styled(IconBase)`
  color: ${({ theme }) => theme.color.blue200};
  background-color: transparent;
  border: 1px solid transparent;
  letter-spacing: -0.2px;

  ${lineHeight(18, 28)};
  ${font('title18', 'bold')}
  &:hover {
    color: ${({ theme }) => theme.color.blue100};
  }
  ${mediaQuery(
    'mobile',
    `
      ${font('mobile14', 'bold')};
      ${lineHeight(14, 22)};
      letter-spacing: -0.1px;
      min-height: 20px;
    `,
  )};
  .icon {
    background: ${`url(${DownloadIcon}) no-repeat center center`};
    width: 28px;
    height: 28px;
    margin-left: 8px;
    &:hover {
      background: ${`url(${DownloadIcon}) no-repeat center center`};
    }
    ${mediaQuery(
      'mobile',
      `
      width: 10px;
      height: 10px;
      margin-left: 7px;
    `,
    )};
  }
`;

const Direct = styled(IconBase)`
  color: ${({ theme }) => theme.color.blue200};
  background-color: transparent;
  border: 1px solid transparent;
  letter-spacing: -0.2px;

  ${lineHeight(18, 28)};
  ${font('title18', 'bold')}
  &:hover {
    color: ${({ theme }) => theme.color.blue100};
  }
  ${mediaQuery(
    'mobile',
    `
      ${font('mobile14', 'bold')};
      ${lineHeight(14, 22)};
      letter-spacing: -0.1px;
      min-height: 20px;
    `,
  )};
  .icon {
    background: ${`url(${DirectIcon}) no-repeat center center`};
    width: 28px;
    height: 28px;
    margin-left: 8px;
    &:hover {
      background: ${`url(${DirectIcon}) no-repeat center center`};
    }
    ${mediaQuery(
      'mobile',
      `
      width: 16px;
      height: 16px;
      margin-left: 7px;
    `,
    )};
  }
`;

export {
  Base,
  Primary,
  Support,
  SupportLine,
  Outline,
  Tag,
  ArrowTop,
  Copy,
  Hamburger,
  HamburgerNews,
  Share,
  More,
  Download,
  Direct,
};
