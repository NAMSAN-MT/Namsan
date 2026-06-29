import AnimationWrapper from '@Components/common/AnimationWrapper';
import BaseButton from '@Components/common/BaseButton';
import React from 'react';
import useSecondSection from './SecondSection.hook';
import * as S from './SecondSection.style';
import { ISecondSectionProps } from './SecondSection.interface';
import { useTranslations } from 'next-intl';

const SecondSection = (props: ISecondSectionProps) => {
  const { handleNavigateTo } = useSecondSection();
  const t = useTranslations();
  const suffix = props.isMobile ? '_mobile' : '';

  return (
    <AnimationWrapper variantName="transition" initial="hidden" threshold={0.4}>
      <S.SecondWrapper>
        <S.Title>{t('main.title2')}</S.Title>
        <S.Description
          dangerouslySetInnerHTML={{
            __html: t.raw(`main.description2${suffix}`),
          }}
        />
        <BaseButton className="primary" onClick={handleNavigateTo}>
          {t('main.button2_name')}
        </BaseButton>
      </S.SecondWrapper>
    </AnimationWrapper>
  );
};

export default SecondSection;
