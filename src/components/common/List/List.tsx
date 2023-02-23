import React from "react";
import styled from "styled-components";

type MainCategory = {
  id: string;
  name: string;
  children?: ReturnType<typeof SubCategory>[];
};

type SubCategory = {
  subId: string;
  name: string;
};

const List = styled.ul`
  margin: 0px;
  padding: 0px;
`;

const ListItem = styled.li`
  list-style-type: none;
`;

const HR = styled.hr`
  border: 0;
  height: 2px;
  background: ${({ theme }) => theme.color.dividerBlack};
`;

const Anchor = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.color.textBlackHigh};
  height: auto;
  padding: 13px 12px;

  font-size: 20px;

  display: block;
  &:hover {
    background-color: ${({ theme }) => theme.color.grey100};
  }
`;

const MainAnchor = styled(Anchor)`
  font-weight: 700;
  font-size: 24px;
  line-height: 38px;
  &:hover {
    color: ${({ theme }) => theme.color.blue100};
    background-color: transparent;
  }
`;

const Wrapper = styled.div`
  margin: 12px;
`;

// TODO: 아이콘 추가 필요
const MainCategory = ({ id, name, children }: MainCategory) => {
  return (
    <Wrapper>
      <MainAnchor href={id}>{name}</MainAnchor>
      <HR />
      <List>
        {children?.map((item) => ({
          ...item,
          props: { ...item.props, subId: `${id}/${item.props.subId}` },
        }))}
      </List>
    </Wrapper>
  );
};

const SubCategory = ({ name, subId }: SubCategory) => {
  return (
    <ListItem>
      <Anchor href={subId}>{name}</Anchor>
    </ListItem>
  );
};

export const LE = {
  MainCategory,
  SubCategory,
};
