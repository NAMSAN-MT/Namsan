import * as React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './src/styles/GlobalStyles';
import { theme } from './src/styles/varialbes.style';
import Layout from './src/components/common/Layout';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>{element}</Layout>
    </ThemeProvider>
  );
};
