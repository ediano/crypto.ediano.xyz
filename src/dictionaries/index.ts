import type { Locale } from '@/config/i18n.config';

import enUS from './en-us';
import ptBR from './pt-br';

const dictionaries = {
  'en-US': enUS,
  'pt-BR': ptBR,
};

export type Dictionary = typeof enUS;
export type DictionaryKey = keyof Omit<Dictionary, 'site'>;

export const getDictionary = (locale: Locale): Dictionary => {
  const dictionary = dictionaries[locale || 'en-US'];
  return dictionary;
};
