import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterTransactionsStore = defineStore(
  'filterTransactions',
  () => {
    const sortBy = ref<'Oldest' | 'Newest' | 'Largest' | 'Smallest'>('Newest');
    const filterByCategory = ref('Show all');
    const search = ref('');

    return {
      sortBy,
      filterByCategory,
      search,
    };
  }
);
