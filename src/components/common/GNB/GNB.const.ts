const GNBLink = [
  {
    href: '/introduce',
    alt: 'introduce',
    translationId: 'common.introduce',
  },
  {
    href: '/work',
    alt: 'work',
    translationId: 'common.work',
  },
  {
    href: '/members',
    alt: 'members',
    translationId: 'common.members',
  },
  {
    href: '/news',
    alt: 'news',
    translationId: 'common.news',
  },
  {
    href: '/contact',
    alt: 'contact',
    translationId: 'common.contact',
  },
] as const;

const LanguageLink = [
  {
    name: 'KOR',
    alt: 'kor',
    lang: 'ko',
  },
  {
    name: 'ENG',
    alt: 'eng',
    lang: 'en',
  },
] as const;

export { GNBLink, LanguageLink };
