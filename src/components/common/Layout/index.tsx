import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../../../styles/GlobalStyles";
import { theme } from "../../../styles/varialbes.style";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Layout;
