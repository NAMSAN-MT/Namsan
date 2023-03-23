import styled from 'styled-components';

export const List = styled.ul`
  margin: 0px;
  padding: 0px;
`;

export const ListItem = styled.li`
  list-style-type: none;
`;

export const HR = styled.hr`
  border: 0;
  height: 2px;
  background: ${({ theme }) => theme.color.dividerBlack};
`;

export const Anchor = styled.a`
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

export const MainAnchor = styled(Anchor)`
  font-weight: 700;
  font-size: 24px;
  line-height: 38px;
  &:hover {
    color: ${({ theme }) => theme.color.blue100};
    background-color: transparent;
  }
`;

export const Wrapper = styled.div`
  margin: 12px;
`;
