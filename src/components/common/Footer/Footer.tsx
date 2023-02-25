import React from 'react';
import { TermAndConditionLink } from './Footer.const';
import * as S from './Footer.style';

const Footer: React.FC = () => {
  return (
    <S.FooterWrapper>
      <S.FirstSection>
        <div>NAMSAN</div>
        <div>
          {TermAndConditionLink.map((link, index) => (
            <S.TermAndConditionLink
              key={link.alt}
              to={link.herf}
              about={link.alt}
            >
              <span>{link.name}</span>
              {index !== TermAndConditionLink.length - 1 ? (
                <span className="divider">|</span>
              ) : null}
            </S.TermAndConditionLink>
          ))}
        </div>
      </S.FirstSection>
      <S.SecondSection>
        <div>
          <span>대표전화 : 02.754.0550</span>
          <span>대표팩스 : 02.754.0077</span>
          <span>대표이메일 : namsan@namsanlaw.com</span>
        </div>
        <div>
          <span>© Copyright 2015 Lim, Chung & Suh All rights reserved</span>
        </div>
      </S.SecondSection>
    </S.FooterWrapper>
  );
};

export default Footer;
