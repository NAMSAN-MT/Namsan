import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import AnimationImage from '../AnimationImage';
import { IntroduceWrapperProps } from './IntroduceWrapper.interface';
import * as S from './IntroduceWrapper.style';
import image1 from '@Images/introduce_bg1.png';
import image2 from '@Images/introduce_bg2.png';

const IntroduceWrapper = (props: IntroduceWrapperProps) => {
  const t = useTranslations();
  const [suffix, setSuffix] = useState<string>('');

  const _setSize = () => {
    const isMobile = window.innerWidth <= 768;
    setSuffix(isMobile ? '_mobile' : '');
  };

  useEffect(() => {
    window.addEventListener('resize', _setSize);
    _setSize();
    return () => window.removeEventListener('resize', _setSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.IntroduceWrapper>
      <S.TextWrapper
        dangerouslySetInnerHTML={{
          __html: t.raw(`introduce.phrase1${suffix}`),
        }}
      ></S.TextWrapper>
      <AnimationImage
        mainText={t(`introduce.phrase2_main${suffix}`)}
        subText={t(`introduce.phrase2_sub${suffix}`)}
        imageSrc={image1.src}
      />
      <S.TextWrapper
        dangerouslySetInnerHTML={{
          __html: t.raw(`introduce.phrase3_main${suffix}`),
        }}
      ></S.TextWrapper>
      <AnimationImage
        mainText={t(`introduce.phrase4_main${suffix}`)}
        subText={t(`introduce.phrase4_sub${suffix}`)}
        imageSrc={image2.src}
      />
      <S.PressWrapper>
        <div className="title">{t('introduce.media_title')}</div>
        <S.PressContentList>
          <S.PressContent>
            <S.PressContentTitle>
              {t(`introduce.media_content1_title${suffix}`)}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {t('introduce.media_content1_press')}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {t(`introduce.media_content2_title${suffix}`)}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {t('introduce.media_content2_press')}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {t(`introduce.media_content3_title${suffix}`)}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {t('introduce.media_content3_press')}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {t(`introduce.media_content4_title${suffix}`)}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {t('introduce.media_content4_press')}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {t(`introduce.media_content5_title${suffix}`)}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {t('introduce.media_content5_press')}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {t(`introduce.media_content6_title${suffix}`)}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {t('introduce.media_content6_press')}
            </S.PressContentPressName>
          </S.PressContent>
        </S.PressContentList>
      </S.PressWrapper>
    </S.IntroduceWrapper>
  );
};

export default IntroduceWrapper;
