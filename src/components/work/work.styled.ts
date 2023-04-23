import { font, mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 52px;
`;

export const Title = styled.h1`
  color: ${theme => theme.theme.color.textBlackHigh};
  ${font('title32', 'bold')};
  &:hover {
    color: ${theme => theme.theme.color.textBlue};
  }
  margin-bottom: 24px;
`;

export const SubTitle = styled.h2`
  ${font('title26', 'bold')}

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

  ${mediaQuery(
    'mobile',
    `
      padding: 0px 24px;
      margin-bottom: 100px;
  `,
  )}
`;

export const MemberBox = styled.div`
  margin-top: 60px;

  ${mediaQuery(
    'mobile',
    `margin-top:32px;
      `,
  )}
`;

export const CategoryBox = styled.div`
  margin-bottom: 20px;
`;

export const MemberList = styled.div`
  grid-template-columns: repeat(4, 1fr);
  display: grid;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 32px;
  grid-column-gap: 24px;

  ${mediaQuery(
    'mobile',
    `grid-template-columns: repeat(2, 1fr);
      `,
  )}

  & > li {
    max-width: 282px;
    width: auto;
    height: auto;
    margin-bottom: 0px;

    ${mediaQuery(
      'mobile',
      `
      width: auto; 
      min-width: 154px;`,
    )}
    img {
      width: inherit;
      object-fit: scale-down;
      object-position: bottom;
    }
  }
`;

export const Image = styled.img`
  ${size('auto', '100%')}
  margin-top: 8px;
  margin-bottom: 80px;

  ${mediaQuery(
    'mobile',
    `
    ${size('160px', '100%')}
    overflow:hidden;
    margin-top: 0px;
    margin-bottom: 32px;`,
  )}
`;

export const ButtonWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: space-around;

  ${mediaQuery(
    'mobile',
    `
  margin-top: 24px;`,
  )}
`;
