import { resolve } from 'path';

exports.createPages = async ({ actions, graphql }: any) => {
  const members = await graphql(`
    query {
      allMembers {
        edges {
          node {
            id
          }
        }
      }
    }
  `);
  members.data.allMembers.edges.forEach(({ node }: any) => {
    actions.createPage({
      path: `/member/${node.id}`,
      component: resolve('./src/pages/member/[id].tsx'),
      context: {
        id: node.id,
      },
    });
  });

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
};
