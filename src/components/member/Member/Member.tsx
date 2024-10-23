import Divider from '@Components/common/Divider';
import { GatsbyImage } from 'gatsby-plugin-image';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import { isEmpty } from 'lodash';
import React from 'react';
import IntroduceItem from '../IntroduceItem';
import { IntroduceType } from '../IntroduceItem/IntroduceItem.type';
import MemberDescription from '../MemberDescription/MemberDescription';
import { introduceOrder } from './Member.const';
import { MemberProps } from './Member.interface';
import * as S from './Member.style';

const Member = (props: MemberProps & WrappedComponentProps) => {
  const { member } = props;

  if (!member) return <></>;

  const handleClickTag = (index: number) => {
    const category = props.member.categoryIds[index];

    if (isEmpty(category)) {
      return;
    }

    window.location.href = `/${props.intl.locale}/work/${category}`;
  };

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
        <div className="name">{member.name.toUpperCase()}</div>
        <div className="position">{member.position}</div>
        <div className="email">{member.email}</div>
        <S.TagWrapper>
          {member.businessFields.map((businessField, index) => (
            <span
              className="tag"
              key={index}
              onClick={handleClickTag.bind(null, index)}
            >
              {businessField}
            </span>
          ))}
        </S.TagWrapper>
        <div className="description">
          <MemberDescription member={member} />
        </div>
        {introduceOrder.map(key => {
          const values = member[key as IntroduceType]!;
          const isValid = !isEmpty(values);
          return (
            isValid && (
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
