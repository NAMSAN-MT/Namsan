import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export interface InjectedIntl {
  locale: string;
  formatMessage: (
    descriptor: { id: string },
    values?: Record<string, any>,
  ) => string;
}

export interface WithIntlProps {
  intl: InjectedIntl;
}

/**
 * Drop-in replacement for gatsby-plugin-intl's `injectIntl`.
 * Wrapped component keeps using `props.intl.locale` and
 * `props.intl.formatMessage({ id })` unchanged.
 */
export function withTranslations<P extends WithIntlProps>(
  Component: React.ComponentType<P>,
) {
  const Wrapped = (props: Omit<P, keyof WithIntlProps>) => {
    const t = useTranslations();
    const locale = useLocale();
    const intl: InjectedIntl = {
      locale,
      formatMessage: ({ id }, values) => t(id, values),
    };
    return <Component {...(props as P)} intl={intl} />;
  };
  Wrapped.displayName = `withTranslations(${
    Component.displayName || Component.name || 'Component'
  })`;
  return Wrapped;
}
