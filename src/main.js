import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
import { MotionPlugin } from '@vueuse/motion';
import i18n from './i18n';
import "./style.css";

import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);
const pinia = createPinia();

i18n.global.locale.value = localStorage.getItem('lang') || 'TK'
app.component('VueDatePicker', VueDatePicker);

app.use(i18n);
app.use(pinia);

app.use(router);
app.use(MotionPlugin);

app.mount("#app");