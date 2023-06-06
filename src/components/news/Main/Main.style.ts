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
  ${size('64px', 'auto')}
  margin: 50px 0px 60px;

  ${mediaQuery('tablet1024', `${size('64px', 'auto')} margin: 40px 0px;`)};
  ${mediaQuery(
    'mobile',
    `
      ${flexDirection('column')}
      ${flex('', 'flex-start')}
      height: 100%;
      margin: 24px 0px 40px 0px;
    `,
  )}
`;

export const TabBox = styled.ul`
  list-style-type: none;
  min-width: 350px;
  ${mediaQuery('mobile', `min-width: auto; margin-bottom: 24px; }`)}
  ${flex()}
  li:nth-child(1) {
    min-width: 81px;
    ${mediaQuery('mobile', `min-width: auto; }`)}
  }
  li:nth-child(2) {
    min-width: 120px;
    ${mediaQuery('mobile', `min-width: auto; }`)}
  }
  li:nth-child(3) {
    min-width: 165px;
    ${mediaQuery('mobile', `min-width: auto; }`)}
  }
`;

export const Tab = styled.li<{ isActive?: boolean }>`
  ${flex()}

  padding: 6px 20px;
  letter-spacing: -0.4px;

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
