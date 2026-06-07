import { useRouter } from 'next/router';
import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentMenu } from '@Components/members/MembersWrapper/MembersWarpper.helper';

const useGNB = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const location = useMemo(() => getCurrentMenu(), []);
  // normalize trailing slash so comparisons match `/${locale}${href}`
  const pathname = router.asPath.split('?')[0].replace(/\/$/, '') || '/';
  const path = { pathname };
  const getIsIncludes = (alt: string) => pathname.split('/').includes(alt);

  const handleChangeLanguage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { lang } = (e.target as HTMLElement).dataset as { lang: 'ko' | 'en' };

    if (!lang) return;
    if (lang === locale) return;

    if (pathname === '/en' || pathname === '/ko') {
      router.push(`/${lang}/`);
      return;
    }
    router.push(pathname.replace(/^\/(en|ko)/, `/${lang}`));
  };

  const handleMenuButtonClick = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const makeWidthByLanguage = (pathName: string) => {
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
    language: locale,
    handleMenuButtonClick,
    isMobileMenuOpen,
    location,
    path,
    getIsIncludes,
    makeWidthByLanguage,
  };
};

export default useGNB;
