import { useRef } from 'react';

const useGNB = () => {
  const language = useRef<'ko' | 'en'>('ko');

  const handleChnageLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
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
    handleChnageLanguage,
    language,
  };
};

export default useGNB;
