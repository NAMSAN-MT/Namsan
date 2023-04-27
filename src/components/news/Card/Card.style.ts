import {
  flex,
  font,
  ellipsisMulti,
  flexDirection,
  size,
} from '@Styles/mixin.style';
import { NewsType } from '@Type/api.type';
import styled from 'styled-components';

export const CardBox = styled.div`
  margin: 0 auto;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr 1fr;

  margin-bottom: 80px;
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
`;

export const LabelBox = styled.div<{ type: NewsType }>`
  ${flex('', 'center')}
  letter-spacing: -0.2px;
  margin-bottom: 16px;

  p {
    background: ${({ type }) => (type === 'recent' ? '#811B14' : '#1e59b3')};
    border-radius: 4px;
    padding: 6px 10px 4px 10px;

    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    ${font('body16', 'bold')}
    line-height: 26px;

    color: ${({ theme }) => theme.color.white};
  }
`;

export const Title = styled.p`
  height: 76px;
  margin-bottom: 24px;

  ${ellipsisMulti(2)}

  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  ${font('title24', 'regular')}
  line-height: 38px;
  letter-spacing: -0.4px;

  color: ${({ theme }) => theme.color.black};
`;

export const Content = styled.p`
  height: 84px;
  margin-bottom: 110px;

  ${ellipsisMulti(3)}

  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  ${font('title18_2', 'regular')}
  line-height: 28px;
  letter-spacing: -0.2px;

  color: rgba(6, 11, 17, 0.56);
`;

export const Date = styled.div`
  ${flexDirection('row')}
  gap: 20px;

  p {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    ${font('title18_2', 'regular')}
    line-height: 28px;

    ${flex('')}
    letter-spacing: -0.2px;

    color: rgba(6, 11, 17, 0.3);
  }

  .divider {
    ${size('1px', '221px')}
    background: ${({ theme }) => theme.color.grey200};
  }
`;
