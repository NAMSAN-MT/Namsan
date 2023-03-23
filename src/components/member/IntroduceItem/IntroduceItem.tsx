import { injectIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { IntroduceItemProps } from './IntroduceItem.interface';
import * as S from './IntroduceItem.style';

const IntroduceItem = (props: IntroduceItemProps) => {
  return (
    <S.IntroduceItemWrapper>
      <div className="title">
        {props.intl.formatMessage({ id: `member.${props.titleKey}` })}
      </div>
      <ul className="info">
        {props.values.map(value => {
          return (
            <li>
              {value.time && <div className="time">{value.time}</div>}
              <div className="value">{value.value}</div>
            </li>
          );
        })}
      </ul>
    </S.IntroduceItemWrapper>
  );
};

export default injectIntl(IntroduceItem);
