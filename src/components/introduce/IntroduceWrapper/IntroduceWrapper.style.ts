import { flex, font, lineHeight, mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';

const IntroduceWrapper = styled.div`
  min-width: 1038px;

  ${mediaQuery(
    'mobile',
    `min-width: 0;
    `,
  )}

  .title {
    ${font('display42', 'bold')};
    ${lineHeight(42, 60)};
    letter-spacing: -0.6px;
    margin-bottom: 60px;

    ${mediaQuery(
      'mobile',
      `
    ${font('mobile24', 'bold')};
    ${lineHeight(24, 36)};
    letter-spacing: -0.4px;
  `,
    )}
  }
`;

const TextWrapper = styled.div`
  white-space: pre-wrap;
  ${font('display42', 'bold')};
  ${lineHeight(42, 60)};
  letter-spacing: -0.6px;
  margin: 120px 0 155px 368px;

  ${mediaQuery('pc1380', `margin: 120px 0 155px 90px;`)}
  ${mediaQuery('tablet', `margin: 120px 0 155px 40px;`)}
  ${mediaQuery(
    'mobile',
    `
    ${size('100%')}
    margin: 115px 0 60px 24px;
    ${font('mobile26', 'bold')};
    ${lineHeight(26, 36)};
    letter-spacing: -0.4px;
  `,
  )}
  

  .highlight {
    color: ${({ theme }) => theme.color.blue100};
  }
`;

const PressWrapper = styled.div`
  margin: 120px 0 200px 368px;
  ${size('100%', '896px')};

  ${mediaQuery('pc1380', `margin: 120px 0 200px 90px;`)}
  ${mediaQuery(
    'tablet',
    `margin: 120px 0 200px 40px;
    ${size('100%', '843px')};`,
  )}
  ${mediaQuery(
    'mobile',
    `margin: 80px 0 36px 24px;
    ${size('100%', 'auto')};`,
  )}
`;

const PressContentList = styled.ul`
  ${flex('flex-start')};
  flex-wrap: wrap;
  gap: 128px;
  white-space: pre-wrap;

  ${mediaQuery('pc1024', `gap: 50px`)}
  ${mediaQuery(
    'mobile',
    `gap: 32x
    ${flex('flex-start', 'flex-start')};
    flex-wrap: nowrap;
    flex-direction: column;`,
  )}
`;

const PressContent = styled.li`
  width: 384px;
`;

const PressContentTitle = styled.div`
  ${font('title26', 'bold')};
  ${lineHeight(26, 40)};
  letter-spacing: -0.4px;
  margin-bottom: 12px;

  ${mediaQuery(
    'mobile',
    `
    ${font('mobile18', 'bold')};
    ${lineHeight(18, 26)};
    letter-spacing: -0.2px;
  `,
  )}
`;

const PressContentPressName = styled.div`
  ${font('title24', 'medium')};
  ${lineHeight(24, 38)};
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.color.black};
  opacity: 0.56;

  ${mediaQuery(
    'mobile',
    `
    ${font('mobile14', 'bold')};
    ${lineHeight(24, 22)};
  `,
  )}
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
