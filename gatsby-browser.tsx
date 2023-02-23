import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./src/styles/GlobalStyles";
import { theme } from "./src/styles/varialbes.style";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {element}
    </ThemeProvider>
  );
};
