import { IMember } from '@Interface/api.interface';
import { createRemoteFileNode } from 'gatsby-source-filesystem';
import { resolve } from 'path';
import { getFileFromStorage } from './src/api/index.api';
import { isEmpty } from 'lodash';

const fs = require('fs');
exports.onPostBuild = () => {
  fs.copyFile(`./firebase.json`, `./public/firebase.json`, (err: unknown) => {
    if (err) {
      throw err;
    }
  });
};

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  getCache,
  createNodeId,
}: any) => {
  if (node.internal.type === 'members') {
    if (isEmpty(node.imagePath)) return;
    const fileNode = await createRemoteFileNode({
      url: await getFileFromStorage(node.imagePath),
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    });
    if (fileNode) {
      createNodeField({
        node,
        id: node.id,
        name: 'localFile',
        value: fileNode.id,
      });
    }
  }
};

exports.createPages = async ({ actions, graphql }: any) => {
  const members = await graphql(`
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
  `);

  const contextMembers = await Promise.all(
    members.data.allMembers.nodes.map(async (node: IMember) => {
      let id = node.id;
      if (node.language === 'en') {
        const imageParentId = await graphql(`
        query getKoMember {
          members(email: {eq: "${node.email}"} imagePath: {regex: ""}) {
            id
          }
        }`).then(({ data }: any) => {
          console.log(data);

          return data.members.id;
        });
        id = imageParentId;
      }

      const file = await graphql(`
      query {
        file(parent: {id: {eq: "${id}"}}) {
          childImageSharp {
            gatsbyImageData
          }
        }
    }`);
      return {
        ...node,
        image: {
          ...file.data.file?.childImageSharp.gatsbyImageData,
          backgroundColor: '#F6F8FA',
        },
      };
    }),
  );

  actions.createPage({
    path: '/members',
    component: resolve('./src/templates/members.tsx'),
    context: {
      id: 'members',
      members: contextMembers,
    },
  });

  await Promise.all(
    contextMembers.map(async (node: any) => {
      const bg = await graphql(`
    query {
      file(name: {eq: "${node.bgImagePath}"}) {
        childImageSharp {
          gatsbyImageData
        }
      }
  }`);

      const member = {
        ...node,
        bgImage: bg.data.file?.childImageSharp.gatsbyImageData,
      };

      actions.createPage({
        path: `/member/${node.id}`,
        component: resolve('./src/pages/member/[id].tsx'),
        context: {
          id: node.id,
          member,
        },
      });
    }),
  );

  const works = await graphql(`
    query {
      allWork(sort: { categoryId: ASC }) {
        edges {
          node {
            id
            categoryId
            categoryInfo
            member {
              main
              sub
            }
          }
        }
      }
    }
  `);

  actions.createPage({
    path: `/work`,
    component: resolve('./src/templates/work.tsx'),
  });

  works.data.allWork.edges.forEach(async ({ node }: any) => {
    const memberQuery = (member: string) => `
      query {
        members(name: { eq: "${member}" }) {
          id
          language
          name
          position
          order
          businessFields
          imagePath
          bgImagePath
        }
      }
    `;
    const getImage = (id: string, path: string) => `
      query {
        image: file(parent: {id: {eq: "${id}"}}) {
          childImageSharp {
            gatsbyImageData
          }
        }
        bgImage: file(name: {eq: "${path}"}) {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    `;

    const getMemberData = (data: string[]) =>
      data.map(
        async (member: string) =>
          await graphql(memberQuery(member))
            .then(({ data }: any) => data.members)
            .then(
              async (memberData: any) =>
                memberData && {
                  ...memberData,
                  ...(await graphql(
                    getImage(memberData.id, memberData.bgImagePath),
                  ).then(({ data }: any) => {
                    return {
                      image: data.image?.childImageSharp.gatsbyImageData,
                      bgImage: data.bgImage?.childImageSharp.gatsbyImageData,
                    };
                  })),
                },
            ),
      );

    const mainMemberData = await Promise.all(getMemberData(node.member.main));
    const subMemberData = await Promise.all(getMemberData(node.member.sub));

    actions.createPage({
      path: `/work/${node.categoryId}`,
      component: resolve('./src/pages/work/[id].tsx'),
      context: {
        id: node.categoryId,
        mainMemberData,
        subMemberData,
      },
    });
  });

  const news = await graphql(`
    query {
      allNews {
        edges {
          node {
            id
            newsType
            originalLink
            imagePath
            title
            date
            content
            agency
          }
        }
      }
    }
  `);
  news.data.allNews.edges.forEach(({ node }: any) => {
    actions.createPage({
      path: `/news/${node.id}`,
      component: resolve('./src/pages/news/[id].tsx'),
      context: {
        news: { ...node },
      },
    });
  });
};
