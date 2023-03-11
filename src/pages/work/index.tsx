import { getWorkFields } from '@Api/work.api';
import { Category } from '@Interface/api.interface';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../components/common/Container/Container';
import { LE } from '../../components/common/List';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Work = () => {
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
