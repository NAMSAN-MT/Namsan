import { IMember } from '@Interface/api.interface';
import { createRemoteFileNode } from 'gatsby-source-filesystem';
import { resolve } from 'path';
import { getFileFromStorage } from './src/api/index.api';
import { isEmpty, isNumber } from 'lodash';

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

  if (node.internal.type === 'news') {
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
          descriptionPreview
          educations {
            time
            value
          }
          careers {
            time
            value
          }
          papers {
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
      const imageUniqueId = node.imagePath.split('/')[1].split('.')[0];

      const profileImage = await graphql(`
      query {
        file(name: {regex: "/${imageUniqueId}/g"}) {
          childImageSharp {
            gatsbyImageData
          }
        }
    }`);

      const bgImage = await graphql(`
      query {
        file(name: {eq: "${node.bgImagePath}"}) {
          childImageSharp {
            gatsbyImageData
          }
        }
      }`);

      const categoryIds = await Promise.all(
        node.businessFields.map(async (field: string) => {
          const category = await graphql(`
        query {
          work(categoryInfo: {in: "${field}"}) {
            categoryId
          }
        }`);
          return category.data.work?.categoryId || '';
        }),
      );

      return {
        ...node,
        image: {
          ...profileImage.data.file?.childImageSharp.gatsbyImageData,
          backgroundColor: '#F6F8FA',
        },
        bgImage: bgImage.data.file?.childImageSharp.gatsbyImageData,
        categoryIds,
      };
    }),
  );

  /* 전체 구성원 페이지 생성 */
  actions.createPage({
    path: '/members',
    component: resolve('./src/templates/members.tsx'),
    context: {
      id: 'members',
      members: contextMembers,
    },
  });

  /* 개별 구성원 페이지 생성 */
  await Promise.all(
    contextMembers.map(async (node: any) => {
      actions.createPage({
        path: `/member/${node.order}`,
        component: resolve('./src/pages/member/[order].tsx'),
        context: {
          id: node.id,
          members: contextMembers,
          order: node.order,
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
  const memberQuery = (email: string) => `
      query {
        members(email: { eq: "${email}" }) {
          id
          language
          email
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

  works.data.allWork.edges.forEach(async ({ node }: any) => {
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
        mainMemberEmails: node.member.main,
        subMemberEmails: node.member.sub,
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
            order
          }
        }
      }
    }
  `);

  const getNewsImage: any = async (id?: string) => {
    return !isEmpty(id)
      ? await graphql(`
        query {
          imagePath: file(parent: {id: {eq: "${id}"}}) {
            childImageSharp {
              gatsbyImageData
            }
          }
      }
      `)
      : undefined;
  };

  const getOrderNews = async (order?: number) => {
    return isNumber(order)
      ? await graphql(`
      query {
        news(order: { eq: ${order} }) {
          id
          title
        }
      }
    `)
      : undefined;
  };
  const len = news.data.allNews.edges.length;
  news.data.allNews.edges.forEach(async ({ node }: any) => {
    let prev, next, prevNews, nextNews;
    if (len > 1) {
      if (node.order === 1) {
        prev = node.order + 1;
        next = undefined;
      } else if (len === node.order) {
        prev = undefined;
        next = node.order - 1;
      } else {
        prev = node.order + 1;
        next = node.order - 1;
      }
    }

    if (prev) prevNews = await getOrderNews(prev);
    if (next) nextNews = await getOrderNews(next);

    const newsImageData = node.id
      ? await getNewsImage(node.id).then(({ data }: any) => ({
          ...data.imagePath?.childImageSharp.gatsbyImageData,
        }))
      : undefined;

    actions.createPage({
      path: `/news/${node.id}`,
      component: resolve('./src/pages/news/[id].tsx'),
      context: {
        news: {
          ...node,
          prevNews: prevNews?.data?.news,
          nextNews: nextNews?.data?.news,
          newsImageData,
        },
      },
    });
  });
};
