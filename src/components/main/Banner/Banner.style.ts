import { flex, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';

const BannerWrapper = styled.div<{ even: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.grey50};
  border-radius: 20px;
  padding: 26px 36px;
  margin-right: ${({ even }) => (even ? '24px' : '0')};
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${flex('space-between', 'center')};
`;

const Tag = styled.span`
  color: ${({ theme }) => theme.color.textBlackMedium};
  letter-spacing: -0.2px;

  // FIXME: mixin으로 변경
  font-size: 16px;
  font-weight: 500;
  ${lineHeight(16, 26)}};
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.textBlackHigh};
  letter-spacing: -0.4px;
  width: 240px;
  margin-top: 8px;

  // FIXME: mixin으로 변경
  font-size: 22px;
  font-weight: 700;
  ${lineHeight(22, 36)}};
`;

export { BannerWrapper, ContentsWrapper, Tag, Title };
