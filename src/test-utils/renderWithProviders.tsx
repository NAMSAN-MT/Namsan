import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@Styles/varialbes.style';
import koMessages from '@Intl/ko.json';
import enMessages from '@Intl/en.json';

const messagesByLocale: Record<string, AbstractIntlMessages> = {
  ko: koMessages,
  en: enMessages,
};

/**
 * _app.tsx와 동일한 Provider 스택(styled-components theme + next-intl)으로 감싼다.
 * locale을 바꿔 rerender하면 실제 언어 전환과 같은 상황이 된다.
 */
export const renderWithProviders = (
  ui: React.ReactElement,
  locale: 'ko' | 'en' = 'ko',
  options?: RenderOptions,
): RenderResult & {
  rerenderWithLocale: (ui: React.ReactElement, locale: 'ko' | 'en') => void;
} => {
  const wrap = (node: React.ReactElement, loc: 'ko' | 'en') => (
    <ThemeProvider theme={theme}>
      <NextIntlClientProvider
        locale={loc}
        messages={messagesByLocale[loc]}
        timeZone="Asia/Seoul"
      >
        {node}
      </NextIntlClientProvider>
    </ThemeProvider>
  );

  const result = render(wrap(ui, locale), options);

  return {
    ...result,
    rerenderWithLocale: (next: React.ReactElement, nextLocale: 'ko' | 'en') =>
      result.rerender(wrap(next, nextLocale)),
  };
};
