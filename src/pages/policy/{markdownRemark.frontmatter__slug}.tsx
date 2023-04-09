import { PolicyStyleBox } from '@Components/policy/policy.style';
import { PageProps, graphql } from 'gatsby';
import React from 'react';

const PolicyTemplate = ({ data }: PageProps) => {
  const { markdownRemark } = data as { markdownRemark: { html: string } };
  const { html } = markdownRemark;

  return (
    <PolicyStyleBox
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></PolicyStyleBox>
  );
};

export default PolicyTemplate;

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`;
