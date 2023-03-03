import { createGlobalStyle } from 'styled-components';
import '@fontsource/noto-sans-kr';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}  

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: "Noto Sans KR";
  }

  html, 
  body {
    height: 100%;
    line-height: 1.5;
    max-width: 1920px;
  }

  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }

  a{
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }

  input:focus {
    outline: none;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

`;
export default GlobalStyle;
