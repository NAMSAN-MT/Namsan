import { Link } from 'gatsby';
import React from 'react';
import { GNBLink, LanguageLink } from './GNB.const';
import useGNB from './GNB.hook';
import * as S from './GNB.style';

const GNB: React.FC = () => {
  const { handleChnageLanguage, language } = useGNB();
  return (
    <S.GNBWrapper>
      <div>NAMSAN</div>
      <S.MainLinkWrapper>
        {GNBLink.map(link => (
          <Link className="link" key={link.alt} to={link.herf} about={link.alt}>
            {link.name}
          </Link>
        ))}
      </S.MainLinkWrapper>
      <S.LanguageWrapper onClick={handleChnageLanguage}>
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
