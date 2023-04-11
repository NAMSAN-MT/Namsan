import { getWorkField } from '@Api/work.api';
import Layout from '@Components/common/Layout';
import DetailPage from '@Components/work/DetailPage';
import { CategoryPageProps } from '@Components/work/work.interface';
import { GetServerDataProps, PageProps } from 'gatsby';
import React from 'react';

export interface ServerProps {
  data: CategoryPageProps;
}

interface Props {
  serverData: ServerProps;
}

const WorkDetail = ({ serverData }: PageProps & Props) => {
  return (
    <Layout>
      <DetailPage {...serverData.data} />
    </Layout>
  );
};

export const getServerData = async (props: GetServerDataProps) => {
  const id = props.params?.id as string;
  const data = await getWorkField(id);

  return data
    ? {
        props: {
          data,
        },
      }
    : {
        headers: {
          status: 500,
        },
        props: {},
      };
};

export default WorkDetail;