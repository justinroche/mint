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

  const currentMonthsExpensesTotal = computed(() => {
    let total = currentMonthsTransactions.value
      .filter(
        (transaction) =>
          user.value.categories.find(
            (category) => category._id === transaction.categoryID
          )?.type === 'expense'
      )
      .reduce((acc, transaction) => acc + (transaction.amount || 0), 0);

    return total === 0 ? 0 : total * -1;
  });

  const currentMonthsExpensesByCategory = computed(() => {
    return user.value.categories
      .filter((category) => category.type === 'expense')
      .map((category) => {
        const transactions = currentMonthsTransactions.value.filter(
          (transaction) => transaction.categoryID === category._id
        );
        let total = transactions.reduce(
          (acc, transaction) => acc + (transaction.amount || 0),
          0
        );
        total = total === 0 ? 0 : total * -1;
        return { category, total };
      })
      .filter((category) => category.total > 0);
  });

  const budgetExpenseTotal = computed(() => {
    return user.value.budgets
      .filter((budget) => budget.amount !== undefined)
      .filter(
        (budget) =>
          user.value.categories.find(
            (category) => category._id === budget.categoryID
          )?.type === 'expense'
      )
      .reduce((acc, row) => acc + (row.amount || 0), 0);
  });

  const budgetIncomeTotal = computed(() => {
    return user.value.budgets
      .filter((budget) => budget.amount !== undefined)
      .filter(
        (budget) =>
          user.value.categories.find(
            (category) => category._id === budget.categoryID
          )?.type === 'income'
      )
      .reduce((acc, row) => acc + (row.amount || 0), 0);
  });

  return {
    user,
    currentMonthsTransactions,
    currentMonthsExpensesTotal,
    currentMonthsExpensesByCategory,
    budgetExpenseTotal,
    budgetIncomeTotal,
  };
});
