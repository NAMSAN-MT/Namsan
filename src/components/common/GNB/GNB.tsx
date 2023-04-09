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
import AnimationWrapper from '../AnimationWrapper/AnimationWrapper';

const MobileMenuButton = ({ isOpen, onClick }: IMobileMenuButtonProps) => {
  return (
    <S.MobileMenuButton onClick={onClick}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </S.MobileMenuButton>
  );
};

const GNB = ({ intl }: IGNBProps) => {
  const {
    handleChangeLanguage,
    language,
    isOpen,
    handleMenuButtonClick,
    setSelected,
    selected,
  } = useGNB();

  return (
    <S.GNBWrapper className={isOpen ? 'open' : ''}>
      <S.LogoWrapper>
        <Link className="link" key="home" to="/" about="home">
          <img src={LogoGNB} width="100%" alt="icon" />
        </Link>
      </S.LogoWrapper>
      <S.MainLinkWrapper>
        {GNBLink.map(link => (
          <Link
            key={link.alt}
            onClick={() => {
              if (selected === link.herf + '/') return;
              setSelected(link.herf);
            }}
            className="link"
            to={link.herf}
            about={link.alt}
          >
            <S.LinkNameWrapper
              whileHover={{
                color: '#193F9A',
                scale: 1.1,
                originX: 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              selected={selected === link.herf + '/'}
            >
              {link.name}
            </S.LinkNameWrapper>
            {selected === link.herf + '/' && (
              <S.LinkUnderline layoutId="underline" />
            )}
          </Link>
        ))}
      </S.MainLinkWrapper>
      <S.LanguageWrapper onClick={handleChangeLanguage}>
        {LanguageLink.map(link => (
          <S.LanguageLink
            $isActive={language.current === link.lang}
            key={link.alt}
            to={link.herf}
            data-lang={link.lang}
            about={link.alt}
          >
            {link.name}
          </S.LanguageLink>
        ))}
        <div className="divider">|</div>
      </S.LanguageWrapper>

      {isOpen && (
        <AnimationWrapper
          variantName="transition"
          initial="hidden"
          threshold={0.5}
        >
          <S.MenuItemList className="menu-items">
            <S.MenuItem>
              <a href="/introduce">
                {intl.formatMessage({ id: 'common.introduce' })}
              </a>
            </S.MenuItem>
            <S.MenuItem>
              <a href="work">{intl.formatMessage({ id: 'common.work' })}</a>
            </S.MenuItem>
            <S.MenuItem>
              <a href="members">
                {intl.formatMessage({ id: 'common.member' })}
              </a>
            </S.MenuItem>
            <S.MenuItem>
              <a href="news">{intl.formatMessage({ id: 'common.news' })}</a>
            </S.MenuItem>
            <S.MenuItem>
              <a href="contact">
                {intl.formatMessage({ id: 'common.contact' })}
              </a>
            </S.MenuItem>
          </S.MenuItemList>
        </AnimationWrapper>
      )}
      <MobileMenuButton isOpen={isOpen} onClick={handleMenuButtonClick} />
    </S.GNBWrapper>
  );
};

export default injectIntl(GNB);
