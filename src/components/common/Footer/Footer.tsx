import LogoFooter from '@Images/logo-footer.svg';
import { withTranslations } from '@Hocs/withTranslations';
import React from 'react';
import { TermAndConditionLink } from './Footer.const';
import { IFooterProps } from './Footer.interface';
import * as S from './Footer.style';

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
              href={link.herf}
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
          <span>
            {props.intl.formatMessage({
              id: 'footer.ad_report',
            })}
          </span>
          <div className="address">
            {props.intl.formatMessage({
              id: 'footer.address',
            })}
          </div>
        </div>
        <div>
          <span>© Copyright 2023 Lim, Chung & Suh all rights reserved</span>
        </div>
      </S.SecondSection>
    </S.FooterWrapper>
  );
};

export default withTranslations(Footer);
