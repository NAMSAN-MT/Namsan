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
          }
        }
      }
    }
  `);
  works.data.allWork.edges.forEach(({ node }: any) => {
    actions.createPage({
      path: `/work/${node.id}`,
      component: resolve('./src/pages/work/[id].tsx'),
      context: {
        id: node.id,
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
