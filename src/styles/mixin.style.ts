import { css } from 'styled-components';
import { FontWeight, ScreenBreakPoints, TextStyles } from './varialbes.style';

export const size = (height = 'auto', width = 'auto') => `
  height: ${height};
  width: ${width};
`;

export const flex = (jc = 'center', ai = 'center') => `
  display: flex;
  justify-content: ${jc};
  align-items: ${ai};
`;

export const flexDirection = (
  fd: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'column',
  ai = 'center',
) => `
  display: flex;
  flex-direction: ${fd};
  align-items: ${ai};
`;

export const inlineblock = (va = 'top') => css`
  display: inline-block;
  vertical-align: ${va};
`;

export const inlineblockJustFunction = (va = 'top') => css`
  display: inline-block;
  vertical-align: ${va};
`;

export const position = (
  $position: string,
  top: string | null,
  right: string | null,
  bottom: string | null,
  left: string | null,
) => css`
  position: ${$position};
  top: ${top};
  right: ${right};
  bottom: ${bottom};
  left: ${left};
`;

export const ellipsis = () => css`
  overflow: hidden;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
`;

export const ellipsisMulti = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
`;

export const font = (
  style: keyof typeof TextStyles,
  weight: keyof typeof FontWeight,
) => `
  font-weight: ${FontWeight[weight]};
  font-size: ${TextStyles[style][0]};
`;

export const lineHeight = (fontSizePx: number, lineHeightPx: number) => `
  line-height: ${lineHeightPx / fontSizePx};
`;

export const mediaQuery = (
  breakPoint: keyof typeof ScreenBreakPoints,
  content: string,
) => {
  return css`
    @media (max-width: ${ScreenBreakPoints[breakPoint]}) {
      ${content}
    }
  `;
};
