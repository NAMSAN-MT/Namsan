import { injectIntl } from 'gatsby-plugin-intl';
import React, { useState } from 'react';
import { MAXIMUM_OPEN_DATA_COUNT } from '../Member/Member.const';
import { IntroduceItemProps } from './IntroduceItem.interface';
import * as S from './IntroduceItem.style';
import AddIcon from '@Components/icons/AddIcon/AddIcon';

const IntroduceItem = (props: IntroduceItemProps) => {
  const isOverflowed = props.values.length > MAXIMUM_OPEN_DATA_COUNT;
  const [isFullData, setIsFullData] = useState<boolean>(false);

  const previews = props.values.slice(0, MAXIMUM_OPEN_DATA_COUNT);
  const rest = props.values.slice(MAXIMUM_OPEN_DATA_COUNT);

  return (
    <S.IntroduceItemWrapper>
      <div className="title">
        {props.intl.formatMessage({ id: `member.${props.titleKey}` })}
      </div>
      <ul className="info">
        {previews.map(value => {
          return (
            <li>
              {value.time && <div className="time">{value.time}</div>}
              <div className="value">{value.value}</div>
            </li>
          );
        })}
        {isOverflowed && isFullData && (
          <>
            {rest.map(value => {
              return (
                <li>
                  {value.time && <div className="time">{value.time}</div>}
                  <div className="value">{value.value}</div>
                </li>
              );
            })}
          </>
        )}
        {isOverflowed && (
          <S.ShowMoreButton
            isFullData={isFullData}
            onClick={() => setIsFullData(state => !state)}
          >
            {isFullData && <AddIcon />}
            {isFullData
              ? props.intl.formatMessage({ id: 'member.less' })
              : props.intl.formatMessage({ id: 'member.more' })}
          </S.ShowMoreButton>
        )}
      </ul>
    </S.IntroduceItemWrapper>
  );
};

export default injectIntl(IntroduceItem);
