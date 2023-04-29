import type { GatsbyConfig } from 'gatsby';
import { resolve, join } from 'path';
import dotenv from "dotenv";
dotenv.config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Namsan`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  trailingSlash: 'never',
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/imgs/logo-gnb.svg',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: join(__dirname, `src`, `assets`, `imgs`),
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@Api': resolve(__dirname, 'src/api'),
          '@Components': resolve(__dirname, 'src/components'),
          '@Images': resolve(__dirname, 'src/assets/imgs'),
          '@Fonts': resolve(__dirname, 'src/fonts'),
          '@Interface': resolve(__dirname, 'src/interface'),
          '@Type': resolve(__dirname, 'src/type'),
          '@Pages': resolve(__dirname, 'src/pages'),
          '@Styles': resolve(__dirname, 'src/styles'),
          '@Hooks': resolve(__dirname, 'src/hooks'),
          '@Intl': resolve(__dirname, 'src/intl'),
          '@Assets': resolve(__dirname, 'src/assets'),
        },
        extensions: ['ts', 'tsx'],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets\/imgs\/svg/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-intl',
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `ko`],
        defaultLanguage: `ko`,
        redirect: false,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-typescript',
            options: {
              prettierOptions: {
                semi: false,
                singleQuote: false,
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-firestore-easy`,
      options: {
        adminCredential: {
          credential: require('./firebase-key.json'),
          databaseURL:
            'https://namsan-801de-default-rtdb.asia-southeast1.firebasedatabase.app',
        },
        collections: ['members', 'work'],
      },
    },
  ],
  flags: {
    DEV_SSR: true,
  },
};

export default config;
