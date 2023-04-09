import React from 'react';
import { TermAndConditionLink } from './Footer.const';
import * as S from './Footer.style';
import LogoFooter from '@Images/logo-footer.svg';
import { injectIntl } from 'gatsby-plugin-intl';
import { IFooterProps } from './Footer.interface';

const Footer = (props: IFooterProps) => {
  return (
    <S.FooterWrapper>
      <S.FirstSection>
        <S.LogoWrapper>
          <img src={LogoFooter} width="100%" alt="icon" />
        </S.LogoWrapper>
        <div>
          {TermAndConditionLink.map((link, index) => (
            <S.TermAndConditionLink
              key={link.alt}
              to={link.herf}
              about={link.alt}
            >
              <span>
                {props.intl.formatMessage({
                  id: `footer.title_${index + 1}`,
                })}
              </span>
              {index !== TermAndConditionLink.length - 1 ? (
                <span className="divider">|</span>
              ) : null}
            </S.TermAndConditionLink>
          ))}
        </div>
      </S.FirstSection>
      <S.SecondSection>
        <div>
          <span className="fax">
            {props.intl.formatMessage({
              id: 'footer.phone',
            })}
          </span>
          <span className="fax">
            {props.intl.formatMessage({
              id: 'footer.fax',
            })}
          </span>
          <span>
            {props.intl.formatMessage({
              id: 'footer.email',
            })}
          </span>
        </div>
        <div>
          <span>© Copyright 2015 Lim, Chung & Suh All rights reserved</span>
        </div>
      </S.SecondSection>
    </S.FooterWrapper>
  );
};

export default injectIntl(Footer);
