/* eslint-disable react-hooks/rules-of-hooks */
import { initReactI18next } from 'react-i18next'
import i18n, { use } from 'i18next'
import ZH from './zh/index.json'
import EN from './en/index.json'

export const resources = {
  zh: {
    translation: ZH,
  },
  en: {
    translation: EN,
  },
} as const

use(initReactI18next).init({
  lng: 'zh',
  interpolation: {
    escapeValue: false,
  },
  resources,
})

export default i18n
