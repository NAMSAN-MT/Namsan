import { css } from "styled-components";

export const setSize = (height: string, width: string) => css`
  height: ${height ?? "auto"};
  width: ${width ?? "auto"};
`;

export const setFlex = (jc?: string, ai?: string) => css`
  display: flex;
  justify-content: ${jc ?? "center"};
  align-items: ${ai ?? "center"};
`;

export const setInlineblock = (va?: string) => css`
  display: inline-block;
  vertical-align: ${va ?? "top"};
`;

export const setInlineblockJustFunction = (va?: string) => css`
  display: inline-block;
  vertical-align: ${() => va ?? "top"};
`;

export const setPosition = (
  position: string,
  top: string | null,
  right: string | null,
  bottom: string | null,
  left: string | null,
) => css`
  position: ${position};
  top: ${top};
  right: ${right};
  bottom: ${bottom};
  left: ${left};
`;
