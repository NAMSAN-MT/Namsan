import React from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from 'styled-components';
import { font } from '@Styles/mixin.style';

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

const PolicyStyleBox = styled.div`
  margin: 0px 360px;
  margin-bottom: 160px;

  & h1 {
    color: ${({ theme }) => theme.color.textBlackHigh};
    ${font('title32', 'bold')};
    margin-top: 160px;
  }

  & h2 {
    color: ${({ theme }) => theme.color.textBlackHigh};
    ${font('title24', 'bold')};
    margin-top: 60px;
  }

  & h3 {
    color: ${({ theme }) => theme.color.textBlackHigh};
    ${font('title20', 'bold')};
    margin-top: 40px;
  }

  & p {
    color: ${({ theme }) => theme.color.textBlackHigh};
    /* ${font('body16', 'regular')}; */
    margin-top: 14px;
    line-height: 34px;
    font-size: 20px;

    &.privacy {
      line-height: 44px;
    }
  }

  & table {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.grey200};
    tbody {
      border: inherit;
      tr {
        height: 66px;
        border: inherit;
        td {
          vertical-align: middle;
          padding: 0px 22px;
          border: inherit;
        }
        th {
          vertical-align: middle;
          background: ${({ theme }) => theme.color.grey50};
          border: inherit;
        }
      }
    }
  }
`;

export default PolicyTemplate;

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`;
