import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShowModalStore = defineStore('showModal', () => {
  const showSignInComponent = ref(true);
  const showEditTransactionModal = ref(false);

  return {
    showSignInComponent,
    showEditTransactionModal,
  };
});
