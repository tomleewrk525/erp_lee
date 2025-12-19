// erp-system/lib/i18n.ts
import en from '../translations/en.json';
import ko from '../translations/ko.json';
import th from '../translations/th.json';

type Language = 'en' | 'ko' | 'th';

const translations = {
  en,
  ko,
  th,
};

export const getTranslation = (lang: Language, key: string, params?: Record<string, string>): string => {
  const translationMap = translations[lang] || translations['en']; // Fallback to English

  let translatedString = (translationMap as Record<string, string>)[key];

  if (translatedString && params) {
    for (const paramKey in params) {
      translatedString = translatedString.replace(`{${paramKey}}`, params[paramKey]);
    }
  }

  return translatedString || key; // Return key if translation not found
};
