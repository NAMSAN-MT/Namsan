import { useEffect, useRef, useState } from 'react';

const useGNB = () => {
  const language = useRef<'ko' | 'en'>('ko');
  const [isOpen, setIsOpen] = useState(false);

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

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
      return;
    }

    window.document.body.style.overflow = 'auto';
  }, [isOpen]);

  return {
    handleChangeLanguage,
    language,
    handleMenuButtonClick,
    isOpen,
  };
};

export default useGNB;
