import { resolve } from 'path';

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: '/member',
    matchPath: '/member/:param',
    component: resolve('./src/pages/member/[id].tsx'),
  });

  console.log(createPage);
};

exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
  deletePage(page);
  createPage({
    ...page,
    // Whatever additional logic you might need here
  });
};
