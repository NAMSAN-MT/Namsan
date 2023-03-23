import { getWorkFields } from '@Api/work.api';
import { Container } from '@Components/common/Container/Container';
import { LE } from '@Components/common/List';
import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { Category } from './work.interface';
import { Grid } from './work.styled';

export interface Props extends RouteComponentProps {}

const Work = (props: Props) => {
  const [mainCategory, setMainCategory] = useState<Category[]>();
  useEffect(() => {
    getWorkFields(['categoryInfo']).then(result => {
      setMainCategory(result);
    });
  }, []);
  return (
    <Container title="업무분야">
      <Grid>
        {mainCategory?.map(({ categoryId: id, name, subCategory }) => (
          <LE.MainCategory id={id} name={name} key={id}>
            {subCategory?.map(({ categoryId: subId, name: subName }) => (
              <LE.SubCategory subId={subId} name={subName} key={subId} />
            ))}
          </LE.MainCategory>
        ))}
      </Grid>
    </Container>
  );
};

export default Work;
