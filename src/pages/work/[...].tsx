import Layout from '@Components/common/Layout';
import Work from '@Components/work';
import DetailPage from '@Components/work/DetailPage';
import { Router } from '@reach/router';
import React from 'react';

const WorkIndex = () => {
  return (
    <Layout>
      <Router basepath="/work">
        <Work path="/" />
        <DetailPage path="/:id" />
      </Router>
    </Layout>
  );
};

export default WorkIndex;
