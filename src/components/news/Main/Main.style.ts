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

  ${mediaQuery('tablet1024', `width: 100%;`)};

  ${mediaQuery(
    'mobile',
    `
      ${flexDirection('column')}
      ${flex('', 'flex-start')}
      height: 100%;
      margin: 24px 0px 36px 0px;
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
