import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import router, { setupRouteGaurds } from './router';
import { useAuthStore } from './stores/authStore';

const app = createApp(App);

app.use(createPinia());
const authStore = useAuthStore();
authStore.registerAuthListner();

app.use(router);
setupRouteGaurds();

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);

app.mount('#app');
