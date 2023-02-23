import { createGlobalStyle } from 'styled-components'
import '@fontsource/noto-sans-kr'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: "Noto Sans KR";
  }

  body {
    line-height: 1.5;
    width: 1920px;
    height: 100%;
  }

`

export default GlobalStyle
