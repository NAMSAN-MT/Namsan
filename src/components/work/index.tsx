import { LE } from '@Components/common/List';
import React, { useState } from 'react';
import { Grid } from './work.styled';

export interface Props {
  data: string[][];
}

const Work = ({ data }: Props) => {
  const [mainCategory] = useState<string[][]>(data);
  return (
    <Grid>
      {mainCategory?.map((category, index) => {
        const id = String(index + 1).padStart(2, '0');
        return (
          <LE.MainCategory id={`C${id}`} name={category[0]} key={`C${id}`}>
            {category?.map((subName, subIndex) => {
              if (subIndex === 0) return <></>;
              const subId = String(subIndex).padStart(2, '0');
              return (
                <LE.SubCategory
                  subId={`S${id}${subId}`}
                  name={subName}
                  key={`S${id}${subId}`}
                />
              );
            })}
          </LE.MainCategory>
        );
      })}
    </Grid>
  );
};

export default Work;
