import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import {
  initializeUserClient,
  performLoginFromUserID,
} from './clients/UserClient';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);

initializeUserClient();

if (localStorage.getItem('userID')) {
  await performLoginFromUserID(localStorage.getItem('userID')!);
}

app.mount('#app');
