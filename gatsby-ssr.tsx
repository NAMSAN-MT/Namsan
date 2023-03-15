import { GatsbySSR } from 'gatsby';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './src/styles/GlobalStyles';
import Layout from './src/components/common/Layout';
import { theme } from './src/styles/varialbes.style';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Layout>{element}</Layout>
    </ThemeProvider>
  );
};
