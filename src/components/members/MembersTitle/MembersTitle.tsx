import React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';
import { IMembersTitleProps } from './MembersTitle.interface';
import * as S from './MembersTitle.style';

const MembersTitle = ({ intl }: IMembersTitleProps) => {
  return (
    <S.MembersTitle>
      {intl.formatMessage({ id: 'members.introduce_members' })}
    </S.MembersTitle>
  );
};

export default injectIntl(MembersTitle);
