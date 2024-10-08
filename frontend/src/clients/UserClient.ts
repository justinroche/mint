import { useUserStore } from '../stores/UserStore';
import { useShowModalStore } from '../stores/ShowModalStore';
import axios from 'axios';
import { server_host, server_port } from '../config/config.json';
import { User } from '../types';

const api = axios.create({
  baseURL: `http://${server_host}:${server_port}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let userStore: ReturnType<typeof useUserStore>;
let showModalStore: ReturnType<typeof useShowModalStore>;

export const initializeUserClient = () => {
  userStore = useUserStore();
  showModalStore = useShowModalStore();
};

export const saveUserIDToLocalStorage = (userID: string) => {
  localStorage.setItem('userID', userID);
};

export const performCreateAccountAndLogin = async (
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
    saveUserIDToLocalStorage(userStore.user._id);
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const performLogin = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    userStore.user = response.data;
    saveUserIDToLocalStorage(userStore.user._id);
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const performLoginFromUserID = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    userStore.user = response.data;
    saveUserIDToLocalStorage(userStore.user._id);
    showModalStore.showSignInModal = false;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const performLogout = async () => {
  userStore.user = {} as User;
  localStorage.removeItem('userID');
};

export const checkForExistingEmail = async (email: string) => {
  try {
    const response = await api.get(`/check-email/${email}`);
    return response.data.exists;
  } catch (error: any) {
    return error.response.data.message;
  }
};
