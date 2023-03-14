import { injectIntl } from 'gatsby-plugin-intl';
import React, { useState } from 'react';
import { IMemberItemProps } from './MemberItem.interface';
import * as S from './MemberItem.style';

const MemberItem = ({
  name,
  position,
  businessFields,
  imagePath,
}: IMemberItemProps) => {
  const [isHover, setHover] = useState<boolean>(false);

  const _handleMouseOver = () => setHover(true);
  const _handleMouseOut = () => setHover(false);

  return (
    <S.MemberItemWrapper
      onMouseOver={_handleMouseOver}
      onMouseOut={_handleMouseOut}
    >
      <S.ImageSection>
        <S.ImageWrapper>
          <S.Image src={imagePath} />
        </S.ImageWrapper>
        {isHover && (
          <S.TagsWrapper>
            {businessFields.map(businessField => (
              <S.Tag>{businessField}</S.Tag>
            ))}
          </S.TagsWrapper>
        )}
      </S.ImageSection>
      <S.TextSection>
        <S.Name>{name}</S.Name>
        <S.Position>{position}</S.Position>
      </S.TextSection>
    </S.MemberItemWrapper>
  );
};

export default injectIntl(MemberItem);
