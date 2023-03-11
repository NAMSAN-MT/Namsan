import { getWorkFields } from '@Api/work.api';
import { Container } from '@Components/common/Container/Container';
import { LE } from '@Components/common/List';
import { Category } from '@Interface/api.interface';
import { PageProps } from 'gatsby';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { RouteComponentProps } from '@reach/router';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

interface Props {
  pageData: Category[];
}

const Work = (props: RouteComponentProps) => {
  const [mainCategory, setMainCategory] = useState<Category[]>();
  useEffect(() => {
    getWorkFields().then(result => setMainCategory(result));
  }, []);
  return (
    <Container title="업무분야">
      <Grid>
        {mainCategory?.map(({ id, name, category }) => (
          <LE.MainCategory id={id} name={name} key={id}>
            {category.map(({ id: subId, name: subName }) => (
              <LE.SubCategory subId={subId} name={subName} key={subId} />
            ))}
          </LE.MainCategory>
        ))}
      </Grid>
    </Container>
  );
};

export default Work;
