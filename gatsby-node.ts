import { createRemoteFileNode } from 'gatsby-source-filesystem';
import { resolve } from 'path';
import { getFileFromStorage } from './src/api/index.api';
import { IMember } from '@Interface/api.interface';

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  getCache,
  createNodeId,
}: any) => {
  if (node.internal.type === 'members') {
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

  actions.createPage({
    path: '/members',
    component: resolve('./src/pages/members.tsx'),
    context: {
      id: 'members',
      members: await Promise.all(
        members.data.allMembers.nodes.map(async (node: IMember) => {
          const file = await graphql(`
          query {
            file(parent: {id: {eq: "${node.id}"}}) {
              childImageSharp {
                gatsbyImageData
              }
            }
        }`);
          return {
            ...node,
            image: file.data.file.childImageSharp.gatsbyImageData,
          };
        }),
      ),
    },
  });

  await Promise.all(
    members.data.allMembers.nodes.map(async (node: any) => {
      const profile = await graphql(`
      query {
        file(parent: {id: {eq: "${node.id}"}}) {
          childImageSharp {
            gatsbyImageData
          }
        }
    }`);

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
        image: profile.data.file.childImageSharp.gatsbyImageData,
        bgImage: bg.data.file.childImageSharp.gatsbyImageData,
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
      allWork {
        edges {
          node {
            id
            language
            categoryId
          }
        }
      }
    }
  `);
  works.data.allWork.edges.forEach(({ node }: any) => {
    actions.createPage({
      path: `/work/${node.categoryId}`,
      component: resolve('./src/pages/work/[id].tsx'),
      context: {
        id: node.categoryId,
      },
    });
    actions.createPage({
      path: `/${node.language}/work/${node.categoryId}`,
      component: resolve('./src/pages/work/[id].tsx'),
      context: {
        id: node.categoryId,
      },
    });
  });

  const news = await graphql(`
    query {
      allNews {
        edges {
          node {
            id
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
        id: node.id,
      },
    });
  });
};
