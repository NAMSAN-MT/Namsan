import type { GatsbyConfig } from 'gatsby';
import { resolve, join } from 'path';
import dotenv from 'dotenv';
dotenv.config();

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: '법무법인 남산 | Lim, Chung & Suh',
    description:
      '법무법인 남산은 1980년 시작된 이래 현재까지 깊이 있는 역량과 정성으로 고객을 위한 맞춤형 법률 서비스를 제공하고 있습니다.',
    ogTitle: '법무법인 남산 | Lim, Chung & Suh',
    ogDescription: '시대를 넘어 함께 하는 법률 파트너',
    ogUrl: 'https://www.namsanlaw.com/',
    keywords:
      '남산,법무법인남산,법률사무소,변호사,로펌,승소,소송,법률자문,기업자문,재판,금융,건설,부동산,조세,관세,형사,식품,인사,노무,상속,보험,명동,법무법인',
    favicon: `/logo-gnb.svg`,
    ogImage: `/img_kakao.png`,
    siteUrl: `https://www.namsanlaw.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  trailingSlash: 'never',
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/imgs/logo-gnb.svg',
        name: `법무법인 남산 | Lim, Chung & Suh`,
        short_name: `법무법인 남산 | Lim, Chung & Suh`,
        start_url: `/`,
        display: `standalone`,
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
        collections: ['members', 'work', 'news'],
      },
    },
  ],

  flags: {
    DEV_SSR: false,
  },
};

export default config;
