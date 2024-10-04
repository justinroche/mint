import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import { initializeUserClient } from './clients/UserClient';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);

initializeUserClient();

app.mount('#app');
