import { Link } from 'gatsby';
import React from 'react';
import { GNBLink, LanguageLink } from './GNB.const';
import useGNB from './GNB.hook';
import * as S from './GNB.style';
import LogoGNB from '@Images/logo-gnb.svg';
import MenuIcon from '@Components/icons/MenuIcon';
import { IGNBProps, IMobileMenuButtonProps } from './GNB.interface';
import CloseIcon from '@Components/icons/CloseIcon';
import { injectIntl } from 'gatsby-plugin-intl';

const MobileMenuButton = ({
  isMobileMenuOpen,
  onClick,
}: IMobileMenuButtonProps) => {
  return (
    <S.MobileMenuButton onClick={onClick}>
      {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
    </S.MobileMenuButton>
  );
};

const GNB = ({ intl }: IGNBProps) => {
  const {
    handleChangeLanguage,
    language,
    isMobileMenuOpen,
    handleMenuButtonClick,
    location,
  } = useGNB();

  return (
    <S.GNBWrapper className={isMobileMenuOpen ? 'open' : ''}>
      <S.LogoWrapper>
        <Link className="link" key="home" to="/" about="home">
          <img src={LogoGNB} width="100%" alt="icon" />
        </Link>
      </S.LogoWrapper>
      <S.MainLinkWrapper>
        {GNBLink.map(link => (
          <Link className="link" key={link.alt} to={link.href} about={link.alt}>
            {intl.formatMessage({ id: link.translationId })}
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
      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        onClick={handleMenuButtonClick}
      />
      {isMobileMenuOpen && (
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
      )}
    </S.GNBWrapper>
  );
};

export default injectIntl(GNB);
