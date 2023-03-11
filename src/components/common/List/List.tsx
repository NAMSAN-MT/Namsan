import React from 'react';
import { Wrapper, MainAnchor, HR, List, ListItem, Anchor } from './List.style';
import { MainCategoryType, SubCategoryType } from './List.type';

// TODO: 아이콘 추가 필요
export const MainCategory = ({ id, name, children }: MainCategoryType) => {
  return (
    <Wrapper>
      <MainAnchor href={id}>{name}</MainAnchor>
      <HR />
      <List>
        {children?.map(item => ({
          ...item,
          props: { ...item.props, subId: `${id}#${item.props.subId}` },
        }))}
      </List>
    </Wrapper>
  );
};

export const SubCategory = ({ name, subId }: SubCategoryType) => {
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
