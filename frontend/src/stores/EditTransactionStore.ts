import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditTransactionStore = defineStore('editTransaction', () => {
  const id = ref('');
  const description = ref('');
  const amount = ref('');
  const date = ref('');
  const categoryID = ref('');
  const isIncome = ref(false);

  return {
    id,
    description,
    amount,
    date,
    categoryID,
    isIncome,
  };
});
