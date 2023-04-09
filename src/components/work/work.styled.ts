import { font } from '@Styles/mixin.style';
import styled from 'styled-components';

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const Title = styled.h1`
  color: ${theme => theme.theme.color.textBlackHigh};
  ${font('title32', 'bold')};
  &:hover {
    color: ${theme => theme.theme.color.textBlue};
  }
`;

export const SubTitle = styled.h2`
  ${font('title26', 'bold')}
`;

export const Contents = styled.p`
  color: ${theme => theme.theme.color.textBlackMedium};
  ${font('title20', 'regular')};
  margin-bottom: 32px;
`;

export const Box = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.dividerGrey200};
  border-bottom: 1px solid ${({ theme }) => theme.color.dividerGrey200};
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  color: ${theme => theme.theme.color.textBlackHigh};
  cursor: pointer;
  height: 104px;

  &:hover {
    color: ${theme => theme.theme.color.textBlue};
  }
`;

export const Layout = styled.div`
  padding: 0px 90px;
  margin: 100px auto;
  max-width: 966px;
  margin-bottom: 160px;
`;

export const MemberBox = styled.div`
  margin-top: 80px;
`;

export const MemberList = styled.div`
  display: inline-flex;
  align-content: stretch;
  flex-flow: row wrap;
  margin-top: 32px;
  justify-content: space-between;

  & > li {
    width: 230px;
    img {
      width: inherit;
      object-fit: scale-down;
      object-position: bottom;
    }
  }
`;
