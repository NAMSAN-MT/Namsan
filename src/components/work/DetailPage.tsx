import { getWorkField } from '@Api/work.api';
import LineArrowIcon from '@Components/icons/LineArrowIcon/LineArrowIcon';
import { RouteComponentProps } from '@reach/router';
import React, { MouseEvent, useEffect, useState } from 'react';
import { CategoryDescription } from './work.interface';
import { Box, Contents, Head, Layout, SubTitle, Title } from './work.styled';

export interface Props extends RouteComponentProps {
  id?: string;
}

const DetailPage = (props: Props) => {
  const [category, setCategory] = useState<
    (CategoryDescription & { isOpen?: boolean })[]
  >([]);
  useEffect(() => {
    getWorkField(props.id!).then(([{ categoryInfo, description }]) => {
      setCategory(() => {
        return [
          {
            categoryId: categoryInfo.categoryId,
            name: categoryInfo.name,
            description: description[categoryInfo.categoryId],
          },
          ...categoryInfo.subCategory.map(category => ({
            ...category,
            description: description[category.categoryId],
          })),
        ];
      });
    });
  }, []);

  const isMainCategory = ({ categoryId }: CategoryDescription) =>
    categoryId.startsWith('C');

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { index } = e.currentTarget.dataset;

    setCategory(curr => {
      return curr.map((c, i) => {
        if (i === Number(index)) {
          return { ...c, isOpen: !c.isOpen ?? true };
        }
        return c;
      });
    });
  };

  return (
    <Layout>
      {category.map((item, index) => (
        <div key={index}>
          {isMainCategory(item) ? (
            <>
              <Title id={item.categoryId}>{item.name}</Title>
              <Contents>{item.description}</Contents>
            </>
          ) : (
            <Box>
              <Head onClick={handleClick} data-index={index}>
                <SubTitle id={item.categoryId}>{item.name}</SubTitle>
                {/* TODO: SVG color 적용 */}
                <LineArrowIcon
                  direction={item.isOpen ? 'UP' : 'DOWN'}
                  weight="BOLD"
                  width="21px"
                ></LineArrowIcon>
              </Head>

              {item.isOpen && <Contents>{item.description}</Contents>}
            </Box>
          )}
        </div>
      ))}
    </Layout>
  );
};

export default DetailPage;
