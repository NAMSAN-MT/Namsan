import { useIntl } from 'gatsby-plugin-intl';
import { useEffect, useMemo, useState } from 'react';
import { changeLocale } from 'gatsby-plugin-intl';
import { getCurrentMenu } from '@Components/members/MembersWrapper/MembersWarpper.helper';

const useGNB = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const intl = useIntl();
  const location = useMemo(() => getCurrentMenu(), []);

  const handleChangeLanguage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { locale } = intl;
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
    location,
  };
};

export default useGNB;
