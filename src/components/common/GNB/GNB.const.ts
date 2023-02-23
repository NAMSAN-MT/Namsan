const GNBLink = [
  {
    name: '남산소개',
    herf: '/introduce',
    alt: 'introduce',
  },
  {
    name: '업무분야',
    herf: '/work',
    alt: 'Work',
  },
  {
    name: '구성원',
    herf: '/members',
    alt: 'Members',
  },
  {
    name: '소식',
    herf: '/news',
    alt: 'News',
  },
  {
    name: 'Contact',
    herf: '/contact',
    alt: 'Contact',
  },
] as const;

const LanguageLink = [
  {
    name: 'KOR',
    herf: '#ko',
    alt: 'kor',
    lang: 'ko',
  },
  {
    name: 'ENG',
    herf: '#en',
    alt: 'eng',
    lang: 'en',
  },
] as const;

export { GNBLink, LanguageLink };
