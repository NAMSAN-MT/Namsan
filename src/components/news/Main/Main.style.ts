import SearchIcon from '@Images/ic_search.svg';
import {
  flex,
  flexDirection,
  font,
  mediaQuery,
  size,
} from '@Styles/mixin.style';
import { color, FontWeight, ScreenBreakPoints } from '@Styles/varialbes.style';
import styled from 'styled-components';

export const TabSearchBox = styled.div`
  ${flex('space-between', 'center')}
  ${size('64p', '1200px')}

  margin: 60px 0px;
  padding: 8px 0px;

  ${mediaQuery(
    'mobile',
    `
      ${flexDirection('column')}
      ${flex('', 'flex-start')}
    `,
  )}
`;

export const TabBox = styled.ul`
  list-style-type: none;
  ${flex()}
`;

export const Tab = styled.li<{ isActive: boolean }>`
  ${flex()}
  min-width: 81px;
  padding: 6px 20px;
  letter-spacing: -0.4px;

  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: ${FontWeight.bold};
  ${font('title22', 'bold')}

  background: ${({ isActive, theme }) =>
    isActive ? `${theme.color.grey100}; border-radius: 50px` : ''};

  a {
    color: ${({ isActive, theme }) =>
      isActive ? theme.color.black : 'rgba(6, 11, 17, 0.3)'};
    text-decoration: none;

    @media (max-width: ${ScreenBreakPoints['mobile']}) {
      color: ${({ isActive, theme }) =>
        isActive ? theme.color.blue200 : 'rgba(6, 11, 17, 0.3)'};
    }
  }

  ${mediaQuery(
    'mobile',
    `
      ${flex('flex-start')}
      padding: 6px 0px;
      min-width: 26px;
      margin-right: 16px;

      ${font('body16', 'bold')}
      background: ${color.white};
  `,
  )}
`;

export const SearchBox = styled.div`
  ${size('64px', '1200px')}
  ${flex('end')}
  min-width: 100px;

  border-bottom: 2px solid ${({ theme }) => theme.color.grey200};

  input {
    width: 100%;
    padding-left: 12px;
    border: none;

    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    ${font('title18', 'regular')}

    line-height: 28px;
    letter-spacing: -0.2px;

    ::placeholder {
      color: rgba(6, 11, 17, 0.3);
    }

    :-ms-input-placeholder {
      color: rgba(6, 11, 17, 0.3);
    }

    ::-ms-input-placeholder {
      color: rgba(6, 11, 17, 0.3);
    }
  }

  ::after {
    content: '';
    display: inline-block;
    background: ${`url(${SearchIcon}) no-repeat center center`};
    margin-right: 5px;
    ${size('24px', '24px')}
  }
`;
