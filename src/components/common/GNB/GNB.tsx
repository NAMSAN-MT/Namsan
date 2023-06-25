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
    isMobileMenuOpen,
    handleMenuButtonClick,
    location,
    path,
    makeWidthByLanguage,
  } = useGNB();

  return (
    <S.GNBWrapper
      className={isMobileMenuOpen ? 'open' : ''}
      isTransparent={isTransparent}
    >
      <S.LogoWrapper>
        <Link className="link" key="home" to={`/${intl.locale}/`} about="home">
          <LogoIcon
            width="100%"
            isMobile={isMobile}
            isTransparent={isTransparent}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </Link>
      </S.LogoWrapper>
      <S.MainLinkWrapper>
        {GNBLink.map(({ href, alt, translationId }) => {
          return (
            <Link
              key={alt}
              className="link"
              to={`/${intl.locale}${href}`}
              about={alt}
            >
              {path.pathname === `/${intl.locale}${href}` ? (
                <>
                  <S.LinkNameWrapper
                    whileHover={{
                      color: '#193F9A',
                      originX: 0,
                    }}
                    className={location === alt ? 'on' : ''}
                    selected={path.pathname === `/${intl.locale}${href}`}
                  >
                    {intl.formatMessage({ id: translationId })}
                    <S.LinkNameInner>
                      <LottieWrapper
                        height={4}
                        animationData={Focus}
                        width={
                          path.pathname !== `/${intl.locale}/members` ? 58 : 43
                        }
                        loop={false}
                        autoplay
                      />
                    </S.LinkNameInner>
                  </S.LinkNameWrapper>
                </>
              ) : (
                <S.LinkNameWrapper
                  whileHover={{
                    color: '#193F9A',
                    originX: 0,
                  }}
                  className={location === alt ? 'on' : ''}
                  selected={path.pathname === `/${intl.locale}${href}`}
                >
                  {intl.formatMessage({ id: translationId })}
                  <S.LinkNameInner>
                    <LottieWrapper
                      height={4}
                      animationData={Focus}
                      width={makeWidthByLanguage(path.pathname)}
                      loop={false}
                      autoplay
                    />
                  </S.LinkNameInner>
                </S.LinkNameWrapper>
              )}
            </Link>
          );
        })}
      </S.MainLinkWrapper>
      <S.LanguageWrapper onClick={handleChangeLanguage}>
        {LanguageLink.map(link => (
          <S.LanguageLink
            $isActive={intl.locale === link.lang}
            isEn={link.lang === 'en'}
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
                    to={`/${intl.locale}${href}`}
                    about={alt}
                    key={alt}
                    className={
                      `/${intl.locale}${href}` === path.pathname ? 'on' : ''
                    }
                  >
                    {intl.formatMessage({ id: translationId })}
                  </Link>
                </S.MobileMenuItem>
              ))}
            </S.MobileMenuItemList>
            <S.MobileLanguageWrapper onClick={handleChangeLanguage}>
              {LanguageLink.map(link => (
                <S.MobileLanguageLink
                  $isActive={intl.locale === link.lang}
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
