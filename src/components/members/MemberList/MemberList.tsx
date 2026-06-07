import { IMember } from '@Interface/api.interface';
import { withTranslations } from '@Hocs/withTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TLanguage } from '../../../type/intl.type';
import MemberItem from '../MemberItem';
import { IMemberListProps } from './MemberList.interface';
import * as S from './MemberList.style';

const MemberList = ({ intl, members }: IMemberListProps) => {
  // Read filters from the URL query so the list re-filters under shallow
  // routing (router.query is reactive) and we never read `document` in render.
  const router = useRouter();
  const name = (router.query.name as string) || '';
  const position = (router.query.position as string) || '';
  const businessField = (router.query.businessField as string) || '';

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
        const paramName = params.name?.toUpperCase();
        const memberName = member.name?.toUpperCase() ?? '';

        return (
          (!paramName || memberName.includes(paramName)) &&
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
          name={member.name?.toUpperCase() ?? ''}
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

export default withTranslations(MemberList);
