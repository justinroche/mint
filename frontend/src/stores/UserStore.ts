import { defineStore } from 'pinia';
import { User } from '../types';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({} as User);

  return {
    user,
  };
});
