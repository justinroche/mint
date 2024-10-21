import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterTransactionsStore = defineStore(
  'filterTransactions',
  () => {
    const sortBy = ref<'Oldest' | 'Newest' | 'Largest' | 'Smallest'>('Newest');
    const filterByCategory = ref('Show all');
    const searchQuery = ref('');

    return {
      sortBy,
      filterByCategory,
      searchQuery,
    };
  }
);
