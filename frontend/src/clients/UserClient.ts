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

export const performCreateAccount = async (
  displayName: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post('/create-user', {
      displayName,
      email,
      password,
    });
    userStore.user = response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const performLogin = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    userStore.user = response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const fetchUserFromUserID = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    userStore.user = response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
