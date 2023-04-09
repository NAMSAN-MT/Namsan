import { getContainMember } from '@Api/work.api';
import LineArrowIcon from '@Components/icons/LineArrowIcon/LineArrowIcon';
import { IMember } from '@Interface/api.interface';
import React, { MouseEvent, useState, useEffect } from 'react';
import { CategoryDescription, CategoryPageProps } from './work.interface';
import {
  Box,
  Contents,
  Head,
  Layout,
  MemberBox,
  MemberList,
  SubTitle,
  Title,
} from './work.styled';
import MemberItem from '@Components/members/MemberItem';

export interface Props extends CategoryPageProps {}

const DetailPage = ({ categoryInfo, description }: Props) => {
  const [category, setCategory] = useState<
    (CategoryDescription & { isOpen?: boolean })[]
  >([
    {
      categoryId: categoryInfo.categoryId,
      name: categoryInfo.name,
      description: description[categoryInfo.categoryId],
    },
    ...categoryInfo.subCategory.map(category => ({
      ...category,
      description: description[category.categoryId],
    })),
  ]);

  const [memberList, setMemberList] = useState<IMember[]>([]);

  useEffect(() => {
    getContainMember(categoryInfo.name).then(memberList => {
      setMemberList(memberList);
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
      <MemberBox>
        <SubTitle>주요 구성원</SubTitle>
        <MemberList>
          {memberList.map(member => (
            <MemberItem
              key={member.id}
              name={member.name}
              position={member.position}
              businessFields={member.businessFields}
              imagePath={member.imagePath}
              id={member.id}
            />
          ))}
        </MemberList>
      </MemberBox>
    </Layout>
  );
};

export default DetailPage;
