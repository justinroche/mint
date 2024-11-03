import { defineStore } from 'pinia';
import { User } from '../types';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({} as User);

  const currentMonthsTransactions = computed(() => {
    const currentDate = new Date();
    const currentYearMonth = currentDate.toISOString().slice(0, 7);

    return user.value.transactions.filter((transaction) => {
      const transactionYearMonth = transaction.date.slice(0, 7);
      return transactionYearMonth === currentYearMonth;
    });
  });

  return {
    user,
    currentMonthsTransactions,
  };
});
