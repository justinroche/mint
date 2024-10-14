import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShowModalStore = defineStore('showModal', () => {
  const showCreateAccountComponent = ref(false);
  const showSignInComponent = ref(true);
  const showEditTransactionModal = ref(false);

  return {
    showCreateAccountComponent,
    showSignInComponent,
    showEditTransactionModal,
  };
});
