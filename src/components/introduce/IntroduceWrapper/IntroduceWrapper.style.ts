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
  margin: 150px 0 150px 368px;

  ${mediaQuery('pc1380', `margin: 150px 0 150px 90px;`)}
  ${mediaQuery('tablet1024', `margin: 150px 0 150px 40px;`)}
  ${mediaQuery(
    'mobile',
    `
    ${size('100%')}
    margin: 80px 0 80px 24px;
    ${font('mobile26', 'bold')};
    ${lineHeight(26, 36)};
    letter-spacing: -0.4px;

    &:first-child {
      margin: 65px 0 60px 24px;
    }
  `,
  )}
  

  .highlight {
    color: ${({ theme }) => theme.color.blue100};
  }
`;

const PressWrapper = styled.div`
  margin: 140px 0 200px 368px;
  ${size('100%', '896px')};

  ${mediaQuery('pc1380', `margin: 120px 0 200px 90px;`)}
  ${mediaQuery('tablet1024', `margin: 120px 0 200px 40px;`)}
  ${mediaQuery(
    'mobile',
    `margin: 120px 0 200px 40px;
    ${size('100%', '843px')};`,
  )}
  ${mediaQuery(
    'mobile',
    `
    margin: 70px 0 100px 24px;
    ${size('100%', 'auto')};
    `,
  )}
`;

const PressContentList = styled.ul`
  ${flex('flex-start', 'flex-start')};
  flex-wrap: wrap;
  white-space: pre-wrap;
  gap: 70px 128px;

  ${mediaQuery('tablet1024', `gap: 70px 76px;`)}

  ${mediaQuery(
    'mobile',
    `
    gap: 32px;
    ${flex('flex-start', 'flex-start')};
    flex-wrap: nowrap;
    flex-direction: column;`,
  )}
`;

const Column = styled.div`
  width: 380px;
`;

const PressContent = styled.li`
  margin-bottom: 70px;

  ${mediaQuery(
    'mobile',
    `
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0;
  }`,
  )}
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
  Column,
  PressContent,
  PressContentTitle,
  PressContentPressName,
};
