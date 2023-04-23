import { getMember } from '@Api/member.api';
import Divider from '@Components/common/Divider';
import { IMember } from '@Interface/api.interface';
import React, { useEffect, useState } from 'react';
import IntroduceItem from '../IntroduceItem';
import { IntroduceType } from '../IntroduceItem/IntroduceItem.type';
import { introduceOrder } from './Member.const';
import { MemberProps } from './Member.interface';
import * as S from './Member.style';

const Member = (props: MemberProps) => {
  const [member, setMember] = useState<IMember>();

  useEffect(() => {
    (async () => {
      const member = await getMember(props.id);
      setMember(member);

      if (!member) {
        window.location.href = '/404';
      }
    })();
  }, []);

  if (!member) return <></>;

  return (
    <S.MemberWrapper>
      <S.ImageWrapper src={member.bgImagePath}>
        <S.ProfileImage src={member.imagePath} />
      </S.ImageWrapper>
      <S.TextWrapper>
        <div className="name">{member.name}</div>
        <div className="position">{member.position}</div>
        <div className="email">{member.email}</div>
        <S.TagWrapper>
          {member.businessFields.map(businessField => (
            <span className="tag">{businessField}</span>
          ))}
        </S.TagWrapper>
        <div className="description">
          {member.description && <div>{member.description}</div>}
        </div>
        {introduceOrder.map(key => {
          const values = member[key as IntroduceType];
          return (
            values && (
              <>
                <Divider />
                <IntroduceItem
                  titleKey={key as IntroduceType}
                  values={values}
                />
              </>
            )
          );
        })}
      </S.TextWrapper>
    </S.MemberWrapper>
  );
};

export default Member;
