import { LE } from '@Components/common/List';
import React, { useState } from 'react';
import { Grid } from './work.styled';

export interface Props {
  categoryInfos: string[][];
  language: string;
}

const Work = ({ categoryInfos, language }: Props) => {
  const [mainCategory] = useState<string[][]>(categoryInfos);

  return (
    <Grid>
      {mainCategory?.map((category, index) => {
        const id = String(index + 1).padStart(2, '0');
        return (
          <LE.MainCategory
            key={`C${id}`}
            id={`C${id}`}
            name={category[0]}
            language={language}
          >
            {category?.map((subName, subIndex) => {
              const subid = String(subIndex).padStart(2, '0');
              if (subIndex === 0) return <span key={`S${id}${subid}`}></span>;
              return (
                <LE.SubCategory
                  key={`S${id}${subid}`}
                  sub_id={`S${id}${subid}`}
                  name={subName}
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
