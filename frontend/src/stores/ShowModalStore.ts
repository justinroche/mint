import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShowModalStore = defineStore('showModal', () => {
  const showCreateAccountModal = ref(false);
  const showSignInModal = ref(true);
  const showEditTransactionModal = ref(false);

  return {
    showCreateAccountModal,
    showSignInModal,
    showEditTransactionModal,
  };
});
