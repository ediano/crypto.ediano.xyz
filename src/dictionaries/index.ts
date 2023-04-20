const dictionaries = {
  'en-US': () => import('./en-us.json').then((module) => module.default),
  'pt-BR': () => import('./pt-br.json').then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof dictionaries) => {
  if (!locale) dictionaries['en-US'];
  return dictionaries[locale]();
};
