import { flex, font, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';

const IntroduceWrapper = styled.div`
  min-width: 1380px;

  .title {
    ${font('display42', 'bold')};
    ${lineHeight(42, 60)};
    letter-spacing: -0.6px;
    margin-bottom: 60px;
  }
`;

const TextWrapper = styled.div`
  white-space: pre-wrap;
  ${font('display42', 'bold')};
  ${lineHeight(42, 60)};
  letter-spacing: -0.6px;
  margin: 120px 0 155px 368px;

  .highlight {
    color: ${({ theme }) => theme.color.blue100};
  }
`;

const PressWrapper = styled.div`
  margin: 120px 0 200px 368px;
`;

const PressContentList = styled.ul`
  ${flex('flex-start')};
  flex-wrap: wrap;
  gap: 128px;
  white-space: pre-wrap;
`;

const PressContent = styled.li`
  width: 384px;
`;

const PressContentTitle = styled.div`
  ${font('title26', 'bold')};
  ${lineHeight(26, 40)};
  letter-spacing: -0.4px;
  margin-bottom: 12px;
`;

const PressContentPressName = styled.div`
  ${font('title24', 'medium')};
  ${lineHeight(24, 38)};
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.color.black};
  opacity: 0.56;
`;

export {
  IntroduceWrapper,
  TextWrapper,
  PressWrapper,
  PressContentList,
  PressContent,
  PressContentTitle,
  PressContentPressName,
};
