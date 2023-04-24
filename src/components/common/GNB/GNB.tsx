import { Link } from 'gatsby';
import React from 'react';
import { GNBLink, LanguageLink } from './GNB.const';
import useGNB from './GNB.hook';
import * as S from './GNB.style';
import MenuIcon from '@Components/icons/MenuIcon';
import { IGNBProps, IMobileMenuButtonProps } from './GNB.interface';
import CloseIcon from '@Components/icons/CloseIcon';
import { injectIntl } from 'gatsby-plugin-intl';
import AnimationWrapper from '../AnimationWrapper/AnimationWrapper';
import LogoIcon from '@Components/icons/LogoIcon';

const MobileMenuButton = ({
  isMobileMenuOpen,
  onClick,
  isMobile,
}: IMobileMenuButtonProps) => {
  return (
    <S.MobileMenuButton onClick={onClick}>
      {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon isMobile={isMobile} />}
    </S.MobileMenuButton>
  );
};

const GNB = ({ intl, isTransparent, isMobile }: IGNBProps) => {
  const {
    handleChangeLanguage,
    language,
    isMobileMenuOpen,
    handleMenuButtonClick,
    location,
  } = useGNB();
  return (
    <S.GNBWrapper
      className={isMobileMenuOpen ? 'open' : ''}
      isTransparent={isTransparent}
    >
      <S.LogoWrapper>
        <Link className="link" key="home" to="/" about="home">
          <LogoIcon width="100%" isMobile={isMobile} />
        </Link>
      </S.LogoWrapper>
      <S.MainLinkWrapper>
        {GNBLink.map(({ href, alt, translationId }) => (
          <Link key={alt} className="link" to={href} about={alt}>
            <S.LinkNameWrapper
              whileHover={{
                color: '#193F9A',
                scale: 1.1,
                originX: 0,
              }}
              className={location === alt ? 'on' : ''}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              selected={location === alt}
            >
              {intl.formatMessage({ id: translationId })}
            </S.LinkNameWrapper>
            {location === alt && <S.LinkUnderline layoutId="underline" />}
          </Link>
        ))}
      </S.MainLinkWrapper>
      <S.LanguageWrapper onClick={handleChangeLanguage}>
        {LanguageLink.map(link => (
          <S.LanguageLink
            $isActive={language === link.lang}
            key={link.alt}
            data-lang={link.lang}
          >
            {link.name}
          </S.LanguageLink>
        ))}
      </S.LanguageWrapper>
      {isMobileMenuOpen && (
        <AnimationWrapper
          variantName="transition"
          initial="hidden"
          threshold={0.5}
        >
          <S.MobileMenuWrapper>
            <S.MobileMenuItemList className="menu-items">
              {GNBLink.map(({ href, translationId, alt }) => (
                <S.MobileMenuItem>
                  <Link
                    to={href}
                    about={alt}
                    key={alt}
                    className={alt === location ? 'on' : ''}
                  >
                    {intl.formatMessage({ id: translationId })}
                  </Link>
                </S.MobileMenuItem>
              ))}
            </S.MobileMenuItemList>
            <S.MobileLanguageWrapper onClick={handleChangeLanguage}>
              {LanguageLink.map(link => (
                <S.MobileLanguageLink
                  $isActive={language === link.lang}
                  data-lang={link.lang}
                >
                  {link.name}
                </S.MobileLanguageLink>
              ))}
            </S.MobileLanguageWrapper>
          </S.MobileMenuWrapper>
        </AnimationWrapper>
      )}
      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        onClick={handleMenuButtonClick}
        isMobile={isMobile}
      />
    </S.GNBWrapper>
  );
};

export default injectIntl(GNB);
