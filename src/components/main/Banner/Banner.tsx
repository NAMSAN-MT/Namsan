import React from 'react';
import * as S from './Banner.style';
import { IBannerProps } from './Banner.interface';
import BaseButton from '@Components/common/BaseButton';
import { injectIntl } from 'gatsby-plugin-intl';

const Banner = (props: IBannerProps) => {
  return (
    <S.BannerWrapper even={props.even}>
      <S.Tag>
        {props.intl.formatMessage({
          id: `main.tag5_${props.index}`,
        })}
      </S.Tag>
      <S.ContentsWrapper>
        <S.Title className="second">
          {props.intl.formatMessage({
            id: `main.title5_${props.index}`,
          })}
        </S.Title>
        {props.isMobile ? (
          <BaseButton
            className={props.index === 1 ? 'download' : 'direct'}
            onClick={props.onClick}
          >
            {props.intl.formatMessage({
              id: `main.button5_${props.index}`,
            })}
          </BaseButton>
        ) : (
          <BaseButton
            data-id={props.index === 1 ? 'download' : 'direct'}
            className="outline"
            onClick={props.onClick}
          >
            {props.intl.formatMessage({
              id: `main.button5_${props.index}`,
            })}
          </BaseButton>
        )}
      </S.ContentsWrapper>
    </S.BannerWrapper>
  );
};

export default injectIntl(Banner);
