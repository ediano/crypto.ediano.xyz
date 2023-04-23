import type { Locale } from '@/config/i18n.config';

import enUS from './en-us';
import ptBR from './pt-br';

const dictionaries = {
  'en-US': enUS,
  'pt-BR': ptBR,
};

export const getDictionary = (locale: Locale) => {
  const dictionary = dictionaries[locale || 'en-US'];

  return (key: keyof typeof enUS, params?: { [key: string]: string | number }) => {
    let translation = dictionary[key];

    if (!translation) return key;

    if (params && Object.entries(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation.replace(`{{ ${key} }}`, String(value));
      });
    }

    return translation;
  };
};

export type DictionaryUseClient = typeof enUS;
