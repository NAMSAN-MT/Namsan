import type { Locale } from './config';
import ko from '../intl/ko.json';
import en from '../intl/en.json';

const messagesByLocale: Record<Locale, Record<string, unknown>> = { ko, en };

export const getMessages = (locale: Locale) => messagesByLocale[locale];
