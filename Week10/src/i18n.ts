/**
 * Add following dependencies in order to implement i18n:
 * 1. i18next - npm install i18next
 * 2. i18next-browser-languagedetector - npm install i18next-browser-languagedetector
 * 3. i18next-backend - npm install i18next-backend
 * 4. react-i18next - npm install react-i18next
 * 
 * NOTE: i18n needs to be imported in the main.tsx file in order to work
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

// Initialize i18n with the backend and language detector
i18n
    .use(backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        
        interpolation: {
            escapeValue: false
        }
    })

export default i18n