import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import { ScreenBreakPoints } from '@Styles/varialbes.style';
import { size } from 'lodash';
import styled from 'styled-components';

const Base = styled.div`
  height: 100%;
  ${flex('flex-start', 'center')};

  & > span {
    ${font('title18', 'medium')};
    ${lineHeight(18, 28)};
    letter-spacing: -0.4px;

    margin-left: 12px;

    ${mediaQuery(
      'mobile',
      `
        ${font('mobile16', 'regular')};
        ${lineHeight(16, 26)}
        letter-spacing: -0.2px;
        margin-left: 0;
      `,
    )}
  }
`;

const Select = styled(Base)<{ isOpen: boolean }>`
  border: none;
  cursor: pointer;
  position: relative;
  user-select: none;
  border-bottom: 2px solid
    ${({ isOpen, theme }) => (isOpen ? 'transparent' : theme.color.grey200)};

  & > span {
    font-weight: 400;
  }

  @media (max-width: ${ScreenBreakPoints.tablet1024}) {
    border-bottom: 1px solid
      ${({ isOpen, theme }) => (isOpen ? 'transparent' : theme.color.grey200)};
  }
`;

const OptionWrapper = styled.ul`
  position: absolute;
  top: 100%;
  border: ${({ theme }) => `solid 2px ${theme.color.blue100}`};
  width: 100%;
  max-height: 444px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 100;
  ${flex('flex-start', 'flex-start')};
  flex-direction: column;
  padding-top: 12px;
  padding-bottom: 12px;

  @media (max-width: ${ScreenBreakPoints.tablet1024}) {
    border: ${({ theme }) => `solid 1px ${theme.color.blue100}`};
  }
`;

const Option = styled(Base)<{ isSelected: boolean }>`
  width: 100%;
  cursor: pointer;

  & > span {
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.color.blue100 : theme.color.black};
    margin-top: 14px;
    margin-bottom: 14px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.grey100};
  }

  ${mediaQuery(
    'mobile',
    `
      & > span {
        margin: 8px 16px;
      }
    `,
  )}
`;

const OpenIconWrapper = styled.div`
  position: absolute;
  ${size({ width: '24px', height: '24px' })};
  top: 50%;
  transform: translateY(calc(-50% - 2px));
  right: 13px;
`;

export { Select, OptionWrapper, Option, OpenIconWrapper };
