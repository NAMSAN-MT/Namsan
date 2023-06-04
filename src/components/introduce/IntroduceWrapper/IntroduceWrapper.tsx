import { injectIntl } from 'gatsby-plugin-intl';
import React, { useEffect, useState } from 'react';
import AnimationImage from '../AnimationImage';
import { IntroduceWrapperProps } from './IntroduceWrapper.interface';
import * as S from './IntroduceWrapper.style';
import image1 from '@Images/introduce_bg1.png';
import image2 from '@Images/introduce_bg2.png';

const IntroduceWrapper = (props: IntroduceWrapperProps) => {
  const [suffix, setSuffix] = useState<string>('');

  const _setSize = () => {
    const isMobile = window.innerWidth <= 768;
    setSuffix(isMobile ? '_mobile' : '');
  };

  useEffect(() => {
    window.addEventListener('resize', _setSize);
    _setSize();
  });

  return (
    <S.IntroduceWrapper>
      <S.TextWrapper
        dangerouslySetInnerHTML={{
          __html: props.intl.formatMessage({
            id: `introduce.phrase1${suffix}`,
          }),
        }}
      ></S.TextWrapper>
      <AnimationImage
        mainText={props.intl.formatMessage({
          id: `introduce.phrase2_main${suffix}`,
        })}
        subText={props.intl.formatMessage({
          id: `introduce.phrase2_sub${suffix}`,
        })}
        imageSrc={image1}
      />
      <S.TextWrapper
        dangerouslySetInnerHTML={{
          __html: props.intl.formatMessage({
            id: `introduce.phrase3_main${suffix}`,
          }),
        }}
      ></S.TextWrapper>
      <AnimationImage
        mainText={props.intl.formatMessage({
          id: `introduce.phrase4_main${suffix}`,
        })}
        subText={props.intl.formatMessage({
          id: `introduce.phrase4_sub${suffix}`,
        })}
        imageSrc={image2}
      />
      <S.PressWrapper>
        <div className="title">
          {props.intl.formatMessage({ id: 'introduce.media_title' })}
        </div>
        <S.PressContentList>
          <S.PressContent>
            <S.PressContentTitle>
              {props.intl.formatMessage({
                id: 'introduce.media_content1_title',
              })}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {props.intl.formatMessage({
                id: 'introduce.media_content1_press',
              })}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {props.intl.formatMessage({
                id: 'introduce.media_content2_title',
              })}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {props.intl.formatMessage({
                id: 'introduce.media_content2_press',
              })}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {props.intl.formatMessage({
                id: 'introduce.media_content3_title',
              })}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {props.intl.formatMessage({
                id: 'introduce.media_content3_press',
              })}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {props.intl.formatMessage({
                id: 'introduce.media_content4_title',
              })}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {props.intl.formatMessage({
                id: 'introduce.media_content4_press',
              })}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {props.intl.formatMessage({
                id: 'introduce.media_content5_title',
              })}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {props.intl.formatMessage({
                id: 'introduce.media_content5_press',
              })}
            </S.PressContentPressName>
          </S.PressContent>
          <S.PressContent>
            <S.PressContentTitle>
              {props.intl.formatMessage({
                id: 'introduce.media_content6_title',
              })}
            </S.PressContentTitle>
            <S.PressContentPressName>
              {props.intl.formatMessage({
                id: 'introduce.media_content6_press',
              })}
            </S.PressContentPressName>
          </S.PressContent>
        </S.PressContentList>
      </S.PressWrapper>
    </S.IntroduceWrapper>
  );
};

export default injectIntl(IntroduceWrapper);
