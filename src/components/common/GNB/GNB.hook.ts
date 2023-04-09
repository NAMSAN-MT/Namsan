import { useIntl } from 'gatsby-plugin-intl';
import { useEffect, useRef, useState } from 'react';
import { changeLocale } from 'gatsby-plugin-intl';

const useGNB = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const intl = useIntl();

  const handleChangeLanguage = (e: React.MouseEvent<HTMLElement>) => {
    const { locale } = intl;
    e.preventDefault();
    const { lang } = (e.target as HTMLElement).dataset as { lang: 'ko' | 'en' };
    if (!lang) return;
    if (lang === locale) return;
    changeLocale(lang);
  };

  const handleMenuButtonClick = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      window.document.body.style.overflow = 'hidden';
      return;
    }

    window.document.body.style.overflow = 'auto';
  }, [isMobileMenuOpen]);

  return {
    handleChangeLanguage,
    language: intl.locale,
    handleMenuButtonClick,
    isMobileMenuOpen,
  };
};

export default useGNB;
