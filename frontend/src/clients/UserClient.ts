import { useUserStore } from '../stores/UserStore';
import axios from 'axios';
import { server_host, server_port } from '../config/config.json';
import { Transaction, User } from '../types';

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

export const performLoginFromUserID = async (userID: string) => {
  try {
    const response = await api.get(`/users/${userID}`);
    userStore.user = response.data;
    saveUserIDToLocalStorage(userStore.user._id);
  } catch (error: any) {
    localStorage.removeItem('userID');
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

export const addTransaction = async (transaction: Transaction) => {
  try {
    const response = await api.post(
      `/users/${userStore.user._id}/transactions`,
      {
        ...transaction,
      }
    );
    userStore.user.transactions.push(response.data);
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const updateTransaction = async (transaction: Transaction) => {
  try {
    const response = await api.put(
      `/users/${userStore.user._id}/transactions/${transaction._id}`,
      {
        ...transaction,
      }
    );
    userStore.user.transactions = userStore.user.transactions.map((t) =>
      t._id === transaction._id ? response.data : t
    );
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const removeTransaction = async (transactionID: string) => {
  try {
    await api.delete(
      `/users/${userStore.user._id}/transactions/${transactionID}`
    );
    userStore.user.transactions = userStore.user.transactions.filter(
      (t) => t._id !== transactionID
    );
  } catch (error: any) {
    return error.response.data.message;
  }
};
