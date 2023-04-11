// FIXME: herf 주소 수정 필요 after url 정해지면
const TermAndConditionLink = [
  {
    name: '면책공고',
    herf: '/policy/disclaimer',
    alt: 'disclaimer',
  },
  {
    name: '개인정보 처리방침',
    herf: '/policy/privacy',
    alt: 'privacy',
  },
  {
    name: 'Contact Us',
    herf: '#contact',
    alt: 'contact',
  },
] as const;

export { TermAndConditionLink };
