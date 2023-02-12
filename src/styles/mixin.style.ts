import { css } from "styled-components";

export const setSize = css<{ height: string; width: string }>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

export const setFlex = css<{ jc: string; ai: string }>`
  display: flex;
  justify-content: ${(props) => props.jc ?? "center"};
  align-items: ${(props) => props.ai ?? "center"};
`;

export const setInlineblock = css<{ va: string }>`
  display: inline-block;
  vertical-align: ${(props) => props.va ?? "top"};
`;

export const setPosition = css<{
  position: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}>`
  position: ${({ position }) => position};
  top: ${({ top }) => top ?? null};
  right: ${({ right }) => right ?? null};
  bottom: ${({ bottom }) => bottom ?? null};
  left: ${({ left }) => left ?? null};
`;
