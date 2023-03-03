import { flex } from '@Styles/mixin.style';
import styled from 'styled-components';

const Base = styled.button`
  ${flex()}
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;

  // FIXME: MIXIn으로 변경
  line-height: 26px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.2px;
  border-radius: 50px;
`;

const Primary = styled(Base)`
  color: ${({ theme }) => theme.color.textWhiteHigh};
  padding: 13px 30px;
  width: 104px;
  background-color: ${({ theme }) => theme.color.textBlue};
  &:hover {
    background-color: ${({ theme }) => theme.color.blue300};
  }
`;

const Support = styled(Base)`
  color: ${({ theme }) => theme.color.textBlackHigh};
  padding: 11px 30px;
  width: 104px;
  background-color: ${({ theme }) => theme.color.dividerGrey100};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

const SupportLine = styled(Base)`
  color: ${({ theme }) => theme.color.textBlackHigh};
  padding: 11px 30px;
  width: 104px;
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
  width: 84px;
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

  // FIXME: MIXIn으로 변경
  line-height: 22px;
  font-size: 14px;
  width: 68px;
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

export { Base, Primary, Support, SupportLine, Outline, Tag };
