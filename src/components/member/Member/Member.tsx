import Divider from '@Components/common/Divider';
import React from 'react';
import IntroduceItem from '../IntroduceItem';
import { IntroduceType } from '../IntroduceItem/IntroduceItem.type';
import { introduceOrder } from './Member.const';
import { MemberProps } from './Member.interface';
import * as S from './Member.style';
import { injectIntl } from 'gatsby-plugin-intl';
import { GatsbyImage } from 'gatsby-plugin-image';

const Member = (props: MemberProps) => {
  const { member } = props;
  if (!member) return <></>;

  return (
    <S.MemberWrapper>
      <S.ImageWrapper>
        <div className="bg">
          <GatsbyImage image={member.bgImage} alt={member.id} />
        </div>
        <div className="profile">
          <GatsbyImage image={member.image} alt={member.id} />
        </div>
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

export default injectIntl(Member);
