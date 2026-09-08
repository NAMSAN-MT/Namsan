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
  gap: 20px;
  margin: 50px 0px 60px;

  ${mediaQuery('tablet1024', `${size('64px', 'auto')} margin: 40px 0px;`)};
  ${mediaQuery(
    'mobile',
    `
      ${flexDirection('column')}
      ${flex('', 'flex-start')}
      gap: 0;
      height: 100%;
      margin: 24px 0px 40px 0px;
    `,
  )}
`;

/**
 * 검색창 + 정렬 토글을 묶는 오른쪽 컨트롤 영역.
 * - PC: 검색창 384px 고정, 정렬 버튼은 그 오른쪽.
 * - 테블릿(~1024px): 폭이 모자라면 검색창만 줄어든다(탭 min-width 350px는 고정이라
 *   flex-basis를 shrink 가능하게 둬야 769~900px 구간에서 넘치지 않는다).
 * - 모바일(~768px): TabSearchBox가 column이 되므로 한 줄 전체를 차지하고,
 *   검색창이 남는 폭을 먹고 버튼은 고정 폭을 유지한다.
 */
export const ControlBox = styled.div`
  ${flex('flex-end', 'center')}
  flex: 1 1 auto;
  min-width: 0;
  gap: 16px;

  > div:first-child {
    flex: 0 1 384px;
    min-width: 0;
  }

  ${mediaQuery('tablet1024', `gap: 12px;`)}
  ${mediaQuery(
    'mobile',
    `
      ${flex('space-between', 'center')}
      width: 100%;
      gap: 8px;

      > div:first-child { flex: 1 1 auto; }
    `,
  )}
`;

/**
 * 정렬 방향 토글 버튼(아이콘 전용). 막대 길이 + 화살표 방향이 현재 정렬을 나타낸다
 * (아래=최신순, 위=오래된순). 아이콘만 있으므로 Main.tsx에서 aria-label/title을 준다.
 */
export const SortButton = styled.button`
  ${flex()}
  ${size('40px', '40px')}
  flex-shrink: 0;
  padding: 0;

  border: 1px solid ${({ theme }) => theme.color.grey200};
  border-radius: 50%;
  background: ${color.white};
  cursor: pointer;

  img {
    ${size('20px', '20px')}
  }

  &:hover {
    background: ${({ theme }) => theme.color.grey50};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.blue100};
    outline-offset: 2px;
  }

  ${mediaQuery(
    'mobile',
    `
      ${size('36px', '36px')}
      img { ${size('18px', '18px')} }
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
    ${mediaQuery('mobile', `min-width: auto; }`)}
  }
`;

export const Tab = styled.li<{ isActive?: boolean }>`
  ${flex()}

  white-space: nowrap;
  letter-spacing: -0.4px;

  font-weight: ${FontWeight.bold};
  ${font('title22', 'bold')}

  a {
    padding: 8px 20px;
    border-radius: 50px;
    background: ${({ isActive, theme }) =>
      isActive ? theme.color.grey100 : 'transparent'};

    color: ${({ isActive, theme }) =>
      isActive ? theme.color.black : 'rgba(6, 11, 17, 0.3)'};
    text-decoration: none;

    @media (max-width: ${ScreenBreakPoints['mobile']}) {
      padding: 6px 0px;
      background: ${color.white};
      color: ${({ isActive, theme }) =>
        isActive ? theme.color.blue200 : 'rgba(6, 11, 17, 0.3)'};
    }
  }

  ${mediaQuery(
    'mobile',
    `
      ${flex('flex-start')}
      min-width: 26px;
      margin-right: 16px;

      ${font('body16', 'bold')}
      background: ${color.white};
  `,
  )}
`;
