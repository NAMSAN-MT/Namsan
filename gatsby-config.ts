import type { GatsbyConfig } from "gatsby";
import { resolve } from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Namsan`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-styled-components", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: `gatsby-plugin-alias-imports`,
    options: {
        alias: {
            "@Api": resolve(__dirname, 'src/api'),
            "@Components": resolve(__dirname, 'src/components'),
            "@Images": resolve(__dirname, 'src/images'),
            "@Interface": resolve(__dirname, 'src/interface'),
            "@Pages": resolve(__dirname, 'src/pages'),
            "@Styles": resolve(__dirname, 'src/styles')
        },
        extensions: [
            "ts",
            "tsx"
        ]
      }
  },
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /images\/svg/,
      }
    }
  }
]
};

export default config;
