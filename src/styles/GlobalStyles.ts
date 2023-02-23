import { createGlobalStyle } from "styled-components";
import "@fontsource/noto-sans-kr";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: "Noto Sans KR";
  }

  body {
    line-height: 1.5;
    width: 1920px;
  }

`;

export default GlobalStyle;
