export const siteMetadata = {
  title: '법무법인 남산 | Lim, Chung & Suh',
  description:
    '법무법인 남산은 1980년 시작된 이래 현재까지 깊이 있는 역량과 정성으로 고객을 위한 맞춤형 법률 서비스를 제공하고 있습니다.',
  ogTitle: '법무법인 남산 | Lim, Chung & Suh',
  ogDescription: '시대를 넘어 함께 하는 법률 파트너',
  ogUrl: 'https://www.namsanlaw.com/',
  keywords:
    '남산,법무법인남산,법률사무소,변호사,로펌,승소,소송,법률자문,기업자문,재판,금융,건설,부동산,조세,관세,형사,식품,인사,노무,상속,보험,명동,법무법인',
  favicon: '/favicon.ico',
  ogImage: '/op_kakao.png',
  siteUrl: 'https://www.namsanlaw.com',
} as const;

export type SiteMetadata = typeof siteMetadata;
