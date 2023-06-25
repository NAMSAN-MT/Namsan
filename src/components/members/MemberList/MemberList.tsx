import { IMember } from '@Interface/api.interface';
import { injectIntl } from 'gatsby-plugin-intl';
import React, { useEffect, useState } from 'react';
import { TLanguage } from '../../../type/intl.type';
import MemberItem from '../MemberItem';
import { getSearchParams } from '../MembersWrapper/MembersWarpper.helper';
import { IMemberListProps } from './MemberList.interface';
import * as S from './MemberList.style';

const MemberList = ({ intl, members }: IMemberListProps) => {
  const { name, position, businessField } = getSearchParams();

  const [memberList, setMemberList] = useState<IMember[]>(members);

  useEffect(() => {
    (async () => {
      const params = {
        name,
        position,
        businessField,
        language: intl.locale as TLanguage,
      };

      const newMembers = members.filter(member => {
        return (
          (!params.name || member.name.includes(params.name)) &&
          (!params.position || member.position.startsWith(params.position)) &&
          (!params.businessField ||
            member.businessFields.includes(params.businessField)) &&
          (!params.language || member.language === intl.locale)
        );
      });
      setMemberList(newMembers);
    })();
  }, [name, position, businessField, intl.locale]);

  if (!memberList || memberList.length === 0) {
    return (
      <S.EmptyMember>
        {intl.formatMessage({ id: 'members.empty_result' })}
      </S.EmptyMember>
    );
  }

  return (
    <S.MemberList>
      {memberList.map(member => (
        <MemberItem
          key={member.id}
          name={member.name.toUpperCase()}
          position={member.position}
          businessFields={member.businessFields}
          image={member.image}
          id={member.id}
          order={member.order}
        />
      ))}
    </S.MemberList>
  );
};

export default injectIntl(MemberList);
