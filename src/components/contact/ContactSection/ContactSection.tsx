import { injectIntl } from 'gatsby-plugin-intl';
import React from 'react';
import Info from '../Info';
import Title from '../Title';
import { IContactSectionProps } from './ContactSection.interface';
import * as S from './ContactSection.style';

const ContactSection = ({ intl }: IContactSectionProps) => {
  return (
    <S.ContentSectionWrapper>
      <Title title="CONTACT" />
      {/* TODO: 지도 추가하기 */}
      <Info.Wrapper>
        <Info.Column>
          <Info
            title="ADDRESS"
            content={intl.formatMessage({ id: 'contact.address' })}
          />
        </Info.Column>
        <Info.Column>
          <Info title="E-MAIL" content="namsan@namsanlaw.com" />
          <Info title="TEL" content="02-777-0550" />
          <Info title="FAX" content="02-754-0077" />
        </Info.Column>
      </Info.Wrapper>
    </S.ContentSectionWrapper>
  );
};

export default injectIntl(ContactSection);
