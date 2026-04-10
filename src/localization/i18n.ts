import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { AppLogger } from "../utils/AppLogger";
import { arTranslations } from "./AR/ar";
import { bnTranslations } from "./BN/bn";
import { enTranslations } from "./EN/en";

const LANGUAGE_KEY = "app_language";

export const LANGUAGES = [
  { code: "en", name: "English", isRTL: false },
  { code: "bn", name: "বাংলা", isRTL: false },
  { code: "ar", name: "العربية", isRTL: true },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const defaultNS = "translation" as const;

export const resources = {
  en: { translation: enTranslations },
  bn: { translation: bnTranslations },
  ar: { translation: arTranslations },
} as const;

const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
      } else {
        callback("en");
      }
    } catch {
      callback("en");
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    } catch (error) {
      AppLogger.error("Failed to cache language", error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export const changeLanguage = async (lng: LanguageCode) => {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem(LANGUAGE_KEY, lng);
};

export const getCurrentLanguage = () => i18n.language as LanguageCode;

export const isRTL = (lang: string) => {
  const language = LANGUAGES.find((l) => l.code === lang);
  return language?.isRTL ?? false;
};

export default i18n;
