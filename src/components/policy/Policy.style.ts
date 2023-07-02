import { mediaQuery, font } from '@Styles/mixin.style';
import styled from 'styled-components';

export const PolicyStyleBox = styled.div`
  padding: 0px 90px;
  margin: 0px auto;
  max-width: 1200px;
  padding-top: 100px;
  padding-bottom: 180px;

  ${mediaQuery(
    'mobile',
    `
      margin: 0px 24px;
      padding: 0px;
      padding-top: 30px;
      padding-bottom: 100px;

      `,
  )}

  & h1 {
    color: ${({ theme }) => theme.color.textBlackHigh};
    ${font('title32', 'bold')};

    ${mediaQuery(
      'mobile',
      `
      ${font('mobile24', 'bold')};
    line-height: 36px;
      `,
    )}
  }

  & h2 {
    color: ${({ theme }) => theme.color.textBlackHigh};
    ${font('title24', 'bold')};
    margin-top: 60px;
    margin-bottom: 14px;

    ${mediaQuery(
      'mobile',
      `
      ${font('mobile16', 'bold')};
      line-height: 26px;
      `,
    )}
  }

  & h3 {
    color: ${({ theme }) => theme.color.textBlackHigh};
    ${font('title20', 'bold')};
    margin-top: 40px;

    ${mediaQuery(
      'mobile',
      `
      ${font('mobile16', 'bold')};
      line-height: 26px;
      `,
    )}
  }

  & p {
    color: ${({ theme }) => theme.color.textBlackHigh};
    margin-top: 14px;
    line-height: 34px;
    font-size: 20px;

    ${mediaQuery(
      'mobile',
      `
      ${font('mobile14', 'regular')};
      line-height: 22px;
      `,
    )}

    &.privacy {
      margin-top: 60px;
      line-height: 44px;

      ${mediaQuery(
        'mobile',
        `
      margin-top: 16px;
      line-height: 22px;
      `,
      )}
    }
  }

  & ul {
    list-style: inside;
    margin-left: 5px;
  }
  & li {
    line-height: 34px;
    ${font('list20', 'regular')};

    ${mediaQuery(
      'mobile',
      `
          ${font('mobile14', 'regular')};
          line-height:22px;
        `,
    )};
  }

  & table {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.grey200};
    margin-top: 20px;
    ${font('body16', 'regular')}

    &.pc {
      ${mediaQuery(
        'mobile',
        `
        display: none;
        `,
      )}
    }

    &.mobile {
      display: none;
      ${mediaQuery(
        'mobile',
        `
        display: inline-table;
        text-align: center;
        ${font('mobile14', 'regular')};
        `,
      )}
    }

    tbody {
      border: inherit;
      tr {
        height: 66px;
        border: inherit;

        td {
          vertical-align: middle;
          padding: 0px 22px;
          border: inherit;
        }
        th {
          vertical-align: middle;
          ${font('body16', 'bold')}
          background: ${({ theme }) => theme.color.grey50};
          border: inherit;
          width: 130px;
        }

        td,
        th {
          ${mediaQuery(
            'mobile',
            `
            padding: 20px 22px;
          `,
          )}
        }
      }
    }
  }
`;
