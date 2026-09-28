import { LE } from '@Components/common/List';
import React from 'react';
import { Grid } from './work.styled';

export interface Props {
  categoryInfos: string[][];
  language: string;
}

// NOTE: categoryInfos/language는 getStaticProps가 내려주는 locale별 데이터다.
// 정적 export의 클라이언트 라우팅은 /ko/work → /en/work 이동 시 같은 route
// (/[locale]/work)이라 이 컴포넌트를 언마운트하지 않는다. 예전처럼 useState
// 초기값으로 받아두면 초기값이 재평가되지 않아 언어를 바꿔도 이전 언어의
// 업무분야 목록이 그대로 남는다 → props를 그대로 렌더한다.
const Work = ({ categoryInfos, language }: Props) => {
  return (
    <Grid>
      {categoryInfos?.map((category, index) => {
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
