import AppImage from '@Components/common/AppImage';
import { withTranslations } from '@Hocs/withTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { IMemberItemProps } from './MemberItem.interface';
import * as S from './MemberItem.style';

const MemberItem = ({
  name,
  position,
  businessFields,
  image,
  id,
  order,
  intl,
}: IMemberItemProps) => {
  const router = useRouter();

  const _handleClick = async () => {
    router.push(`/${intl.locale}/member/${order}`);
  };

  return (
    <S.MemberItemWrapper onClick={_handleClick}>
      <S.ImageSection>
        <S.ImageWrapper>
          <div className="dim"></div>
          {image?.src && (
            <AppImage
              src={image.src}
              width={image.width}
              height={image.height}
              alt={order ?? ''}
            />
          )}
        </S.ImageWrapper>
        <S.TagsWrapper isScrollable={intl.locale !== 'ko'}>
          {businessFields!.map(businessField => (
            <S.Tag key={businessField}>{businessField}</S.Tag>
          ))}
        </S.TagsWrapper>
      </S.ImageSection>
      <S.TextSection>
        <S.Name>{name}</S.Name>
        <S.Position>{position}</S.Position>
      </S.TextSection>
    </S.MemberItemWrapper>
  );
};

export default withTranslations(MemberItem);
