import { useLocation } from '@reach/router';
import { useIntl } from 'gatsby-plugin-intl';
import { useEffect, useMemo, useState } from 'react';
import { changeLocale } from 'gatsby-plugin-intl';
import { getCurrentMenu } from '@Components/members/MembersWrapper/MembersWarpper.helper';

const useGNB = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const intl = useIntl();
  const location = useMemo(() => getCurrentMenu(), []);
  const path = useLocation();

  const handleChangeLanguage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { locale } = intl;
    const { lang } = (e.target as HTMLElement).dataset as { lang: 'ko' | 'en' };

    if (!lang) return;
    if (lang === locale) return;

    if (path.pathname === '/en' || path.pathname === '/ko') {
      changeLocale(lang, '/');
      return;
    }
    changeLocale(lang);
  };

  const handleMenuButtonClick = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const makeWidthByLanguage = (pathName: string) => {
    const { locale } = intl;
    if (locale === 'ko') {
      return pathName !== `/${locale}/members` ? 54 : 41;
    }

    const lang = 'en';
    switch (pathName) {
      case `/${lang}/introduce`:
        return 45;
      case `/${lang}/work`:
        return 69;
      case `/${lang}/members`:
        return 102;
      case `/${lang}/news`:
        return 40;
      case `/${lang}/contact`:
        return 58;
      default:
        return 41;
    }
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
    location,
    path,
    makeWidthByLanguage,
  };
};

export default useGNB;
