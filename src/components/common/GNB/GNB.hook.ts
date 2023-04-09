import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@reach/router';

const useGNB = () => {
  const location = useLocation();
  const language = useRef<'ko' | 'en'>('ko');
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState(location.pathname);

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
    setSelected,
    selected,
  };
};

export default useGNB;
