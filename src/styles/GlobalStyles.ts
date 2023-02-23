import { createGlobalStyle } from 'styled-components';
import '@fontsource/noto-sans-kr';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: "Noto Sans KR";
  }

  body {
    line-height: 1.5;
    max-width: 1920px;
    margin: 0;
    padding: 0;
  }

`;

export default GlobalStyle;
