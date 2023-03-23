import Work from '@Components/work';
import DetailPage from '@Components/work/DetailPage';
import { Router } from '@reach/router';
import React from 'react';

const WorkIndex = () => {
  return (
    <div>
      <Router basepath="/work">
        <Work path="/" />
        <DetailPage path="/:id" />
      </Router>
    </div>
  );
};

export default WorkIndex;
