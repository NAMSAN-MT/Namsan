import { css } from 'styled-components';

export const size = (height?: string, width?: string) => css`
  height: ${height ?? 'auto'};
  width: ${width ?? 'auto'};
`;

export const flex = (jc?: string, ai?: string) => css`
  display: flex;
  justify-content: ${jc ?? 'center'};
  align-items: ${ai ?? 'center'};
`;

export const inlineblock = (va?: string) => css`
  display: inline-block;
  vertical-align: ${va ?? 'top'};
`;

export const inlineblockJustFunction = (va?: string) => css`
  display: inline-block;
  vertical-align: ${() => va ?? 'top'};
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

export const lineHeight = (fontSizePx: number, lineHeightPx: number) => css`
  line-height: ${lineHeightPx / fontSizePx};
`;
