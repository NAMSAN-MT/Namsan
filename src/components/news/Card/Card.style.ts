import {
  flex,
  font,
  ellipsisMulti,
  flexDirection,
  size,
  mediaQuery,
} from '@Styles/mixin.style';
import { NewsType } from '@Type/api.type';
import styled from 'styled-components';

export const CardBox = styled.div`
  margin: 0 auto;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr 1fr;

  margin-bottom: 80px;

  ${mediaQuery(
    'tablet1024',
    `
      grid-template-columns: repeat(1, 1fr);
    `,
  )};
`;

export const Card = styled.a`
  ${size('426px', '384px')}

  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.grey200};
  border-radius: 10px;

  padding: 52px 40px 40px 40px;

  :hover {
    background: #f1f7fd;
  }

  ${mediaQuery(
    'tablet1024',
    `
      ${size('300px', '100%')}
      padding: 40px 32px;
    `,
  )};

  ${mediaQuery(
    'mobile',
    `
      ${size('188px', '100%')}
      padding: 24px 20px;
    `,
  )}
`;

export const LabelBox = styled.div<{ type: NewsType }>`
  ${flex('', 'center')}
  letter-spacing: -0.2px;

  p {
    background: ${({ type }) => (type === 'recent' ? '#811B14' : '#1e59b3')};
    border-radius: 4px;
    padding: 6px 10px 4px 10px;

    ${font('body16', 'bold')}
    line-height: 26px;

    color: ${({ theme }) => theme.color.white};

    ${mediaQuery(
      'mobile',
      `
      ${font('mobile12', 'bold')}
      line-height: 20px;
      letter-spacing: -0.1px;
      padding: 2px 8px;
    `,
    )};
  }

  ${mediaQuery(
    'mobile',
    `
      height: 24px;
      display: flex;
      flex-direction: row;
    `,
  )};
`;

export const Title = styled.p`
  height: 76px;
  margin-top: 12px;
  margin-bottom: 16px;

  ${ellipsisMulti(2)}

  ${font('title24', 'regular')}
  line-height: 38px;
  letter-spacing: -0.4px;

  color: ${({ theme }) => theme.color.black};

  ${mediaQuery(
    'tablet1024',
    `
      height: 38px;
      margin: 12px 0px;
      max-width: 880px;
      ${ellipsisMulti(1)}
    `,
  )};

  ${mediaQuery(
    'mobile',
    `
      height: 26px;
      margin: 8px 0px 2px 0px;
      max-width: 880px;

      ${ellipsisMulti(1)}
      ${font('mobile16', 'bold')}
      line-height: 26px;
    `,
  )};
`;

export const Content = styled.p`
  height: 88px;

  ${ellipsisMulti(3)}

  ${font('title18_2', 'regular')}
  line-height: 28px;
  letter-spacing: -0.2px;

  color: rgba(6, 11, 17, 0.56);

  ${mediaQuery(
    'tablet1024',
    `
      height: 56px;
      max-width: 880px;
      ${ellipsisMulti(2)}
    `,
  )};

  ${mediaQuery(
    'mobile',
    `
      height: 44px;
      max-width: 287px;
      
      line-height: 22px;
      ${ellipsisMulti(2)}
      ${font('mobile14', 'regular')}
    `,
  )};
`;

export const Date = styled.div`
  ${flexDirection('row')}
  gap: 20px;
  margin: 88px 0px 44px 0px;

  p {
    ${font('title18_2', 'regular')}
    line-height: 28px;

    ${flex('')}
    letter-spacing: -0.2px;

    color: rgba(6, 11, 17, 0.3);

    ${mediaQuery('tablet1024', ``)};

    ${mediaQuery(
      'mobile',
      `
      ${font('mobile12', 'demilight')}
        font-weight: 350;
        line-height: 20px;
    `,
    )};
  }

  .divider {
    ${size('1px', '221px')}
    background: ${({ theme }) => theme.color.grey200};

    ${mediaQuery(
      'tablet1024',
      `
      ${size('1px', '100%')}
    `,
    )};

    ${mediaQuery(
      'mobile',
      `
      ${size('0.5px', '100%')}
    `,
    )};
  }

  ${mediaQuery(
    'tablet1024',
    `
      ${size('28px', '100%')}
      margin: 40px 0px;
    `,
  )};

  ${mediaQuery(
    'mobile',
    `
    ${size('20px', '100%')}
      margin: 16px 0px 24px 0px;
    `,
  )};
`;
