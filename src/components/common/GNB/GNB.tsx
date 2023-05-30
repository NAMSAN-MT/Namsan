import { Link } from 'gatsby';
import React from 'react';
import { GNBLink, LanguageLink } from './GNB.const';
import useGNB from './GNB.hook';
import * as S from './GNB.style';
import MenuIcon from '@Components/icons/MenuIcon';
import { IGNBProps, IMobileMenuButtonProps } from './GNB.interface';
import AnimationWrapper from '../AnimationWrapper/AnimationWrapper';
import LogoIcon from '@Components/icons/LogoIcon';
import { injectIntl } from 'gatsby-plugin-intl';
import LottieWrapper from '../LottieWrapper/LottieWrapper';
import ButtonMenu from '../../../assets/lottie/button_menu.json';
import Focus from '../../../assets/lottie/focus.json';

const MobileMenuButton = ({
  isMobileMenuOpen,
  onClick,
  isMobile,
}: IMobileMenuButtonProps) => {
  return (
    <S.MobileMenuButton onClick={onClick}>
      {isMobileMenuOpen ? (
        <LottieWrapper
          animationData={ButtonMenu}
          width={24}
          height={12}
          loop={false}
          autoplay={true}
        />
      ) : (
        <MenuIcon isMobile={isMobile} />
      )}
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
    path,
  } = useGNB();

  return (
    <S.GNBWrapper
      className={isMobileMenuOpen ? 'open' : ''}
      isTransparent={isTransparent}
    >
      <S.LogoWrapper>
        <Link className="link" key="home" to={`/${language}/`} about="home">
          <LogoIcon
            width="100%"
            isMobile={isMobile}
            isTransparent={isTransparent}
          />
        </Link>
      </S.LogoWrapper>
      <S.MainLinkWrapper>
        {GNBLink.map(({ href, alt, translationId }) => (
          <Link
            key={alt}
            className="link"
            to={`/${language}${href}`}
            about={alt}
          >
            {path.pathname === `/${language}${href}` ? (
              <S.LinkNameInner>
                {intl.formatMessage({ id: translationId })}
                <LottieWrapper
                  animationData={Focus}
                  width={path.pathname !== `/${language}/members` ? 50 : 40}
                  loop={false}
                  autoplay
                />
              </S.LinkNameInner>
            ) : (
              <S.LinkNameWrapper
                whileHover={{
                  color: '#193F9A',
                  originX: 0,
                }}
                className={location === alt ? 'on' : ''}
                selected={path.pathname === `/${language}${href}`}
              >
                {intl.formatMessage({ id: translationId })}
              </S.LinkNameWrapper>
            )}
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
        isMobile={isMobile && isTransparent}
      />
    </S.GNBWrapper>
  );
};

export default injectIntl(GNB);
