import { lineHeight } from '@Styles/mixin.style';
import { flex } from '@Styles/mixin.style';
import styled from 'styled-components';
import ArrowUpIcon from '@Images/ArrowUp.svg';
import HambergurIcon from '@Images/Hamburger.svg';
import ShareIcon from '@Images/Share.svg';
import MoreIcon from '@Images/More.svg';
import MoreHoverIcon from '@Images/MoreHover.svg';

const Base = styled.button`
  ${flex()}
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;

  // FIXME: MIXIn으로 변경
  ${lineHeight(16, 26)}};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.2px;
  border-radius: 50px;
`;

const Primary = styled(Base)`
  color: ${({ theme }) => theme.color.textWhiteHigh};
  padding: 13px 30px;
  min-width: 104px;
  background-color: ${({ theme }) => theme.color.textBlue};
  &:hover {
    background-color: ${({ theme }) => theme.color.blue300};
  }
`;

const Support = styled(Base)`
  color: ${({ theme }) => theme.color.textBlackHigh};
  padding: 11px 30px;
  min-width: 104px;
  background-color: ${({ theme }) => theme.color.dividerGrey100};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

const SupportLine = styled(Base)`
  color: ${({ theme }) => theme.color.textBlackHigh};
  padding: 11px 30px;
  min-width: 104px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.grey300};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

const Outline = styled(Base)`
  color: ${({ theme }) => theme.color.textBlue};
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1.5px solid ${({ theme }) => theme.color.textBlue};
  border-radius: 24px;
  padding: 11px 20px;
  min-width: 84px;
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

const Tag = styled(Base)`
  color: ${({ theme }) => theme.color.blue100};
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.textBlue};
  border-radius: 2px;
  padding: 4px 8px;
  letter-spacing: -0.1px;
  min-width: 68px;

  // FIXME: MIXIn으로 변경
  ${lineHeight(14, 22)}};
  font-size: 14px;
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
  
  // FIXME: MIXIn으로 변경
  ${lineHeight(18, 28)}};
  font-size: 18px;
  font-weight: 700;

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

export {
  Base,
  Primary,
  Support,
  SupportLine,
  Outline,
  Tag,
  ArrowTop,
  Hamburger,
  Share,
  More,
};
