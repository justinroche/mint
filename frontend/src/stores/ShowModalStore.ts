import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShowModalStore = defineStore('showModal', () => {
  const showSignInComponent = ref(true);
  const showEditTransactionModal = ref(false);
  const showManageBudgetModal = ref(false);
  const showFilterTransactionsComponent = ref(false);

  return {
    showSignInComponent,
    showEditTransactionModal,
    showManageBudgetModal,
    showFilterTransactionsComponent,
  };
});
