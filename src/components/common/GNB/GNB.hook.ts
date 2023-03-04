import { useRef } from 'react';

const useGNB = () => {
  const language = useRef<'ko' | 'en'>('ko');

  const handleChangeLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLAnchorElement) {
      e.preventDefault();
      // FIXME: 추후 수정 필요
      const { lang } = e.target.dataset as { lang: 'ko' | 'en' };
      if (!lang) return;
      if (lang === language.current) return;
      language.current = lang;
    }
  };

  return {
    handleChangeLanguage,
    language,
  };
};

export default useGNB;
