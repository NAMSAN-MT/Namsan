import { flex, font, mediaQuery } from '@Styles/mixin.style';
import { size } from 'lodash';
import styled from 'styled-components';

const Base = styled.div`
  height: 100%;
  /* width: 100%; */
  ${flex('flex-start', 'center')};

  & > span {
    margin-left: 12px;
    ${font('title18', 'medium')}
    letter-spacing: -0.4px;

    ${mediaQuery(
      'mobile',
      `
        ${font('mobile16', 'regular')};
        letter-spacing: -0.2px;
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
`;

const Option = styled(Base)<{ isSelected: boolean }>`
  cursor: pointer;
  margin: 12px;

  & > span {
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.color.blue100 : theme.color.black};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.grey100};
  }

  ${mediaQuery(
    'mobile',
    `
      margin: 16px;
    `,
  )}
`;

const OpenIconWrapper = styled.div`
  position: absolute;
  ${size({ width: '24px', height: '24px' })};
  top: 50%;
  transform: translateY(-50%);
  right: 19px;
`;

export { Select, OptionWrapper, Option, OpenIconWrapper };
