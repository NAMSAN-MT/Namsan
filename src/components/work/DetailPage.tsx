import React from 'react';
import { RouteComponentProps } from '@reach/router';

export interface Props extends RouteComponentProps {
  id?: string;
}
const DetailPage = (props: Props) => {
  console.log(props);

  return <>main</>;
};

export default DetailPage;
