import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'gatsby-plugin-intl';
import React from 'react';
import HomeIcon from '../components/icons/HomeIcon';

// TODO: WrappedComponentProps를 프롭스에 implement해서 사용하기 (hoc에서 intl속성을 내려줌.)
const TestPage = ({ intl }: WrappedComponentProps) => {
  return (
    <main>
      <HomeIcon />
      <h1>✅ Intl 적용 방법1</h1>
      <div>
        {intl.formatMessage(
          { id: 'index.test' },
          { myValue: '여기에 변수를 추가할수도 있습니다!' },
        )}
      </div>
      <h1>✅ Intl 적용 방법2</h1>
      <div>
        <FormattedMessage
          id="index.test"
          values={{ myValue: '여기는 또 다른 변수를 추가할 수도 있습니당' }}
        />
      </div>
    </main>
  );
};

// TODO: injectIntl로 랩핑!
export default injectIntl(TestPage);
