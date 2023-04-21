import { i18n } from '@/config/i18n.config';

export const getUrl = (uri: string) => {
  return new URL(uri, process.env.NEXT_PUBLIC_APP_URI!).toString();
};

export const getUrlLocales = (uri = '') => {
  const data = i18n.locales.reduce((results, locale) => {
    return { ...results, [locale]: locale + uri };
  }, {});

  return data;
};
