import React, { PropsWithChildren } from "react";
import GlobalStyle from "../../../styles/GlobalStyles";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      {children}
    </React.Fragment>
  );
};

export default Layout;
