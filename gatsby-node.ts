import { resolve } from 'path';

exports.createPages = async ({ actions }: { actions: any }) => {
  actions.createPage({
    path: '/member/1',
    component: resolve('./src/pages/member/[id].tsx'),
  });

  actions.createPage({
    path: '/work/C01',
    component: resolve('./src/pages/work/[id].tsx'),
  });
};
