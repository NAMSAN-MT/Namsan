const GNBLink = [
  {
    name: '남산소개',
    herf: '/introduce',
    alt: 'introduce',
  },
  {
    name: '업무분야',
    herf: '/work',
    alt: 'work',
  },
  {
    name: '구성원',
    herf: '/members',
    alt: 'members',
  },
  {
    name: '소식',
    herf: '/news',
    alt: 'news',
  },
  {
    name: 'Contact',
    herf: '/contact',
    alt: 'contact',
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
