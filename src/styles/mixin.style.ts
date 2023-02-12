import { css } from "styled-components";

export const size = css<{ height: string; width: string }>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;
