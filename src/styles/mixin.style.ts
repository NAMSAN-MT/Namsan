import { css } from 'styled-components';
import { FontWeight, TextStyles } from './varialbes.style';

export const size = (height = 'auto', width = 'auto') => css`
  height: ${height};
  width: ${width};
`;

export const flex = (jc = 'center', ai = 'center') => css`
  display: flex;
  justify-content: ${jc};
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

export const font = (
  style: keyof typeof TextStyles,
  weight: 'regular' | 'bold',
) => css`
  font-weight: ${FontWeight[TextStyles[style][weight === 'regular' ? 1 : 2]]};
  font-size: ${TextStyles[style][0]};
`;

export const lineHeight = (fontSizePx: number, lineHeightPx: number) => css`
  line-height: ${lineHeightPx / fontSizePx};`;
