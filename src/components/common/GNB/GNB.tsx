import { Link } from 'gatsby';
import React from 'react';
import { GNBLink, LanguageLink } from './GNB.const';
import useGNB from './GNB.hook';
import * as S from './GNB.style';
import LogoGNB from '@Images/LogoGNB.svg';

const GNB: React.FC = () => {
  const { handleChangeLanguage, language } = useGNB();
  return (
    <S.GNBWrapper>
      <S.LogoWrapper>
        <img src={LogoGNB} width="100%" alt="icon" />
      </S.LogoWrapper>
      <S.MainLinkWrapper>
        {GNBLink.map(link => (
          <Link className="link" key={link.alt} to={link.herf} about={link.alt}>
            {link.name}
          </Link>
        ))}
      </S.MainLinkWrapper>
      <S.LanguageWrapper onClick={handleChangeLanguage}>
        {LanguageLink.map(link => (
          <S.LanguageLink
            isActive={language.current === link.lang}
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
    </S.GNBWrapper>
  );
};

export default GNB;
