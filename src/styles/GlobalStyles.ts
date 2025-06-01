import FHAlphaTestLight from '@Fonts/FHAlphaTest-Light.otf';
import FHAlphaTestLightItalic from '@Fonts/FHAlphaTest-LightItalic.otf';
import '@fontsource/noto-sans-kr';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { mediaQuery } from './mixin.style';

const GlobalStyle = createGlobalStyle`
  ${reset}  
  @font-face {
        font-family: 'FHAlphaTestLight';
        src: local('FHAlphaTestLight'), local('FHAlphaTestLight');
        font-style: normal;
        src: url(${FHAlphaTestLight}) format('truetype');
  }
   @font-face {
        font-family: 'FHAlphaTestLightItalic';
        src: local('FHAlphaTestLightItalic'), local('FHAlphaTestLightItalic');
        font-style: normal;
        src: url(${FHAlphaTestLightItalic}) format('truetype');
  }
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: "noto-sans-cjk-kr", sans-serif;
  }
  html, 
  body {
    height: 100%;
    line-height: 1.5;
    scroll-x : hidden;
    /* min-width: 1024px; */
    font: -webkit-control;


    ${mediaQuery(
      'mobile',
      `
      min-width: 375px;
      `,
    )}
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
  }}
`;

export default GlobalStyle;
