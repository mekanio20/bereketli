import { createI18n } from 'vue-i18n'
import tk from './locales/tk.json'
import ru from './locales/ru.json'
import en from './locales/en.json'
import ch from './locales/ch.json'
import tr from './locales/tr.json'
const i18n = createI18n({
    locale: 'tk',
    fallbackLocale: 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        tk, ru, en, ch, tr
    },
})

  export default i18n