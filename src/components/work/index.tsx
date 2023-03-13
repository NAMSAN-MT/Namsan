import { getWorkFields } from '@Api/work.api';
import { Container } from '@Components/common/Container/Container';
import { LE } from '@Components/common/List';
import React, { useEffect, useState } from 'react';
import { Category } from './work.interface';
import { Grid } from './work.styled';

const Work = () => {
  const [mainCategory, setMainCategory] = useState<Category[]>();
  useEffect(() => {
    getWorkFields().then(result => setMainCategory(result));
  }, []);
  return (
    <Container title="업무분야">
      <Grid>
        {mainCategory?.map(({ categoryId: id, name, category }) => (
          <LE.MainCategory id={id} name={name} key={id}>
            {category.map(({ categoryId: subId, name: subName }) => (
              <LE.SubCategory subId={subId} name={subName} key={subId} />
            ))}
          </LE.MainCategory>
        ))}
      </Grid>
    </Container>
  );
};

export default Work;
