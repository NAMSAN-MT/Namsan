import { PageProps, StaticQueryDocument, graphql } from 'gatsby';
import React from 'react';
import MembersWrapper from '@Components/members/MembersWrapper';
import MembersTitle from '@Components/members/MembersTitle';
import SearchBar from '@Components/members/SearchBar';
import MemberList from '@Components/members/MemberList';
import Layout from '@Components/common/Layout';

const Members: React.FC<PageProps> = ({ data }) => {
  return (
    <Layout>
      <MembersWrapper>
        <MembersTitle />
        <SearchBar />
        <MemberList members={data.allMembers.nodes.map(item => item)} />
      </MembersWrapper>
    </Layout>
  );
};

export default Members;

export const pageQuery: StaticQueryDocument = graphql`
  query {
    allMembers(sort: { order: ASC }) {
      nodes {
        id
        language
        name
        position
        email
        order
        businessFields
        description
        educations {
          time
          value
        }
        careers {
          time
          value
        }
        papers {
          time
          value
        }
        awards {
          time
          value
        }
        imagePath
        bgImagePath
      }
    }
  }
`;
