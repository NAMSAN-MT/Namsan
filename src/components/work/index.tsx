import { LE } from '@Components/common/List';
import React, { useState } from 'react';
import { Grid } from './work.styled';

export interface Props {
  categoryInfos: string[][];
}

const Work = ({ categoryInfos }: Props) => {
  const [mainCategory] = useState<string[][]>(categoryInfos);

  return (
    <Grid>
      {mainCategory?.map((category, index) => {
        const id = String(index + 1).padStart(2, '0');
        return (
          <LE.MainCategory id={`C${id}`} name={category[0]} key={`C${id}`}>
            {category?.map((subName, subIndex) => {
              const subid = String(subIndex).padStart(2, '0');
              if (subIndex === 0) return <span key={`S${id}${subid}`}></span>;
              return (
                <LE.SubCategory
                  sub_id={`S${id}${subid}`}
                  name={subName}
                  key={`S${id}${subid}`}
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
