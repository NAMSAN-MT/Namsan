import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from "gatsby-plugin-intl";
import React from "react";
import HomeIcon from "../components/icons/HomeIcon";

// TODO: WrappedComponentProps를 프롭스에 implement해서 사용하기 (hoc에서 intl속성을 내려줌.)
const TestPage = ({ intl }: WrappedComponentProps) => {
  return (
    <main>
      <HomeIcon />
      <h1>✅ Intl 적용 방법1</h1>
      <div>{intl.formatMessage({ id: "index.test" })}</div>
      <h1>✅ Intl 적용 방법2</h1>
      <div>
        <FormattedMessage id="index.test" />
      </div>
    </main>
  );
};

// TODO: injectIntl로 랩핑!
export default injectIntl(TestPage);
