import { getWorkFields } from '@Api/work.api';
import Layout from '@Components/common/Layout';
import Work from '@Components/work';
import { Category } from '@Components/work/work.interface';
import { GetServerDataProps, PageProps } from 'gatsby';
import React from 'react';

export interface ServerProps {
  data: Category[];
}

interface Props {
  serverData: ServerProps;
}

const Index = ({ serverData }: PageProps & Props) => {
  return (
    <Layout>
      <Work {...serverData} />
    </Layout>
  );
};

export default Index;

export const getServerData = async (props: GetServerDataProps) => {
  try {
    const data = await getWorkFields(['categoryInfo']);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      headers: {
        status: 500,
      },
      props: {},
    };
  }
};
