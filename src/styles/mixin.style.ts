import { css } from "styled-components";

export const size = (height: string = "auto", width: string = "auto") => css`
  height: ${height};
  width: ${width};
`;

export const flex = (jc: string = "center", ai: string = "center") => css`
  display: flex;
  justify-content: ${jc};
  align-items: ${ai};
`;

export const inlineblock = (va: string = "top") => css`
  display: inline-block;
  vertical-align: ${va};
`;

export const inlineblockJustFunction = (va: string = "top") => css`
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
