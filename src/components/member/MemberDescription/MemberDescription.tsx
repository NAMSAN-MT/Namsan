import { injectIntl } from 'gatsby-plugin-intl';
import { IMemberDescriptionProps } from './MemberDescription.interface';
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import * as S from './MemberDescription.style';

const MemberDescription = ({ member, intl }: IMemberDescriptionProps) => {
  const [hasDescriptionPreview, setDescriptionPreview] = useState<boolean>(
    !isEmpty(member.descriptionPreview),
  );
  const [isPreviewOpen, setPreviewOpen] = useState<boolean>(false);

  if (!member.description) {
    return <></>;
  }

  const handleClickShowMoreButton = () => {
    setPreviewOpen(isOpen => !isOpen);
  };

  if (!hasDescriptionPreview) {
    return <>{member.description.replaceAll(`\\n`, `\n`)}</>;
  }

  return (
    <>
      {isPreviewOpen
        ? member.description.replaceAll(`\\n`, `\n`)
        : member.descriptionPreview!.replaceAll(`\\n`, `\n`)}
      <S.ShowMoreButton
        isFullData={isPreviewOpen}
        onClick={handleClickShowMoreButton}
      >
        {isPreviewOpen
          ? intl.formatMessage({ id: 'member.less' })
          : intl.formatMessage({ id: 'member.more' })}
      </S.ShowMoreButton>
    </>
  );
};

export default injectIntl(MemberDescription);
