import { flex, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';
import ArrowRightIcon from '@Images/ic_arrow_right_th20.svg';

const SummaryNewsWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const InnerWrapper = styled.div`
  width: 100%;
  ${flex('space-between', 'center')};
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.color.grey100};
  margin: 31px 0;
`;

const Tag = styled.span`
  color: ${({ theme }) => theme.color.blue200};

  // FIXME: mixin으로 변경
  font-size: 20px;
  font-weight: 700;
  ${lineHeight(20, 34)};
`;

const Date = styled.span`
  color: ${({ theme }) => theme.color.textBlackMedium};
  margin-left: 10px;

  // FIXME: mixin으로 변경
  font-size: 20px;
  font-weight: 400;
  ${lineHeight(20, 34)};
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.textBlackHigh};
  letter-spacing: -0.4px;

  // FIXME: mixin으로 변경
  font-size: 26px;
  font-weight: 500;
  ${lineHeight(26, 40)};
`;

const IconWrapper = styled.div`
  width: 19px;
  height: 11px;
  background: ${`url(${ArrowRightIcon}) no-repeat center center`};
`;

export {
  SummaryNewsWrapper,
  InnerWrapper,
  Divider,
  Tag,
  Date,
  Title,
  IconWrapper,
};
