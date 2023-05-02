import { IMember } from '@Interface/api.interface';
import { createRemoteFileNode } from 'gatsby-source-filesystem';
import { resolve } from 'path';
import { getFileFromStorage } from './src/api/index.api';

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
        image: {
          ...file.data.file.childImageSharp.gatsbyImageData,
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
      allWork(sort: { categoryId: ASC }) {
        edges {
          node {
            id
            language
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
    component: resolve('./src/pages/work/index.tsx'),
    context: {
      data: works.data.allWork.edges,
    },
  });

  works.data.allWork.edges.forEach(async ({ node }: any) => {
    const query = (member: string) => `
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
    const imageQuery = (id: string) => `
    query {
      file(parent: {id: {eq: "${id}"}}) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }`;

    const bgImageQuery = (path: string) => `
      query {
        file(name: {eq: "${path}"}) {
          childImageSharp {
            gatsbyImageData
          }
        }
    }`;

    const mainMemberData = await Promise.all(
      node.member.main.map((member: string) =>
        graphql(query(member)).then((r: any) => r.data.members),
      ),
    );
    const mainMemberImageData = await Promise.all(
      mainMemberData.map(
        async member =>
          (await member?.id) &&
          graphql(imageQuery(member.id)).then(
            (r: any) => r.data.file.childImageSharp.gatsbyImageData,
          ),
      ),
    );

    const mainMemberBgImageData = await Promise.all(
      mainMemberData.map(
        async member =>
          (await member?.id) &&
          graphql(bgImageQuery(member.bgImagePath)).then(
            (r: any) => r.data.file.childImageSharp.gatsbyImageData,
          ),
      ),
    );

    const subMemberData = await Promise.all(
      node.member.sub.map((member: string) =>
        graphql(query(member)).then((r: any) => r.data.members),
      ),
    );

    const subMemberImageData = await Promise.all(
      subMemberData.map(
        async member =>
          (await member?.id) &&
          graphql(imageQuery(member.id)).then(
            (r: any) => r.data.file.childImageSharp.gatsbyImageData,
          ),
      ),
    );

    const subMemberBgImageData = await Promise.all(
      subMemberData.map(
        async member =>
          (await member?.id) &&
          graphql(bgImageQuery(member.bgImagePath)).then(
            (r: any) => r.data.file.childImageSharp.gatsbyImageData,
          ),
      ),
    );

    actions.createPage({
      path: `/work/${node.categoryId}`,
      component: resolve('./src/pages/work/[id].tsx'),
      context: {
        id: node.categoryId,
        mainMemberData,
        mainMemberImageData,
        mainMemberBgImageData,
        subMemberData,
        subMemberImageData,
        subMemberBgImageData,
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
