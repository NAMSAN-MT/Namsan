import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          ogTitle
          ogDescription
          ogUrl
          keywords
          favicon
          ogImage
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
