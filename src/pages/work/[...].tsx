import { PageProps, graphql } from 'gatsby';
import React from 'react';
import { Router } from '@reach/router';
import Work from '@Components/work';
import MainCategoryPage from '@Components/work/mainCategoryPage';
import SubCategoryPage from '@Components/work/subCategoryPage';

const WorkIndex = ({ data }: PageProps) => {
  console.log(data);
  return (
    <div>
      <Router basepath="/work">
        <Work path="/" />
        <MainCategoryPage path="/:id" />
        <SubCategoryPage path="/:id/:subId" />
      </Router>
    </div>
  );
};

export default WorkIndex;
