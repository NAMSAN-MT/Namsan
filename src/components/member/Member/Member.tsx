import AppImage from '@Components/common/AppImage';
import Divider from '@Components/common/Divider';
import { withTranslations, WithIntlProps } from '@Hocs/withTranslations';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import IntroduceItem from '../IntroduceItem';
import { IntroduceType } from '../IntroduceItem/IntroduceItem.type';
import MemberDescription from '../MemberDescription/MemberDescription';
import { introduceOrder } from './Member.const';
import { MemberProps } from './Member.interface';
import * as S from './Member.style';

const Member = (props: MemberProps & WithIntlProps) => {
  const { member } = props;
  const router = useRouter();

  if (!member) return <></>;

  const handleClickTag = (index: number) => {
    const category = props.member.categoryIds[index];

    if (isEmpty(category)) {
      return;
    }

    router.push(`/${props.intl.locale}/work/${category}`);
  };

  return (
    <S.MemberWrapper>
      <S.ImageWrapper>
        <div className="bg">
          {member.bgImage?.src && (
            <AppImage
              src={member.bgImage.src}
              width={member.bgImage.width}
              height={member.bgImage.height}
              alt={member.id}
            />
          )}
        </div>
        <div className="profile">
          {member.image?.src && (
            <AppImage
              src={member.image.src}
              width={member.image.width}
              height={member.image.height}
              alt={member.id}
            />
          )}
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

export default withTranslations(Member);
