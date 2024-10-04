import { useUserStore } from '../stores/UserStore';
import axios from 'axios';
import { server_host, server_port } from '../config/config.json';

const api = axios.create({
  baseURL: `http://${server_host}:${server_port}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let userStore: ReturnType<typeof useUserStore>;

export const initializeUserClient = () => {
  userStore = useUserStore();
};

export const testFetch = async () => {
  try {
    const response = await api.get('/test');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

/*
export const fetchUser = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    userStore.user.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
*/
