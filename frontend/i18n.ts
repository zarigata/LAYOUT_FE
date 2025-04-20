// CODEX: i18n instance for Feverducation (next-i18next)
import NextI18Next from 'next-i18next';
import path from 'path';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['pt'],
  localePath: path.resolve('./public/locales'),
});

export default NextI18NextInstance;
export const { appWithTranslation, useTranslation, i18n } = NextI18NextInstance;
