import { injectIntl } from 'gatsby-plugin-intl';
import React from 'react';
import Info from '../Info';
import Title from '../Title';
import { IRecruiteSectionProps } from './RecruiteSection.interface';
import * as S from './RecruiteSection.style';

const RecruiteSection = ({ intl }: IRecruiteSectionProps) => {
  return (
    <S.RecruiteSectionWrapper>
      <Title title={intl.formatMessage({ id: 'contact.recruite' })} />
      <S.Description>
        {intl.formatMessage({ id: 'contact.recruite_description' })}
      </S.Description>
      <Info.Wrapper>
        <Info.Column>
          <Info
            title={intl.formatMessage({ id: 'contact.title_email' })}
            content="recruit@namsanlaw.com"
          />
        </Info.Column>
      </Info.Wrapper>
    </S.RecruiteSectionWrapper>
  );
};

export default injectIntl(RecruiteSection);
